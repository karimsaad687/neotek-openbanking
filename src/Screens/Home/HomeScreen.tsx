import { View, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native"
import { ThemeContext } from "../../common/ThemeContext";
import { Images } from '../../assets';
import { useContext, useEffect } from 'react';
import BoldText from "../../components/BoldText";
import RegularText from "../../components/RegularText";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import {getToken,getAllAccounts} from "../../common/apis";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";
const HomeScreen = () => {
    const { themeMain,credentials } = useContext(ThemeContext);
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [accounts, setAccounts] = useState([])
    const navigation = useNavigation();

    const MyNativeModule = NativeModules.NeotekOpenbanking;
    let eventEmitter = null;
    if (Platform.OS === 'ios' && MyNativeModule) {
        eventEmitter = new NativeEventEmitter(MyNativeModule);
    } else {
        eventEmitter = new NativeEventEmitter()
    }
    const isFocus = useIsFocused();
    const { t } = useTranslation();

    useEffect(() => {
        if (isFocus) {
            eventEmitter.emit('revoke', false)
            eventEmitter.emit('step', 1)
            eventEmitter.emit('title', t("details.connectYourAccount"))
           apiCalls()
        }
    }, [isFocus])

    const apiCalls=async()=>{
        await RNSecureStorage.setItem("client_id", credentials.client_id, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
        await RNSecureStorage.setItem("client_secret", credentials.client_secret, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
        await RNSecureStorage.setItem("apiKey", credentials.apiKey, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
        await RNSecureStorage.setItem("uuidKey", credentials.uuidKey, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
        await RNSecureStorage.setItem("psuid", '255cc', {accessible: ACCESSIBLE.WHEN_UNLOCKED})
         getToken().then((res) => {
            console.log("res1",res)
            
            getAllAccounts(1).then((res) => {
                console.log("res1",res)
                setAccounts([])
                setAccounts(res.Data.AccountsLinks)
            }).catch((err) => {
                console.log(err)
            })
         })
       
    }
    return (
        <View style={{ backgroundColor: themeMain.white, flex: 1, }}>


            <BoldText text={t("home.selectAccount")} style={{ fontSize: 21, marginTop: 53, marginStart: 24 }} />
            <RegularText text={t("home.selectAccountDesc")} style={{ fontSize: 15, marginTop: 4, marginHorizontal: 24 }} />

            <FlatList
                style={{ marginTop: 16, marginHorizontal: 24, marginBottom: Platform.OS === 'ios' ? 130 : 170 }}
                data={accounts}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={[styles.itemContainer, { backgroundColor: themeMain.gray }]}
                        onPress={() => setSelectedIndex(index)}>
                        <Image source={{uri:item.FinancialInstitution.Logo}} style={{ width: 50, height: 50, alignSelf: 'center', marginStart: 16 }} />
                        <BoldText text={item.FinancialInstitution.NameEn} style={{ fontSize: 17, alignSelf: 'center', marginStart: 8 }} />
                        <Image source={selectedIndex === index ? Images.radio_on : Images.radio_off} style={styles.radio} />
                    </TouchableOpacity>
                )} />
            <PrimaryButton text={t("continue")} style={styles.button} onPress={() => { navigation.navigate('Details',{account:accounts[selectedIndex]}) }} />
            {/* <PrimaryButton text={t("connectAccounts.accounts")} style={styles.accountsButton} onPress={() => { 
                navigation.navigate('ConnectedAccounts')
             }} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        height: 73,
        flexDirection: 'row',
        marginBottom: 16,
        borderRadius: 10
    },
    radio: {
        resizeMode: 'stretch',
        width: 20,
        height: 20,
        alignSelf: 'center',
        position: 'absolute',
        end: 16
    },
    button: {
        width: '90%',
        height: 50,
        marginHorizontal: 24,
        position: 'absolute',
        //bottom: Platform.OS === 'ios' ? 68 : 112
        bottom: Platform.OS === 'ios' ? 16 : 56
    },
    accountsButton: {
        width: '90%',
        height: 50,
        marginHorizontal: 24,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 16 : 56
    },
});

export default HomeScreen 