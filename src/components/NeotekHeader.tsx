import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Images } from "../assets"
import BoldText from "./BoldText"
import Steps from "./Steps"
import { useNavigation } from "@react-navigation/native"

type Props = {
    step:number,
    title:string,
    showBack:boolean

}
const NeotekHeader = ({step,title,showBack }:Props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            {showBack && <TouchableOpacity onPress={() => {if(navigation.canGoBack()) {navigation.goBack()}} }>
                <Image
                    source={Images.back}
                    style={{ width: 32, height: 32 }}
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