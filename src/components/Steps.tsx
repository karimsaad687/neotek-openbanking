import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../common/ThemeContext';

type Props = {
  step: number;
};
const Steps = ({ step }: Props) => {
  const { themeMain } = useContext(ThemeContext);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={[
          styles.line,
          {
            backgroundColor: step > 0 ? themeMain.primaryColor : themeMain.gray,
          },
        ]}
      ></View>
      <View
        style={[
          styles.line,
          {
            backgroundColor: step > 1 ? themeMain.primaryColor : themeMain.gray,
            marginHorizontal: 8,
          },
        ]}
      ></View>
      <View
        style={[
          styles.line,
          {
            backgroundColor: step > 2 ? themeMain.primaryColor : themeMain.gray,
          },
        ]}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
});

export default Steps;
