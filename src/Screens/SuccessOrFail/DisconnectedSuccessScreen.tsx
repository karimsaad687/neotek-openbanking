import { View, StyleSheet, Image } from "react-native"
import { useContext, useEffect } from 'react';
import { ThemeContext } from "../../common/ThemeContext";
import { Images } from "../../assets";
import BoldText from "../../components/BoldText";
import RegularText from "../../components/RegularText";
import PrimaryButton from "../../components/PrimaryButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { useTranslation } from "react-i18next";
const DisconnectedSuccessScreen = () => {
    const { themeMain } = useContext(ThemeContext);
    const { t } = useTranslation();
    const navigation = useNavigation();
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
            eventEmitter.emit('step', 3)
            eventEmitter.emit('revokeTitle', "")
        }
    }, [isFocus])

    // useEffect(() => {
    //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    //     // Prevent default behavior of leaving the screen
    //     e.preventDefault();
  
    //     // Optionally show a confirmation dialog
    //     // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
    //     //   { text: 'Cancel', style: 'cancel', onPress: () => {} },
    //     //   { text: 'Yes', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
    //     // ]);
    //   });
  
    //   return unsubscribe;
    // }, [navigation]);
    return (
        <View style={{ flex: 1 ,backgroundColor:themeMain.white,alignItems:'center'}}>
            <Image source={Images.ic_success} style={{ width: 199, height: 199,marginTop:32 }} />
            <BoldText text={t('disconnected.disconnectedSuccessfully')} style={{ fontSize: 21, marginTop: 16 }} />
            <RegularText text={`${t('disconnected.disconnectedLine1')}`} style={{ fontSize: 13, marginTop: 12,textAlign:'center',width:'70%' }} />
            <RegularText text={`${t('disconnected.disconnectedLine2')}`} style={{ fontSize: 13, marginTop: 12,textAlign:'center',width:'70%' }} />
            <RegularText text={`${t('disconnected.disconnectedLine3')}`} style={{ fontSize: 13, marginTop: 12,textAlign:'center',width:'75%' }} />

            <PrimaryButton text={t('disconnected.backToConnectedAccounts')} style={styles.button} onPress={() => { navigation.goBack(); navigation.goBack(); }} />

            
        </View>
    )
}

export default DisconnectedSuccessScreen
const styles = StyleSheet.create({
    button: { width: '90%', height: 50, marginHorizontal: 24, marginTop: 16, alignSelf: 'center', bottom: 70, position: 'absolute' }
})