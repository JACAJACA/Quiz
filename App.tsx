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
import Animals from "./src/screens/Animals";
import Continents from "./src/screens/Continents";
import Oceans from "./src/screens/Oceans";


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
        <Drawer.Screen name="Animals" component={Animals} />
        <Drawer.Screen name="Continents" component={Continents} />
        <Drawer.Screen name="Oceans" component={Oceans} />
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
         <Stack.Screen name="Test" component={TestScreen} />
         <Stack.Screen name="Animals" component={Animals} />
         <Stack.Screen name="Continents" component={Continents} />
         <Stack.Screen name="Oceans" component={Oceans} />
       </Stack.Navigator>
     </NavigationContainer>
  );
 }
 
 export default App;