import NeotekOpenbanking from './NativeNeotekOpenbanking';
import { NavigationContainer } from '@react-navigation/native';
import type { NeotekTheme } from './common/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Home/HomeScreen';
import { View } from 'react-native';
import { ThemeProvider } from './common/ThemeContext';
import NeotekHeader from './components/NeotekHeader';
import { useState } from "react";
import DetailsScreen from './Screens/Details/DetailsScreen';
import RedirectionScreen from './Screens/Redirection/RedirectionScreen';
import SuccessScreen from './Screens/SuccessOrFail/SuccessScreen';
import FailScreen from './Screens/SuccessOrFail/FailScreen';
import './i18n';
import {
  NativeEventEmitter,
} from 'react-native'
export function multiply(a: number, b: number): number {
  return NeotekOpenbanking.multiply(a, b);
}

type Props = {
  theme: NeotekTheme
}


export const NeoTek = ({ theme }: Props) => {
  const Stack = createNativeStackNavigator();
  const [step,setStep] = useState(1)
  
  const eventEmitter = new NativeEventEmitter();
  eventEmitter.addListener('step', (data) => {
    setStep(data)
  })

  return (
    <View style={{ backgroundColor: theme.themeMain.white, width: '100%', height: '100%' }}>
      <ThemeProvider theme={theme}>
        <View style={{ backgroundColor: theme.themeMain.white, width: '100%', height: '100%' }}>
          <NeotekHeader step={step}/>
          <View style={{ backgroundColor: theme.themeMain.white, width: '100%', height: 16 }}/>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Redirection" component={RedirectionScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Fail" component={FailScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ThemeProvider>
    </View>

  )


}
