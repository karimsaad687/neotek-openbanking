import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Images } from "../assets"
import BoldText from "./BoldText"
import { useNavigation } from "@react-navigation/native"
import { I18nManager } from "react-native"
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
type Props = {
    title: string
}
const RevokeHeader = ({ title }: Props) => {
    const navigation = useNavigation()
    const MyNativeModule = NativeModules.NeotekOpenbanking;
    let eventEmitter = null;
    if (Platform.OS === 'ios' && MyNativeModule) {
        eventEmitter = new NativeEventEmitter(MyNativeModule);
    } else {
        eventEmitter = new NativeEventEmitter()
    }
    return (
        <View style={styles.header}>
            {title && <TouchableOpacity onPress={() => { if (navigation.canGoBack()) { navigation.goBack() } else eventEmitter.emit('finish', "") }}>
                <Image
                    source={Images.back}
                    style={{ width: 32, height: 32, transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
                />
            </TouchableOpacity>}
            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <BoldText text={title} style={{ fontSize: 16, alignSelf: 'center' }} />
            </View>

        </View>
    )

}

export default RevokeHeader
const styles = StyleSheet.create({
    header: { flexDirection: 'row', marginTop: 20, marginHorizontal: 16, justifyContent: 'flex-start', alignItems: 'center' }
})