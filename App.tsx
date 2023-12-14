import React, { useEffect, useState } from "react";
import { Button, View, Text, Platform } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from "react-native-splash-screen";

import CustomDrawer from './src/components/CustomDrawer';
import RegulationsScreen from "./src/screens/RegulationsScreen";
import HomeScreen from './src/screens/HomeScreen';
import ResultScreen from "./src/screens/ResultScreen";
import TestScreen from "./src/screens/TestScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ 
        headerShown: false, 
        drawerActiveBackgroundColor: 'rgb(188, 108, 37)',
        drawerActiveTintColor: 'rgb(254, 250, 224)',
        drawerInactiveBackgroundColor: 'rgb(96, 108, 56)',
        drawerInactiveTintColor: 'rgb(254, 250, 224)',
        drawerLabelStyle: {
          marginLeft: 20,
          fontSize: 20,
        },
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Results" component={ResultScreen} />
        <Drawer.Screen name="Moda na sukces" component={TestScreen} initialParams={{ customData: '62032610069ef9b2616c761e' }} />
        <Drawer.Screen name="Tranzystor bipolarny i polowy" component={TestScreen} initialParams={{ customData: '62032610069ef9b2616c761c' }} />
        <Drawer.Screen name="Wodzowie i dowódcy starożytnego Rzymu" component={TestScreen} initialParams={{ customData: '62032610069ef9b2616c761d' }} />
        <Drawer.Screen name="Zagadki matematyczne" component={TestScreen} initialParams={{ customData: '62032610069ef9b2616c761b' }} />
      </Drawer.Navigator>
  );
}

function App(): JSX.Element {
  const [initialScreen, setInitialScreen] = useState('Regulations');
 
  useEffect(() => {
     checkRegulations();
  }, []);
 
  const checkRegulations = async () => {
     try {
       const value = await AsyncStorage.getItem('regulaminShown');
       console.log('Value from AsyncStorage:', value);
   
       if (value !== null && value === 'true') {
         setInitialScreen('Root');
       } else {
         setInitialScreen('Regulations');
       }
       SplashScreen.hide();
     } catch (e) {
       console.error('Error checking regulations:', e);
     }
  };
 
  return (
     <NavigationContainer>
       <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialScreen}>
         <Stack.Screen name="Root" component={Root} />
         <Stack.Screen name="Regulations" component={RegulationsScreen} />
         <Stack.Screen name="Results" component={ResultScreen} />
         <Drawer.Screen name="Moda na sukces" component={TestScreen} initialParams={{ customData: '62032610069ef9b2616c761e' }} />
        <Drawer.Screen name="Tranzystor bipolarny i polowy" component={TestScreen} initialParams={{ customData: '62032610069ef9b2616c761c' }} />
        <Drawer.Screen name="Wodzowie i dowódcy starożytnego Rzymu" component={TestScreen} initialParams={{ customData: '62032610069ef9b2616c761d' }} />
        <Drawer.Screen name="Zagadki matematyczne" component={TestScreen} initialParams={{ customData: '62032610069ef9b2616c761b' }} />
       </Stack.Navigator>
     </NavigationContainer>
  );
 }
 
 export default App;