import { View, ActivityIndicator, Image } from "react-native"
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from "../../common/ThemeContext";
import { Images } from "../../assets";
import BoldText from "../../components/BoldText";
import RegularText from "../../components/RegularText";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { useTranslation } from "react-i18next";
import { createConsent, getAccount } from "../../common/apis";
import moment from "moment";
// import WebView from "react-native-webview";
import NativeWebView from './NativeWebView';
const RedirectionScreen = () => {
  const { themeMain } = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute()
  const { t } = useTranslation();
  const [url, setUrl] = useState("")
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
    createConsent(route.params.account.FinancialInstitution.FinancialInstitutionId, route.params.account.UserLoginId, moment().add(1, 'years').format()).then((res) => {
      console.log(res?.Data?.RedirectionURL)
      setUrl(res?.Data?.RedirectionURL)
      console.log(res?.Data?.AccountsLinkId)
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (url) {
        getAccount(1, route.params.account.AccountsLinkId).then((res) => {
          console.log(res?.Data?.AccountsLinks[0]?.Status)
          if (res?.Data?.AccountsLinks[0]?.Status === "Active") {
            navigation.navigate("Success")
          } else if (res?.Data?.AccountsLinks[0]?.Status === "Fail") {
            navigation.navigate("Fail")
          }
        })
      }
      // Put your repeated code here
    }, 5000); // 5000 ms = 5 seconds

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: themeMain.white, alignItems: 'center' }}>
      {/* <Image source={Images.ic_neotek} style={{ width: 94, height: 94, marginTop: 100 }} />
            <BoldText text={t('redirection.transferringYouTo')} style={{ fontSize: 21, marginTop: 26 }} />
            <BoldText text="Alrajhi Bank" style={{ fontSize: 21 }} />
            <RegularText text={t('redirection.weAreSecurelyTransferringYouTo')} style={{ fontSize: 13, marginTop: 4 }} />
            <RegularText text="your alrajhi bank from Emkan." style={{ fontSize: 13 }} />
            <View style={{ width: '100%', height: '100%' ,backgroundColor:'red' }}>
              
            </View>
            {/* <WebView source={{ uri: "https://reactnative.dev/" }} style={{ width: '100%', height: '100%' }} /> */}
      {!url && <ActivityIndicator size="large" color={themeMain.primaryColor} style={{ marginTop: 56 }} />}
      {url && <NativeWebView style={{ width: '100%', height: '93%' }} url={url} onLoadEnd={() => {
        console.log('WebView finished loading');
        // Hide a loading spinner, trigger logic, etc.
      }} />}
    </View>
  )
}

export default RedirectionScreen