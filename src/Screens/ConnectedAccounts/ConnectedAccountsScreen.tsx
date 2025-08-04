import { View, TouchableOpacity, Image, StyleSheet, FlatList,ActivityIndicator } from "react-native"
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
import SemiBoldText from "../../components/SemiBoldText";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";
import { getAllCurrentAccounts, getAllHistoryAccounts } from "../../common/apis";
const ConnectedAccountsScreen = () => {
    const { themeMain, credentials } = useContext(ThemeContext);
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const [currentAccounts, setCurrentAccounts] = useState([])
    const [historyAccounts, setHistoryAccounts] = useState([])
    const MyNativeModule = NativeModules.NeotekOpenbanking;
    let eventEmitter = null;
    if (Platform.OS === 'ios' && MyNativeModule) {
        eventEmitter = new NativeEventEmitter(MyNativeModule);
    } else {
        eventEmitter = new NativeEventEmitter()
    }
    const isFocus = useIsFocused();
    const { t,i18n } = useTranslation();
    
    useEffect(() => {
        if (isFocus) {
            eventEmitter.emit('revoke', true)
            eventEmitter.emit('revokeTitle', t('connectAccounts.title'))
            currentAccountsCall()
        }
    }, [isFocus])
    


    const currentAccountsCall = async () => {

        await RNSecureStorage.setItem("url", credentials.baseUrl, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await RNSecureStorage.setItem("token", credentials.token, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await RNSecureStorage.setItem("appName", credentials.appName, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await RNSecureStorage.setItem("apiKey", credentials.apiKey, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await RNSecureStorage.setItem("uuidKey", credentials.uuidKey, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await RNSecureStorage.setItem("psuid", '255cc', { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        setLoading(true)
        getAllCurrentAccounts(1).then((res) => {
            console.log("res1", res)
            
            setCurrentAccounts(res.Data.AccountsLinks)
            
        }).catch((err) => {
            console.log(err)
           
        }).finally(() => {
            setLoading(false)
        })

    }

    const historyAccountsCall = async () => {
        console.log("length", historyAccounts.length)
        setLoading(true)
        await RNSecureStorage.setItem("url", credentials.baseUrl, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await RNSecureStorage.setItem("token", credentials.token, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await RNSecureStorage.setItem("appName", credentials.appName, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await RNSecureStorage.setItem("apiKey", credentials.apiKey, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await RNSecureStorage.setItem("uuidKey", credentials.uuidKey, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await RNSecureStorage.setItem("psuid", '255cc', { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        
        getAllHistoryAccounts(1).then((res) => {    
            setHistoryAccounts(res.Data.AccountsLinks)
        }).catch((err) => {
            console.log(err)
            
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <View style={{ backgroundColor: themeMain.white, flex: 1, }}>

            <View style={[styles.currentHistoryContainer, { backgroundColor: themeMain.gray }]} >
                <TouchableOpacity style={[styles.current, { backgroundColor: selectedIndex == 1 ? themeMain.primaryColor : themeMain.gray }]} onPress={() => { setSelectedIndex(1); if (currentAccounts.length == 0) currentAccountsCall() }}>
                    <SemiBoldText text={t("connectAccounts.current")} style={{ color: selectedIndex == 1 ? themeMain.white : themeMain.textSecondaryColor, alignSelf: 'center' }} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.history, { backgroundColor: selectedIndex == 2 ? themeMain.primaryColor : themeMain.gray }]} onPress={() => { setSelectedIndex(2); if (historyAccounts.length == 0) historyAccountsCall() }}>
                    <SemiBoldText text={t("connectAccounts.history")} style={{ color: selectedIndex == 2 ? themeMain.white : themeMain.textSecondaryColor, alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ marginTop: 16, marginHorizontal: 24, marginBottom: 130 }}
                data={selectedIndex == 1 ? currentAccounts : historyAccounts}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <>
                        {!loading && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 100 }}>
                            <Image source={Images.ic_fail} style={{ width: 100, height: 100 }} />
                            <BoldText text={t("connectAccounts.no_accounts")} style={{ color: themeMain.textSecondaryColor }} />
                        </View>}
                    </>

                }
                refreshing={refreshing}
                onRefresh={() => {
                    setCurrentAccounts([])
                    setHistoryAccounts([])
                    selectedIndex == 1 ? currentAccountsCall() : historyAccountsCall();
                    
                }}
                renderItem={({ item, index }) => {
                    const items = [];
                    if (item.Accounts?.Account?.length > 0) {
                        for (let i = 0; i < item.Accounts.Account.length; i++) {
                            items.push(<View style={{ paddingVertical: 8, flexDirection: 'row' }}>
                                <Image source={Images.ic_dot} style={{ width: 24, height: 24, alignSelf: 'flex-start' }} />
                                <SemiBoldText text={item.Accounts.Account[i].Nickname || ""} style={{ fontSize: 17, alignSelf: 'flex-start' }} />
                            </View>);
                        }
                    }
                    const views = <View style={{ width: '90%', alignSelf: 'center', marginBottom: 16 }}>{items}</View>
                    const bankName =  i18n.language === 'en' ? item.FinancialInstitution.NameEn : item.FinancialInstitution.NameAr

                    return (
                        <View style={[styles.itemContainer, { backgroundColor: themeMain.gray }]}>
                            <View style={[styles.itemTopContainer, { backgroundColor: themeMain.gray }]}>
                                <Image source={{ uri: item.FinancialInstitution.Logo }} style={{ width: 50, height: 50, alignSelf: 'center', marginStart: 16 }} />
                                <BoldText text={bankName} style={{ fontSize: 17, alignSelf: 'center', marginStart: 8 }} />
                                <View style={[styles.radio, { borderRadius: 4, backgroundColor: t(item.Status) == t("Active") ? '#DCFCE7' : t(item.Status) == t("Disconnected") ? '#FEE2E2' : t(item.Status) == t("Rejected") ? '#E6ECF2' : '#FEF3C7' }]} >
                                    <SemiBoldText text={t(item.Status)} style={{ fontSize: 13, alignSelf: 'center', color: t(item.Status) == t("Active") ? '#16A34A' : t(item.Status) == t("Disconnected") ? '#DC2626' : t(item.Status) == t("Rejected") ? '#475569' : '#D97706' }} />
                                </View>
                            </View>
                            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'flex-start' }}>
                                    <RegularText text={t('details.sharingDataFrom')} style={{ fontSize: 15 }} />
                                    <BoldText text={item.CreationDateTime.split('T')[0]} style={{ fontSize: 17,textAlign:'left' }} />
                                </View>
                                <View style={{ width: 1, height: 40, backgroundColor: '#E6E9EF' }} />
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <RegularText text={t('details.connectionExpires')} style={{ fontSize: 15 }} />
                                    <BoldText text="On going" style={{ fontSize: 17, alignSelf: 'flex-end' }} />
                                </View>
                            </View>
                            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'space-between', height: 1, marginVertical: 16, backgroundColor: '#E6E9EF' }} />
                            {views}
                            {selectedIndex == 1 && <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'space-between', height: 1, backgroundColor: '#E6E9EF' }} />}
                            {selectedIndex == 1 && <TouchableOpacity style={{ alignSelf: 'center', marginVertical: 23 }} onPress={() => { navigation.navigate('ManageAccount', { account: item }) }}>
                                <BoldText text={t("connectAccounts.manage")} style={{ fontSize: 17, color: themeMain.primaryColor }} />
                            </TouchableOpacity>}
                        </View>
                    )
                }} />

            <PrimaryButton text={t("connectAccounts.connectAnotherAccount")} style={styles.accountsButton} onPress={() => {
                navigation.navigate('Home')
                eventEmitter.emit('revoke', false)
            }} />
            {loading && <View style={{ height: '100%', width: '100%', position: 'absolute',alignItems: 'center',justifyContent: 'center', top: 0,backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >
                <View style={{ backgroundColor: themeMain.white, width: 60,height: 60, borderRadius: 10,alignItems: 'center',justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={themeMain.primaryColor} style={{ alignSelf: 'center', width: 40,height: 40}} />
                </View>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: 16,
        borderRadius: 10
    },
    itemTopContainer: {
        width: '100%',
        height: 73,
        flexDirection: 'row',

        borderRadius: 10
    },
    radio: {
        resizeMode: 'stretch',
        paddingVertical: 3,
        paddingHorizontal: 10,
        alignSelf: 'center',
        position: 'absolute',
        end: 16
    },
    currentHistoryContainer: { flexDirection: 'row', borderRadius: 14, width: '90%', alignSelf: 'center', justifyContent: 'space-evenly', paddingVertical: 4 },
    current: { width: '48%', height: 36, alignSelf: 'center', fontSize: 15, marginTop: 4, textAlign: 'center', borderRadius: 10, justifyContent: 'center' },
    history: { width: '48%', height: 36, alignSelf: 'center', fontSize: 15, marginTop: 4, textAlign: 'center', borderRadius: 10, justifyContent: 'center' },

    accountsButton: {
        width: '90%',
        height: 50,
        marginHorizontal: 24,
        fontSize: 17,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 16 : 56
    },
});

export default ConnectedAccountsScreen 