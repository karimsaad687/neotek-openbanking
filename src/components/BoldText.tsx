import { Text, type TextStyle } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../common/ThemeContext';

type Props = {
  text: any;
  style?: TextStyle | TextStyle[];
};
const BoldText = (prop: Props) => {
  const { themeMain, fontMain } = useContext(ThemeContext);
  return (
    <Text
      style={[
        {
          flexShrink: 1,
          fontFamily: fontMain.bold,
          color: themeMain.textPrimaryColor,
        },
        prop.style,
      ]}
    >
      {prop.text}
    </Text>
  );
};

export default BoldText;
