import { View, StyleSheet, Image } from "react-native"
import { useContext, useEffect } from 'react';
import { ThemeContext } from "../../common/ThemeContext";
import { Images } from "../../assets";
import BoldText from "../../components/BoldText";
import RegularText from "../../components/RegularText";
import PrimaryButton from "../../components/PrimaryButton";
import { useIsFocused } from "@react-navigation/native";
import {
    NativeEventEmitter,
} from 'react-native'
import { useTranslation } from "react-i18next";
const SuccessScreen = () => {
    const { themeMain } = useContext(ThemeContext);
    const { t } = useTranslation();
    const eventEmitter = new NativeEventEmitter();
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            eventEmitter.emit('step', 3)
        }
    }, [isFocus])
    return (
        <View style={{ flex: 1 ,backgroundColor:themeMain.white,alignItems:'center'}}>
            <Image source={Images.ic_success} style={{ width: 199, height: 199,marginTop:32 }} />
            <BoldText text={t('thankYou')} style={{ fontSize: 21, marginTop: 16 }} />
            
            <RegularText text={`${t('success.weHaveReceivedTheRequestInformation')}\n${t('success.fromYourSelectedAccounts')}`} style={{ fontSize: 13, marginTop: 4,textAlign:'center' }} />

            <PrimaryButton text={t('done')} style={styles.button} onPress={() => {  }} />

            
        </View>
    )
}

export default SuccessScreen
const styles = StyleSheet.create({
    button: { width: '90%', height: 50, marginHorizontal: 24, marginTop: 16, alignSelf: 'center', bottom: 70, position: 'absolute' }
})