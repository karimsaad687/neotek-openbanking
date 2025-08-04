import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Images } from "../assets"
import BoldText from "./BoldText"
import Steps from "./Steps"
import { useNavigation } from "@react-navigation/native"
import { I18nManager } from "react-native"
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';


type Props = {
    step: number,
    title: string,
    showBack: boolean

}
const NeotekHeader = ({ step, title, showBack }: Props) => {
    const navigation = useNavigation();
    const MyNativeModule = NativeModules.NeotekOpenbanking;
    let eventEmitter = null;
    if (Platform.OS === 'ios' && MyNativeModule) {
        eventEmitter = new NativeEventEmitter(MyNativeModule);
    } else {
        eventEmitter = new NativeEventEmitter()
    }
    return (
        <View style={styles.header}>
            {showBack && <TouchableOpacity onPress={() => { if (navigation.canGoBack()) { navigation.goBack() } else eventEmitter.emit('finish', "") }}>
                <Image
                    source={Images.back}
                    style={{ width: 32, height: 32, transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
                />
            </TouchableOpacity>}
            <View style={{ flex: 1, alignItems: 'center' }}>
                <BoldText text={title} style={{ fontSize: 16, marginBottom: 12 }} />
                <Steps step={step} />
            </View>

        </View>
    )

}

export default NeotekHeader
const styles = StyleSheet.create({
    header: { flexDirection: 'row', marginTop: 20, marginHorizontal: 16, justifyContent: 'flex-start', alignItems: 'center' }
})