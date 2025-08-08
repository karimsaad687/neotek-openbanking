import {
  TouchableOpacity,
  StyleSheet,
  type ViewStyle,
  FlatList,
  View,
  Image,
} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../common/ThemeContext';
import BoldText from './BoldText';
import { Images } from '../assets';
import { useState } from 'react';
import SemiBoldText from './SemiBoldText'; 
type Props = {
  text: string;
  style?: ViewStyle | ViewStyle[];
  image: any;
  data: string[];
};
const ConsentPolicy = (prop: Props) => {
  const { themeMain } = useContext(ThemeContext);
  const [selected, setSelected] = useState(false);
  return (
    <View
      style={[
        prop.style,
        styles.itemContainer,
        { backgroundColor: themeMain.gray },
      ]}
    >
      <TouchableOpacity
        style={[styles.titleContainer, { backgroundColor: themeMain.gray }]}
        onPress={() => {
          setSelected(!selected);
        }}
      >
        <Image
          source={prop.image}
          style={{
            width: 24,
            height: 24,
            alignSelf: 'center',
            marginStart: 16,
          }}
        />
        <BoldText
          text={prop.text}
          style={{ fontSize: 17, alignSelf: 'center', marginStart: 8 }}
        />
        <Image
          source={Images.ic_down_arrow}
          style={{
            transform: [{ rotate: selected ? '0deg' : '180deg' }],
            width: 20,
            height: 20,
            alignSelf: 'center',
            position: 'absolute',
            end: 16,
          }}
        />
      </TouchableOpacity>
      {selected && (
        <View
          style={{
            width: '90%',
            height: 1,
            alignSelf: 'center',
            backgroundColor: '#E6E9EF',
            marginVertical: 8,
          }}
        />
      )}
      {selected && (
        <FlatList
          style={{ marginHorizontal: 16, marginBottom: 8 }}
          data={prop.data}
          renderItem={({ item }) => (
            <View
              style={[styles.detailsItemsContainer, { paddingVertical: 8 }]}
            >
              <Image
                source={Images.ic_dot}
                style={{ width: 24, height: 24, alignSelf: 'flex-start' }}
              />
              <SemiBoldText
                text={item}
                style={{
                  fontSize: 17,
                  alignSelf: 'flex-start',
                  textAlign: 'left',
                }}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ConsentPolicy;
const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 16,
    minHeight: 56,
  },
  detailsItemsContainer: {
    flexDirection: 'row',
  },
  titleContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    paddingVertical: 8,
    minHeight: 56,
  },
});
