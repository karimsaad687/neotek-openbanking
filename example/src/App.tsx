import { Text, View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { multiply, NeoTek } from 'neotek-openbanking';
import { createContext, useEffect } from 'react';

const result = multiply(3, 7);



// Create context with defaults

export default function App() {
  useEffect(() => {
    console.log('====================================');
    console.log(StatusBar.currentHeight);
    console.log('====================================');
  }, [])
  console.log('====================================');


  const NeotekTheme = {
    themeMain: {
      primaryColor: '#0CBAB7',
      primaryButtonTextColor: '#ffffff',
      secondaryColor: '#D8ECEB',
      secondaryButtonTextColor: '#0CBAB4',
      textPrimaryColor: '#000000',
      textSecondaryColor: '#72788E',
      white: '#fff',
      gray: '#F7F8FA'
    },
    fontMain: {
      regular: 'sfprodisplayregular',
      bold: 'sfprodisplaybold',
      medium: 'sfprodisplaymedium',
      semiBold: 'sfprodisplaysemibold'
    }
  }
  return (
    <SafeAreaView style={[styles.container, { marginTop: 30 }]}>
      <StatusBar barStyle={'dark-content'} />
      <NeoTek theme={NeotekTheme} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
