import { StyleSheet, StatusBar, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";

// SplashScreen
import SplashScreen from './src/Screens/SplashScreen/Index'

// No Internet Page
import NoInternet from './src/Screens/NoInternet/Index'

// Auth
import Login from './src/Screens/Auth/Login';
import Register from './src/Screens/Auth/Register';
import OtpVerify from './src/Screens/Auth/OtpVerify';

// Pages
import Dashboard from './src/Screens/Dashboard/Index'
import Temple_about from './src/Screens/Temple_about/Index'
import SocialMedia from './src/Screens/SocialMedia/Index'
import BankDetails from './src/Screens/BankDetails/Index'
import Management from './src/Screens/Management/Index'
import Temple_festival from './src/Screens/Temple_festival/Index'
import Temple_news from './src/Screens/Temple_news/Index'
import Mandap_booking from './src/Screens/Mandap_booking/Index'
import Pooja_booking from './src/Screens/Pooja_booking/Index'
import Prashad_time from './src/Screens/Prashad_time/Index'
import Yearly_rituals from './src/Screens/Yearly_rituals/Index'
import Daily_rituals from './src/Screens/Daily_rituals/Index'
import Darshan_time from './src/Screens/Darshan_time/Index'
import Banner from './src/Screens/Banner/Index'
import Donation from './src/Screens/Donation/Index'
import Temple_inventory from './src/Screens/Temple_inventory/Index'
import Temple_insideTemples from './src/Screens/Temple_insideTemples/Index'
import Temple_vendors from './src/Screens/Temple_vendors/Index'
import Temple_devotees from './src/Screens/Temple_devotees/Index'
import Temple_Finance from './src/Screens/Temple_Finance/Index'

const Stack = createNativeStackNavigator()

export const base_url = "http://temple.mandirparikrama.com/"

const App = () => {

  const [showSplash, setShowSplash] = useState(true);
  const [access_token, setAccess_token] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setIsConnected(state.isConnected ?? false);
    });
    return () => {
      unsubscribe();
      // setTimeout(unsubscribe, 5000);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 5000)
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#c9170a" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />) : null}
        {!isConnected ? (
          <Stack.Screen name="NoInternet" component={NoInternet} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="OtpVerify" component={OtpVerify} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Temple_about" component={Temple_about} />
            <Stack.Screen name="SocialMedia" component={SocialMedia} />
            <Stack.Screen name="BankDetails" component={BankDetails} />
            <Stack.Screen name="Management" component={Management} />
            <Stack.Screen name="Temple_festival" component={Temple_festival} />
            <Stack.Screen name="Temple_news" component={Temple_news} />
            <Stack.Screen name="Mandap_booking" component={Mandap_booking} />
            <Stack.Screen name="Pooja_booking" component={Pooja_booking} />
            <Stack.Screen name="Prashad_time" component={Prashad_time} />
            <Stack.Screen name="Yearly_rituals" component={Yearly_rituals} />
            <Stack.Screen name="Daily_rituals" component={Daily_rituals} />
            <Stack.Screen name="Darshan_time" component={Darshan_time} />
            <Stack.Screen name="Banner" component={Banner} />
            <Stack.Screen name="Donation" component={Donation} />
            <Stack.Screen name="Temple_inventory" component={Temple_inventory} />
            <Stack.Screen name="Temple_insideTemples" component={Temple_insideTemples} />
            <Stack.Screen name="Temple_vendors" component={Temple_vendors} />
            <Stack.Screen name="Temple_devotees" component={Temple_devotees} />
            <Stack.Screen name="Temple_Finance" component={Temple_Finance} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App