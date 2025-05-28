import { View, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native"
import { ThemeContext } from "../../common/ThemeContext";
import { Images } from '../../assets';
import { useContext, useEffect } from 'react';
import BoldText from "../../components/BoldText";
import RegularText from "../../components/RegularText";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
    NativeEventEmitter,
  } from 'react-native'
  import { useTranslation } from 'react-i18next';
const HomeScreen = () => {
    const { themeMain } = useContext(ThemeContext);
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const navigation = useNavigation();

    const eventEmitter = new NativeEventEmitter();
    const isFocus = useIsFocused();
    const { t } = useTranslation();
    
    useEffect(() => {
        if(isFocus){
            eventEmitter.emit('step', 1)
        }
    },[isFocus])
    return (
        <View style={{ backgroundColor: themeMain.white, flex: 1, }}>


            <BoldText text={t("home.selectAccount")} style={{ fontSize: 21, marginTop: 53, marginStart: 24 }} />
            <RegularText text={t("home.selectAccountDesc")} style={{ fontSize: 15, marginTop: 4, marginHorizontal: 24 }} />

            <FlatList
                style={{ marginTop: 16, marginHorizontal: 24, marginBottom: 120 }}
                data={[1, 2]}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={[styles.itemContainer, { backgroundColor: themeMain.gray }]}
                        onPress={() => setSelectedIndex(index)}>
                        <Image source={Images.test_bank_logo} style={{ width: 50, height: 50, alignSelf: 'center', marginStart: 16 }} />
                        <BoldText text="Alinma Bank" style={{ fontSize: 17, alignSelf: 'center', marginStart: 8 }} />
                        <Image source={selectedIndex === index ? Images.radio_on : Images.radio_off} style={styles.radio} />
                    </TouchableOpacity>
                )} />
            <PrimaryButton text="Continue" style={styles.button} onPress={() => { navigation.navigate('Details') }} />
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
    radio:{ resizeMode: 'stretch',
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
        bottom: 56 
    },
});

export default HomeScreen 