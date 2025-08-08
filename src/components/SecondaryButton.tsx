import { Text, type ViewStyle, TouchableOpacity } from 'react-native';
import  { useContext } from 'react';
import { ThemeContext } from '../common/ThemeContext';

type Props = {
  text: string;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
};
const SecondaryButton = (prop: Props) => {
  const { themeMain, fontMain } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[
        prop.style,
        {
          backgroundColor: themeMain.secondaryColor,
          justifyContent: 'center',
          borderRadius: 10,
        },
      ]}
      onPress={prop.onPress}
    >
      <Text
        style={[
          {
            alignSelf: 'center',
            fontFamily: fontMain.bold,
            color: themeMain.primaryColor,
          },
        ]}
      >
        {prop.text}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
