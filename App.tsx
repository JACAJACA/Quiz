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
import RandomTestScreen from "./src/screens/RandomTestScreen";

import { shuffle } from 'lodash';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const fetchServerData = async () => {
  try {
    const response = await fetch('https://tgryl.pl/quiz/tests');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

interface RootProps {
  serverData: { id: string; name: string }[]; // Adjust the type based on your actual server response structure
}

function Root({ serverData }: RootProps): JSX.Element {
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
          fontFamily: 'RobotoSlab-Regular',
        },
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Results" component={ResultScreen} />
        <Drawer.Screen name="Random quiz" component={RandomTestScreen} />
        {serverData.map((item) => (
        <Drawer.Screen
          key={item.id}
          name={item.name}
          component={TestScreen}
          initialParams={{ customData: item.id }}
        />
      ))}
      </Drawer.Navigator>
  );
}

function App(): JSX.Element {
  const [initialScreen, setInitialScreen] = useState('Regulations');
  const [serverData, setServerData] = useState<{ id: string; name: string }[]>([]);
 
  useEffect(() => {
    checkRegulations();
    fetchServerData().then((data) => {
      const shuffledData: { id: string; name: string }[] = shuffle(data);
      setServerData(shuffledData);
    });
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
       <Stack.Screen name="Root">
          {(props) => <Root {...props} serverData={serverData} />}
        </Stack.Screen>
         <Stack.Screen name="Regulations" component={RegulationsScreen} />
         <Stack.Screen name="Results" component={ResultScreen} />
         <Drawer.Screen name="Random quiz" component={TestScreen} />
         {serverData.map((item) => (
        <Drawer.Screen
          key={item.id}
          name={item.name}
          component={TestScreen}
          initialParams={{ customData: item.id }}
        />
      ))}
       </Stack.Navigator>
     </NavigationContainer>
  );
 }
 
 export default App;