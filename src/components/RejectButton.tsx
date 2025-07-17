import { Text, ViewStyle, TouchableOpacity } from "react-native"
import React, { useContext } from 'react';
import { ThemeContext } from "../common/ThemeContext";

type Props = {
    text: string;
    style?: ViewStyle | ViewStyle[];
    onPress?: () => void;
}
const RejectButton = (prop: Props) => {
    const { themeMain, fontMain } = useContext(ThemeContext);
    return (
        <TouchableOpacity style={[prop.style, { backgroundColor: '#FECACA',justifyContent:'center', borderRadius: 10 }]}
            onPress={prop.onPress}>
            <Text style={[{ alignSelf:'center',fontFamily: fontMain.bold, color: '#EF4444' }]}>
                {prop.text}
            </Text>
        </TouchableOpacity>
    )
}

export default RejectButton