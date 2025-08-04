import { Text, View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { multiply, NeoTek } from 'neotek-openbanking';
import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import { Images } from './assets';
const result = multiply(3, 7);




// Create context with defaults

export default function App() {
 
  // const { i18n } = useTranslation(null, { useSuspense: false });
  // i18n.changeLanguage('en');
  // I18nManager.forceRTL(false)

  const [token, setToken] = useState('')
  const [finish, setFinish] = useState(false);

  const getToken = async () => {
    let client_id = "ce5ab5564ada556285fe918cbf081b0a"
    let client_secret = "526fc65b56eb551d2c4c18bc27b1f325"
    let apiKey = "eyJ4NXQiOiJPREUzWTJaaE1UQmpNRE00WlRCbU1qQXlZemxpWVRJMllqUmhZVFpsT0dJeVptVXhOV0UzWVE9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6ImFkbWluIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IjIwUGVyTWluIiwibmFtZSI6IlNESyIsImlkIjoxMTUsInV1aWQiOiJlNjgxYzZjNS1kNjBiLTRiMGItYWY2MC1jMDY2YzQwYjRhYzgifSwiaXNzIjoiaHR0cHM6XC9cL2FtLXdzbzItbm9ucHJvZC5hcHBzLm50LW5vbi1vY3AubmVvdGVrLnNhOjQ0M1wvb2F1dGgyXC90b2tlbiIsInRpZXJJbmZvIjp7IlVubGltaXRlZCI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0IjpudWxsfX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwicGVybWl0dGVkUmVmZXJlciI6IiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6InFhZW1hLW9wZW4tYmFua2luZyIsImNvbnRleHQiOiJcL3FhZW1hXC9vYlwvdjEiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiJ2MSIsInN1YnNjcmlwdGlvblRpZXIiOiJVbmxpbWl0ZWQifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU0RLcyIsImNvbnRleHQiOiJcL3Nka1wvMS4wIiwicHVibGlzaGVyIjoiYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9XSwidG9rZW5fdHlwZSI6ImFwaUtleSIsInBlcm1pdHRlZElQIjoiIiwiaWF0IjoxNzI0NzkzODc1LCJqdGkiOiI3MGVkZDIxYy01Yjc4LTQ1YjgtYjkyMC0xNDRmZTQ3MTllZmMifQ==.ZXOFArTNfkeVa9Nh-SCU04RtAmEUYWcDKlpJXpEsM1KRl_2On86rtwkjKiL6UhRcc6lZGk8L9BdcXJToJTx-mXnUdlqWJzEuWUz8k0xnknQCq72BWZhfhMhHf43SFnGNIUbi8JIAYNcUMHOQY8lNbYqcefjfphJ_IlfbRAqjzUTE4JcIXYZjZXLSale9AOHhG0oOCb_TcB1600xm_UGDcvOPurrTrNtC9wuB3oT-wYfZyECywE0szKPvfB0VJYqb4laamestTLM73AC73Sxuy-ZqWIU21FjWEEq0YsEM3SgPepbgfg3xC9fql79UwEqaPoiWR_3wf8NjJWsBACjjxw=="
    let uuidKey = "123456"
    let body = {
      'grant_type': 'client_credentials',
      'client_id': client_id,
      'client_secret': client_secret,
      'scope': 'ob_connect iban_verification income_verification single_api e_statements'
    }
    let data = {
      method: 'POST',
      body: new URLSearchParams(body).toString(),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'scope': 'ob_connect iban_verification income_verification single_api e_statements',
        'uuidKey': uuidKey,
        'apiKey': apiKey
      }
    }
    const response = await fetch('https://www.qaema.com/sdk/auth/token', data).catch(error => console.error('Error fetching data:', error));
    const json = await response.json()
    setToken(json.token_type + ' ' + json.access_token) 
  }

  useEffect(() => {
    console.log('====================================');
    console.log(StatusBar.currentHeight);
    console.log('====================================');
    getToken()
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
    }, credentials: {
      'scope': 'ob_connect iban_verification income_verification single_api e_statements',
      'uuidKey': '123456',
      'apiKey': 'eyJ4NXQiOiJPREUzWTJaaE1UQmpNRE00WlRCbU1qQXlZemxpWVRJMllqUmhZVFpsT0dJeVptVXhOV0UzWVE9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6ImFkbWluIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IjIwUGVyTWluIiwibmFtZSI6IlNESyIsImlkIjoxMTUsInV1aWQiOiJlNjgxYzZjNS1kNjBiLTRiMGItYWY2MC1jMDY2YzQwYjRhYzgifSwiaXNzIjoiaHR0cHM6XC9cL2FtLXdzbzItbm9ucHJvZC5hcHBzLm50LW5vbi1vY3AubmVvdGVrLnNhOjQ0M1wvb2F1dGgyXC90b2tlbiIsInRpZXJJbmZvIjp7IlVubGltaXRlZCI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0IjpudWxsfX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwicGVybWl0dGVkUmVmZXJlciI6IiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6InFhZW1hLW9wZW4tYmFua2luZyIsImNvbnRleHQiOiJcL3FhZW1hXC9vYlwvdjEiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiJ2MSIsInN1YnNjcmlwdGlvblRpZXIiOiJVbmxpbWl0ZWQifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU0RLcyIsImNvbnRleHQiOiJcL3Nka1wvMS4wIiwicHVibGlzaGVyIjoiYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9XSwidG9rZW5fdHlwZSI6ImFwaUtleSIsInBlcm1pdHRlZElQIjoiIiwiaWF0IjoxNzI0NzkzODc1LCJqdGkiOiI3MGVkZDIxYy01Yjc4LTQ1YjgtYjkyMC0xNDRmZTQ3MTllZmMifQ==.ZXOFArTNfkeVa9Nh-SCU04RtAmEUYWcDKlpJXpEsM1KRl_2On86rtwkjKiL6UhRcc6lZGk8L9BdcXJToJTx-mXnUdlqWJzEuWUz8k0xnknQCq72BWZhfhMhHf43SFnGNIUbi8JIAYNcUMHOQY8lNbYqcefjfphJ_IlfbRAqjzUTE4JcIXYZjZXLSale9AOHhG0oOCb_TcB1600xm_UGDcvOPurrTrNtC9wuB3oT-wYfZyECywE0szKPvfB0VJYqb4laamestTLM73AC73Sxuy-ZqWIU21FjWEEq0YsEM3SgPepbgfg3xC9fql79UwEqaPoiWR_3wf8NjJWsBACjjxw==',
      'token': token,
      'baseUrl':"https://www.qaema.com",
      'appName':'NeoTek Open Banking',
      'logo':'data:image/png;base64,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',
    }
  }
  console.log("credentials",NeotekTheme.credentials)
  return (
    <SafeAreaView style={[styles.container, { marginTop: 30 }]}>
      <StatusBar barStyle={'dark-content'} />
      {!finish && token.length > 0 && <NeoTek theme={NeotekTheme} screen='Home' finish={() => { console.log("finish"); setFinish(true) }}/>}
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
