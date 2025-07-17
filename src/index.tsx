import NeotekOpenbanking from './NativeNeotekOpenbanking';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import type { NeotekTheme } from './common/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Home/HomeScreen';
import { View } from 'react-native';
import { ThemeProvider } from './common/ThemeContext';
import NeotekHeader from './components/NeotekHeader';
import { useEffect, useState } from "react";
import DetailsScreen from './Screens/Details/DetailsScreen';
import RedirectionScreen from './Screens/Redirection/RedirectionScreen';
import SuccessScreen from './Screens/SuccessOrFail/SuccessScreen';
import FailScreen from './Screens/SuccessOrFail/FailScreen';
import './i18n';
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import ConnectedAccountsScreen from './Screens/ConnectedAccounts/ConnectedAccountsScreen';
import RevokeHeader from './components/RevokeHeader';
import ManageAccountScreen from './Screens/ManageAccount/ManageAccountScreen';
import DisconnectedSuccessScreen from './Screens/SuccessOrFail/DisconnectedSuccessScreen';



export function multiply(a: number, b: number): number {
  return NeotekOpenbanking.multiply(a, b);
}

type Props = {
  theme: NeotekTheme,
  screen:string
}


export const NeoTek = ({ theme,screen }: Props) => {
  const Stack = createNativeStackNavigator();
  
  const [step, setStep] = useState(1)
  const [isRevoke, setIsRevoke] = useState(false)
  const [revokeHeaderTitle, setRevokeHeaderTitle] = useState("")
  const [headerTitle, setHeaderTitle] = useState("")

  const MyNativeModule = NativeModules.NeotekOpenbanking;
  let eventEmitter = null;
  if (Platform.OS === 'ios' && MyNativeModule) {
    eventEmitter = new NativeEventEmitter(MyNativeModule);
  } else {
    eventEmitter = new NativeEventEmitter()
  }
  eventEmitter.addListener('step', data => {
    console.log("step", data)
    setStep(data)
  })

  eventEmitter.addListener('revoke', data => {
    setIsRevoke(data)
  })

  eventEmitter.addListener('revokeTitle', data => {
    setRevokeHeaderTitle(data)
  })

  eventEmitter.addListener('title', data => {
    setHeaderTitle(data)
  })
  
  
  
  return (
    <View style={{ backgroundColor: theme.themeMain.white, width: '100%', height: '100%' }}>
      <ThemeProvider theme={theme}>
        <View style={{ backgroundColor: theme.themeMain.white, width: '100%', height: '100%' }}>
          
          <NavigationContainer>
          {!isRevoke && <NeotekHeader step={step} title={headerTitle} showBack={step == 1} />}
          {isRevoke && <RevokeHeader title={revokeHeaderTitle} />}
          <View style={{ backgroundColor: theme.themeMain.white, width: '100%', height: 16 }} />
            <Stack.Navigator initialRouteName={screen == "Home" ? "Home" : "ConnectedAccounts"}>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Redirection" component={RedirectionScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Fail" component={FailScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ConnectedAccounts" component={ConnectedAccountsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ManageAccount" component={ManageAccountScreen} options={{ headerShown: false }} />
              <Stack.Screen name="DisconnectedSuccess" component={DisconnectedSuccessScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ThemeProvider>
    </View>

  )


}
