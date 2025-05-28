import { Text, TouchableOpacity, View } from "react-native"
import { useContext } from 'react';
import { ThemeContext } from "../common/ThemeContext";

type Props = {
    text: string;

    onPress?: () => void;
}
const TitleDetails = (prop: Props) => {
    const { themeMain, fontMain } = useContext(ThemeContext);
    return (
        <View style={[{ justifyContent: 'space-between',marginTop: 16, backgroundColor: themeMain.gray, borderRadius: 10, flexDirection: 'row', width: '90%', alignSelf: 'center' }]}>
            <Text style={[{ alignSelf: 'flex-start', fontFamily: fontMain.bold, color: themeMain.textPrimaryColor, paddingVertical: 8, fontSize: 17, width: '70%', marginStart: 16 }]}>
                {prop.text}
            </Text>
            <TouchableOpacity onPress={prop.onPress} style={{ alignSelf: 'center',marginEnd:16 }}>
                <Text style={[{ alignSelf: 'center', fontFamily: fontMain.bold, color: themeMain.primaryColor, paddingVertical: 8, fontSize: 17, marginStart: 16 }]}>
                    {"Details"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default TitleDetails