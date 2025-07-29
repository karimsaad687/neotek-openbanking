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
    },credentials: {
      'client_id':     'ce5ab5564ada556285fe918cbf081b0a',
      'client_secret': '526fc65b56eb551d2c4c18bc27b1f325',
      'scope':         'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey':       '123456',
      'apiKey':        'eyJ4NXQiOiJPREUzWTJaaE1UQmpNRE00WlRCbU1qQXlZemxpWVRJMllqUmhZVFpsT0dJeVptVXhOV0UzWVE9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6ImFkbWluIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IjIwUGVyTWluIiwibmFtZSI6IlNESyIsImlkIjoxMTUsInV1aWQiOiJlNjgxYzZjNS1kNjBiLTRiMGItYWY2MC1jMDY2YzQwYjRhYzgifSwiaXNzIjoiaHR0cHM6XC9cL2FtLXdzbzItbm9ucHJvZC5hcHBzLm50LW5vbi1vY3AubmVvdGVrLnNhOjQ0M1wvb2F1dGgyXC90b2tlbiIsInRpZXJJbmZvIjp7IlVubGltaXRlZCI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0IjpudWxsfX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwicGVybWl0dGVkUmVmZXJlciI6IiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6InFhZW1hLW9wZW4tYmFua2luZyIsImNvbnRleHQiOiJcL3FhZW1hXC9vYlwvdjEiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiJ2MSIsInN1YnNjcmlwdGlvblRpZXIiOiJVbmxpbWl0ZWQifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU0RLcyIsImNvbnRleHQiOiJcL3Nka1wvMS4wIiwicHVibGlzaGVyIjoiYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9XSwidG9rZW5fdHlwZSI6ImFwaUtleSIsInBlcm1pdHRlZElQIjoiIiwiaWF0IjoxNzI0NzkzODc1LCJqdGkiOiI3MGVkZDIxYy01Yjc4LTQ1YjgtYjkyMC0xNDRmZTQ3MTllZmMifQ==.ZXOFArTNfkeVa9Nh-SCU04RtAmEUYWcDKlpJXpEsM1KRl_2On86rtwkjKiL6UhRcc6lZGk8L9BdcXJToJTx-mXnUdlqWJzEuWUz8k0xnknQCq72BWZhfhMhHf43SFnGNIUbi8JIAYNcUMHOQY8lNbYqcefjfphJ_IlfbRAqjzUTE4JcIXYZjZXLSale9AOHhG0oOCb_TcB1600xm_UGDcvOPurrTrNtC9wuB3oT-wYfZyECywE0szKPvfB0VJYqb4laamestTLM73AC73Sxuy-ZqWIU21FjWEEq0YsEM3SgPepbgfg3xC9fql79UwEqaPoiWR_3wf8NjJWsBACjjxw=='
    }
  }
  return (
    <SafeAreaView style={[styles.container, { marginTop: 30 }]}>
      <StatusBar barStyle={'dark-content'} />
      <NeoTek theme={NeotekTheme} screen='Home8'/>
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
