import { View, ScrollView, Image, StyleSheet, Modal, FlatList,TouchableOpacity } from "react-native"
import { ThemeContext } from "../../common/ThemeContext";
import { Images } from '../../assets';
import { useContext, useEffect } from 'react';
import BoldText from "../../components/BoldText";
import RegularText from "../../components/RegularText";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import TitleDetails from "../../components/TitleDetails";
import ConsentPolicy from "../../components/ConsentPolicy";
import SecondaryButton from "../../components/SecondaryButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { useTranslation } from "react-i18next";
import SemiBoldText from "../../components/SemiBoldText";
import RejectButton from "../../components/RejectButton";
const ManageAccountScreen = () => {
    const { themeMain } = useContext(ThemeContext);
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [visibleYourData, setVisibleYourData] = useState(false);

    const { t } = useTranslation();
    const MyNativeModule = NativeModules.NeotekOpenbanking;
    let eventEmitter = null;
    if (Platform.OS === 'ios' && MyNativeModule) {
        eventEmitter = new NativeEventEmitter(MyNativeModule);
    } else {
        eventEmitter = new NativeEventEmitter()
    }
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            eventEmitter.emit('revokeTitle', t('manageAccount.title'))
        }
    }, [isFocus])
    return (
        <View style={{ backgroundColor: themeMain.white, flex: 1 }}>
            <ScrollView style={{ flex: 1, }}>

                <View style={[styles.itemTopContainer]}>
                    <Image source={Images.test_bank_logo} style={{ width: 50, height: 50, alignSelf: 'center', marginStart: 16 }} />
                    <BoldText text="Alrajhi Bank" style={{ fontSize: 17, alignSelf: 'center', marginStart: 8 }} />
                    <View style={[styles.radio, { backgroundColor: '#DCFCE7' }]} >
                        <SemiBoldText text="Active" style={{ fontSize: 13, alignSelf: 'center', color: '#16A34A' }} />
                    </View>
                </View>

                <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'space-between', height: 1, marginBottom: 16, backgroundColor: '#E6E9EF' }} />

                <FlatList
                    style={{ marginTop: 16 }}
                    data={["Current Account", "Saving Account"]}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: '90%', alignSelf: 'center', marginBottom: 16, backgroundColor: themeMain.gray, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 }} >
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={Images.ic_card} style={{ width: 24, height: 24, alignSelf: 'center', marginStart: 16 }} />
                                    <BoldText text={item} style={{ fontSize: 17, alignSelf: 'center', marginStart: 8 }} />
                                </View>
                                <RegularText text="973245984357439" style={{ fontSize: 15, marginStart: 48 }} />
                            </View>
                        )
                    }}
                />

                <BoldText text={t('connectAccounts.title')} style={{ fontSize: 21, marginTop: 16, marginStart: 24 }} />

                <ConsentPolicy image={Images.ic_account_details} text={t('details.yourAccountDetails')} style={{ width: '90%', alignSelf: 'center', marginTop: 24 }} data={[t('details.yourAccountNameAndNumber'), t('details.yourAccountBalance')]} />

                <ConsentPolicy image={Images.ic_regular_payments} text={t('details.yourRegularPayments')} style={{ width: '90%', alignSelf: 'center', marginTop: 16 }} data={[t('details.yourIncomingTransactions'), t('details.yourOutgoingTransactions'), t('details.detailsYourIncomingTransactions'), t('details.detailsYourOutgoingTransactions')]} />
                <ConsentPolicy image={Images.ic_account_transactions} text={t('details.yourAccountTransactions')} style={{ width: '90%', alignSelf: 'center', marginTop: 16 }} data={[t('details.directDebit'), t('details.standingOrders'), t('details.scheduledPayments')]} />


                <View style={styles.divider} />

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
                <View style={styles.verticalLine} />

                <TitleDetails text={t('connectAccounts.howWeAreUsingYourData')} onPress={() => { setVisibleYourData(true) }} />
                <RejectButton text={t('disconnect')} style={styles.continueToBankBtn} onPress={() => { setVisible(true) }} />

            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={[styles.scrollModelContainer, { backgroundColor: themeMain.gray }]}>
                        <Image source={Images.ic_popupbar} style={{ width: 40, height: 6, marginTop: 16, alignSelf: 'center' }} />
                        <BoldText text={t('connectAccounts.theImpactToYourService')} style={{ fontSize: 21, marginTop: 40, marginStart: 24 }} />
                        <RegularText text={t('connectAccounts.theImpactToYourServiceDetails')} style={{ fontSize: 15, marginTop: 4, marginHorizontal: 24 }} />

                        <BoldText text={t('connectAccounts.whatThisMeans')} style={{ fontSize: 21, marginTop: 16, marginStart: 24 }} />

                        <FlatList
                            style={{ marginTop: 16 }}
                            data={["Current Account", "Saving Account"]}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ width: '90%', alignSelf: 'center', marginBottom: 16, backgroundColor: themeMain.white, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 }} >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={Images.ic_card} style={{ width: 24, height: 24, alignSelf: 'center', marginStart: 16 }} />
                                            <BoldText text={item} style={{ fontSize: 17, alignSelf: 'center', marginStart: 8 }} />
                                        </View>
                                        <RegularText text="973245984357439" style={{ fontSize: 17, marginStart: 48 }} />
                                    </View>
                                )
                            }}
                        />
                        <BoldText text={t('connectAccounts.dataWeGet')} style={{ fontSize: 21, marginStart: 24 }} />

                        <View style={{ paddingVertical: 8, flexDirection: 'row', width: '90%', alignSelf: 'flex-start', marginStart: 24 }}>
                            <Image source={Images.ic_dot} style={{ width: 24, height: 24, alignSelf: 'flex-start' }} />
                            <SemiBoldText text={t('connectAccounts.dataWeGet1')} style={{ fontSize: 17, alignSelf: 'flex-start' }} />
                        </View>

                        <View style={{ paddingVertical: 8, flexDirection: 'row', width: '90%', alignSelf: 'flex-start', marginStart: 24 }}>
                            <Image source={Images.ic_dot} style={{ width: 24, height: 24, alignSelf: 'flex-start' }} />
                            <SemiBoldText text={t('connectAccounts.dataWeGet2')} style={{ fontSize: 17, alignSelf: 'flex-start' }} />
                        </View>

                        <View style={{ paddingVertical: 8, flexDirection: 'row', width: '90%', alignSelf: 'flex-start', marginStart: 24 }}>
                            <Image source={Images.ic_dot} style={{ width: 24, height: 24, alignSelf: 'flex-start' }} />
                            <SemiBoldText text={t('connectAccounts.dataWeGet3')} style={{ fontSize: 17, alignSelf: 'flex-start' }} />
                        </View>

                        <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'space-between', height: 1, marginVertical: 16, backgroundColor: '#E6E9EF' }} />

                        <View style={{ flexDirection: 'row',width: '90%', alignSelf: 'center',justifyContent: 'space-between' }}>
                            <BoldText text={t('connectAccounts.clickHereForOur')} style={{ fontSize: 17, alignSelf: 'center', marginStart: 8 }} />
                            <TouchableOpacity><BoldText text={t('connectAccounts.termsOfService')} style={{ fontSize: 17, alignSelf: 'center', marginStart: 8,color: themeMain.primaryColor }} /></TouchableOpacity>
                        </View>
                        <RejectButton text={t('confirm')} style={styles.modalPrimary} onPress={() => { setVisible(false); navigation.navigate('DisconnectedSuccess') }} />
                        <SecondaryButton text={t('cancel')} style={styles.modalSecondary} onPress={() => { setVisible(false) }} />
                    </ScrollView>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleYourData}
                onRequestClose={() => setVisibleYourData(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.container, { backgroundColor: themeMain.white }]}>
                        <Image source={Images.ic_popupbar} style={{ width: 40, height: 6, marginTop: 16, alignSelf: 'center' }} />
                        <BoldText text={(t('connectAccounts.howWeAreUsingYourData'))} style={{ fontSize: 21, marginTop: 40, marginStart: 24 }} />
                        <RegularText text={(t('connectAccounts.howWeAreUsingYourDataDetails'))} style={{ fontSize: 15, marginTop: 4, marginHorizontal: 24 }} />

                        <PrimaryButton text={t("gotIt")} style={styles.modalSecondary} onPress={() => { setVisibleYourData(false) }} />
                    </View>
                </View>
            </Modal>




        </View>
    )
}

const styles = StyleSheet.create({
    container: { width: '100%', backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
    scrollModelContainer: { width: '100%', backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, marginTop: 140 },
    modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    imagesContainer: { width: 237, height: 61, alignSelf: 'center', marginTop: 32, flexDirection: 'row' },
    imagesDashedLine: { width: 115, height: 2, borderWidth: 1, alignSelf: 'center', borderColor: '#E6E9EF', start: 62, top: 30.5, position: 'absolute', borderStyle: 'dashed' },
    imagesFrame: { width: 61, height: 61, borderColor: '#E6E6E6', borderRadius: 6, borderWidth: 1, justifyContent: 'center' },
    divider: { width: '90%', height: 1, alignSelf: 'center', backgroundColor: '#E6E9EF', marginTop: 24 },
    verticalLine: { width: '90%', height: 1, alignSelf: 'center', backgroundColor: '#E6E9EF', marginVertical: 24 },
    continueToBankBtn: { width: '90%', height: 50, marginHorizontal: 24, marginTop: 16, alignSelf: 'center', marginBottom: 70 },
    modalPrimary: { width: '90%', height: 50, marginHorizontal: 24, marginTop: 16, alignSelf: 'center' },
    modalSecondary: { width: '90%', height: 50, marginHorizontal: 24, marginTop: 16, alignSelf: 'center', marginBottom: 70 },
    itemTopContainer: {
        width: '100%',
        height: 73,
        flexDirection: 'row',
        borderRadius: 10,
    },
    radio: {
        resizeMode: 'stretch',
        paddingVertical: 3,
        paddingHorizontal: 10,
        alignSelf: 'center',
        position: 'absolute',
        end: 16
    },
});

export default ManageAccountScreen 