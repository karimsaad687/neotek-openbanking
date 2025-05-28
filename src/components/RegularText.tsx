import { Text,TextStyle  } from "react-native"
import React, { useContext } from 'react';
import { ThemeContext } from "../common/ThemeContext";

type Props = {
    text:string;
    style?: TextStyle | TextStyle[];
}
const RegularText=(prop:Props)=>{
    const { themeMain,fontMain } = useContext(ThemeContext);
    return (
        <Text style={[{fontFamily:fontMain.regular,color:themeMain.textSecondaryColor},prop.style]}>
            {prop.text}
        </Text>
    )
}

export default RegularText