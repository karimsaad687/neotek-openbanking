import { View, ActivityIndicator, Image } from "react-native"
import { useContext, useEffect } from 'react';
import { ThemeContext } from "../../common/ThemeContext";
import { Images } from "../../assets";
import BoldText from "../../components/BoldText";
import RegularText from "../../components/RegularText";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { useTranslation } from "react-i18next";
import { use } from "i18next";
import { createConsent } from "../../common/apis";
import moment from "moment";
const RedirectionScreen = () => {
    const { themeMain } = useContext(ThemeContext);
    const navigation = useNavigation();
    const route = useRoute()
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
            eventEmitter.emit('step', 2)
            eventEmitter.emit('title', t("redirection.title"))
        }
    }, [isFocus])

    // setTimeout(() => {
    //     navigation.navigate("Fail")
    // }, 3000)
    useEffect(() => {
      createConsent(route.params.account.FinancialInstitution.FinancialInstitutionId,route.params.account.UserLoginId,moment().add(1,'years').format()).then((res)=>{
        console.log(res)
      })
    },[])
    return (
        <View style={{ flex: 1, backgroundColor: themeMain.white, alignItems: 'center' }}>
            <Image source={Images.ic_neotek} style={{ width: 94, height: 94, marginTop: 100 }} />
            <BoldText text={t('redirection.transferringYouTo')} style={{ fontSize: 21, marginTop: 26 }} />
            <BoldText text="Alrajhi Bank" style={{ fontSize: 21 }} />
            <RegularText text={t('redirection.weAreSecurelyTransferringYouTo')} style={{ fontSize: 13, marginTop: 4 }} />
            <RegularText text="your alrajhi bank from Emkan." style={{ fontSize: 13 }} />

            <ActivityIndicator size="large" color={themeMain.primaryColor} style={{ marginTop: 56 }} />
        </View>
    )
}

export default RedirectionScreen