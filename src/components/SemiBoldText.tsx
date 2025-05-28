import { Text,TextStyle  } from "react-native"
import React, { useContext } from 'react';
import { ThemeContext } from "../common/ThemeContext";

type Props = {
    text:string;
    style?: TextStyle | TextStyle[];
}
const SemiBoldText=(prop:Props)=>{
    const { themeMain,fontMain } = useContext(ThemeContext);
    return (
        <Text style={[{flexShrink:1,fontFamily:fontMain.semiBold,color:themeMain.textPrimaryColor,fontWeight:'600'},prop.style]}>
            {prop.text}
        </Text>
    )
}

export default SemiBoldText