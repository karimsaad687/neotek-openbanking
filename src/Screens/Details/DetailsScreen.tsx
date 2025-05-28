import { View, ScrollView, Image, StyleSheet, Modal } from "react-native"
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
import {
    NativeEventEmitter,
} from 'react-native'
import { useTranslation } from "react-i18next";
const DetailsScreen = () => {
    const { themeMain } = useContext(ThemeContext);
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [visibleWhyShare, setVisibleWhyShare] = useState(false);
    const [visibleWillGet, setVisibleWillGet] = useState(false);
    const { t } = useTranslation();
    const eventEmitter = new NativeEventEmitter();
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            eventEmitter.emit('step', 1)
        }
    }, [isFocus])
    return (
        <View style={{ backgroundColor: themeMain.white, flex: 1 }}>
            <ScrollView style={{ flex: 1, }}>

                <View style={styles.imagesContainer}>
                    <View style={styles.imagesDashedLine} />
                    <View style={styles.imagesFrame} >
                        <Image source={Images.ic_emkan_logo} style={{ width: 47, height: 14, alignSelf: 'center' }} />
                    </View>
                    <Image source={Images.ic_neotek} style={{ width: 50, height: 50, marginHorizontal: 32, alignSelf: 'center' }} />
                    <View style={styles.imagesFrame} >
                        <Image source={Images.ic_emkan_logo} style={{ width: 47, height: 14, alignSelf: 'center' }} />
                    </View>
                </View>
                <BoldText text={t('details.connectYourAccount')} style={{ fontSize: 21, marginTop: 40, marginStart: 24 }} />
                <RegularText text={t('details.connectYourAccountDesc')} style={{ fontSize: 15, marginTop: 4, marginHorizontal: 24 }} />
                <TitleDetails text={t('details.whyWeNeedToShareYourData')} onPress={() => { setVisibleWhyShare(true) }} />
                <TitleDetails text={t('details.whatYouWillGetInReturn')} onPress={() => { setVisibleWillGet(true) }} />

                <View style={styles.divider} />

                <ConsentPolicy image={Images.ic_account_details} text={t('details.yourAccountDetails')} style={{ width: '90%', alignSelf: 'center', marginTop: 24 }} data={[t('details.yourAccountNameAndNumber'), t('details.yourAccountBalance')]} />

                <ConsentPolicy image={Images.ic_regular_payments} text={t('details.yourRegularPayments')} style={{ width: '90%', alignSelf: 'center', marginTop: 16 }} data={[t('details.yourIncomingTransactions'), t('details.yourOutgoingTransactions'), t('details.detailsYourIncomingTransactions'), t('details.detailsYourOutgoingTransactions')]} />
                <ConsentPolicy image={Images.ic_account_transactions} text={t('details.yourAccountTransactions')} style={{ width: '90%', alignSelf: 'center', marginTop: 16 }} data={[t('details.directDebit'), t('details.standingOrders'), t('details.scheduledPayments')]} />
                <ConsentPolicy image={Images.ic_contact_party_details} text={t('details.contactAndParty')} style={{ width: '90%', alignSelf: 'center', marginTop: 16 }} data={[t('details.contactAndPartyDetails')]} />


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
                <PrimaryButton text={t('details.continueWithYourBank')} style={styles.continueToBankBtn} onPress={() => { setVisible(true) }} />

            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.container, { backgroundColor: themeMain.white }]}>
                        <Image source={Images.ic_popupbar} style={{ width: 40, height: 6, marginTop: 16, alignSelf: 'center' }} />
                        <BoldText text={t('details.confirmYourRedirection')} style={{ fontSize: 21, marginTop: 40, marginStart: 24 }} />
                        <RegularText text={t('details.confirmYourRedirectionDesc')} style={{ fontSize: 15, marginTop: 4, marginHorizontal: 24 }} />

                        <PrimaryButton text={t('details.allowRedirection')} style={styles.modalPrimary} onPress={() => { setVisible(false); navigation.navigate('Redirection') }} />
                        <SecondaryButton text={t('cancel')} style={styles.modalSecondary} onPress={() => { setVisible(false) }} />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleWillGet}
                onRequestClose={() => setVisibleWillGet(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.container, { backgroundColor: themeMain.white }]}>
                        <Image source={Images.ic_popupbar} style={{ width: 40, height: 6, marginTop: 16, alignSelf: 'center' }} />
                        <BoldText text={(t('details.whatYouWillGetInReturn'))} style={{ fontSize: 21, marginTop: 40, marginStart: 24 }} />
                        <RegularText text={(t('details.whatYouWillGetInReturnDesc'))} style={{ fontSize: 15, marginTop: 4, marginHorizontal: 24 }} />

                        <PrimaryButton text={t("gotIt")} style={styles.modalSecondary} onPress={() => { setVisibleWillGet(false) }} />
                    </View>
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleWhyShare}
                onRequestClose={() => setVisibleWhyShare(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.container, { backgroundColor: themeMain.white }]}>
                        <Image source={Images.ic_popupbar} style={{ width: 40, height: 6, marginTop: 16, alignSelf: 'center' }} />
                        <BoldText text={t('details.whyWeNeedToShareYourData')} style={{ fontSize: 21, marginTop: 40, marginStart: 24 }} />
                        <RegularText text={t('details.whhyWeNeedToShareYourDataDesc')} style={{ fontSize: 15, marginTop: 4, marginHorizontal: 24 }} />

                        <PrimaryButton text={t("gotIt")} style={styles.modalSecondary} onPress={() => { setVisibleWhyShare(false) }} />
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: { width: '100%', backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
    modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    imagesContainer: { width: 237, height: 61, alignSelf: 'center', marginTop: 32, flexDirection: 'row' },
    imagesDashedLine: { width: 115, height: 2, borderWidth: 1, alignSelf: 'center', borderColor: '#E6E9EF', start: 62, top: 30.5, position: 'absolute', borderStyle: 'dashed' },
    imagesFrame: { width: 61, height: 61, borderColor: '#E6E6E6', borderRadius: 6, borderWidth: 1, justifyContent: 'center' },
    divider: { width: '90%', height: 1, alignSelf: 'center', backgroundColor: '#E6E9EF', marginTop: 24 },
    verticalLine: { width: '90%', height: 1, alignSelf: 'center', backgroundColor: '#E6E9EF', marginVertical: 24 },
    continueToBankBtn: { width: '90%', height: 50, marginHorizontal: 24, marginTop: 16, alignSelf: 'center', marginBottom: 70 },
    modalPrimary: { width: '90%', height: 50, marginHorizontal: 24, marginTop: 16, alignSelf: 'center' },
    modalSecondary: { width: '90%', height: 50, marginHorizontal: 24, marginTop: 16, alignSelf: 'center', marginBottom: 70 }
});

export default DetailsScreen 