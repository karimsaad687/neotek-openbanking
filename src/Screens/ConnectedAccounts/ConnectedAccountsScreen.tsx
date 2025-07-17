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
import SemiBoldText from "../../components/SemiBoldText";
const ConnectedAccountsScreen = () => {
    const { themeMain } = useContext(ThemeContext);
    const [selectedIndex, setSelectedIndex] = useState(1)
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
    type Accounts = {
        BankName: string,
        Status: string,
        Date: string,
        Connection: string,
        Accounts: string[]
    }
    useEffect(() => {
        if (isFocus) {
            eventEmitter.emit('revoke', true)
            eventEmitter.emit('revokeTitle', t('connectAccounts.title'))
        }
    }, [isFocus])
    const current: Accounts[] = [{
        BankName: "Alrajhi Bank",
        Status: "Active",
        Date: "12/12/2022",
        Connection: "On going",
        Accounts: ["Saving Account", "Current Account", "Credit Card Account", "Prepaid Card Account"]
    },
    {
        BankName: "Anb Bank",
        Status: "Disconnected",
        Date: "12/12/2022",
        Connection: "On going",
        Accounts: ["Saving Account", "Current Account", "Credit Card Account"]
    },
    {
        BankName: "SNB Bank",
        Status: "Expired",
        Date: "12/12/2022",
        Connection: "On going",
        Accounts: ["Saving Account", "Current Account"]
    },
    {
        BankName: "Alinma Bank",
        Status: "Rejected",
        Date: "12/12/2022",
        Connection: "On going",
        Accounts: ["Saving Account", "Current Account", "Prepaid Card Account"]
    }]

    const history: Accounts[] = [
        {
            BankName: "Anb Bank",
            Status: "Disconnected",
            Date: "12/12/2022",
            Connection: "On going",
            Accounts: ["Saving Account", "Current Account", "Credit Card Account"]
        }, {
            BankName: "Alrajhi Bank",
            Status: "Active",
            Date: "12/12/2022",
            Connection: "On going",
            Accounts: ["Saving Account", "Current Account", "Credit Card Account", "Prepaid Card Account"]
        },
    ]
    return (
        <View style={{ backgroundColor: themeMain.white, flex: 1, }}>

            <View style={[styles.currentHistoryContainer, { backgroundColor: themeMain.gray }]} >
                <TouchableOpacity style={[styles.current, { backgroundColor: selectedIndex == 1 ? themeMain.primaryColor : themeMain.gray }]} onPress={() => { setSelectedIndex(1) }}>
                    <SemiBoldText text={t("connectAccounts.current")} style={{ color: selectedIndex == 1 ? themeMain.white : themeMain.textSecondaryColor, alignSelf: 'center' }} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.history, { backgroundColor: selectedIndex == 2 ? themeMain.primaryColor : themeMain.gray }]} onPress={() => { setSelectedIndex(2) }}>
                    <SemiBoldText text={t("connectAccounts.history")} style={{ color: selectedIndex == 2 ? themeMain.white : themeMain.textSecondaryColor, alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ marginTop: 16, marginHorizontal: 24, marginBottom: 130 }}
                data={selectedIndex == 1 ? current : history}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    const items = [];
                    for (let i = 0; i < item.Accounts.length; i++) {
                        items.push(<View style={{ paddingVertical: 8, flexDirection: 'row' }}>
                            <Image source={Images.ic_dot} style={{ width: 24, height: 24, alignSelf: 'flex-start' }} />
                            <SemiBoldText text={item.Accounts[i] || ""} style={{ fontSize: 17, alignSelf: 'flex-start' }} />
                        </View>);
                    }
                    const views = <View style={{ width: '90%', alignSelf: 'center', marginBottom: 16 }}>{items}</View>

                    return (
                        <View style={[styles.itemContainer, { backgroundColor: themeMain.gray }]}>
                            <View style={[styles.itemTopContainer, { backgroundColor: themeMain.gray }]}>
                                <Image source={Images.test_bank_logo} style={{ width: 50, height: 50, alignSelf: 'center', marginStart: 16 }} />
                                <BoldText text={item.BankName} style={{ fontSize: 17, alignSelf: 'center', marginStart: 8 }} />
                                <View style={[styles.radio, { borderRadius: 4,backgroundColor: item.Status == "Active" ? '#DCFCE7' : item.Status == "Disconnected" ? '#FEE2E2' : item.Status == "Rejected" ? '#E6ECF2' : '#FEF3C7' }]} >
                                    <SemiBoldText text={item.Status} style={{ fontSize: 13, alignSelf: 'center', color: item.Status == "Active" ? '#16A34A' : item.Status == "Disconnected" ? '#DC2626' : item.Status == "Rejected" ? '#475569' : '#D97706' }} />
                                </View>
                            </View>
                            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'flex-start' }}>
                                    <RegularText text={t('details.sharingDataFrom')} style={{ fontSize: 15 }} />
                                    <BoldText text="2022-10-19" style={{ fontSize: 17 }} />
                                </View>
                                <View style={{ width: 1, height: 40, backgroundColor: '#E6E9EF' }} />
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <RegularText text={t('details.connectionExpires')} style={{ fontSize: 15 }} />
                                    <BoldText text="On going" style={{ fontSize: 17, alignSelf: 'flex-end' }} />
                                </View>
                            </View>
                            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'space-between', height: 1, marginVertical: 16, backgroundColor: '#E6E9EF' }} />
                            {views}
                            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'space-between', height: 1, backgroundColor: '#E6E9EF' }} />
                            <TouchableOpacity style={{ alignSelf: 'center', marginVertical: 23 }} onPress={() => { navigation.navigate('ManageAccount') }}>
                                <BoldText text={t("connectAccounts.manage")} style={{ fontSize: 17, color: themeMain.primaryColor }} />
                            </TouchableOpacity>
                        </View>
                    )
                }} />

            <PrimaryButton text={t("connectAccounts.connectAnotherAccount")} style={styles.accountsButton} onPress={() => {
                navigation.navigate('Home')
                eventEmitter.emit('revoke', false)
            }} />
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
        fontSize:17,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 16 : 56
    },
});

export default ConnectedAccountsScreen 