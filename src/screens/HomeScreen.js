import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import _ from 'lodash';

import HeaderComponent from "../components/HeaderComponent";
import HomePageTestTab from "../components/HomePageTestTab";
import FooterComponent from "../components/FooterComponent";

import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QUIZ_DATA_STORAGE_KEY = 'quizData';

function HomeScreen({}) {
    const [quizData, setQuizData] = useState([]);

    const fetchQuizData = async () => {
        try {
          const netInfoState = await NetInfo.fetch();
    
          if (netInfoState.isConnected) {
            const response = await fetch('https://tgryl.pl/quiz/tests');
            const data = await response.json();
    
            const shuffledData = _.shuffle(data);
    
            await AsyncStorage.setItem(QUIZ_DATA_STORAGE_KEY, JSON.stringify(shuffledData));
    
            setQuizData(shuffledData);
          } else {
            console.log('No internet connection, attempting to use cached quiz data');
    
            const cachedData = await AsyncStorage.getItem(QUIZ_DATA_STORAGE_KEY);
    
            if (cachedData) {
              setQuizData(JSON.parse(cachedData));
            } else {
              console.error('No internet connection and no cached quiz data available');
            }
          }
        } catch (error) {
          console.error('Error fetching quiz data:', error);
    
          const cachedData = await AsyncStorage.getItem(QUIZ_DATA_STORAGE_KEY);
    
          if (cachedData) {
            setQuizData(JSON.parse(cachedData));
          } else {
            console.error('Error and no cached quiz data available');
          }
        }
      };
    
      useEffect(() => {
        fetchQuizData();
      }, []);

    return (
        <View style={(styles.main)}>
            <HeaderComponent screenName="Home Page" />
            <ScrollView>
                {quizData.map((quizItem) => (
                    <HomePageTestTab key={quizItem.id} quizData={quizItem} />
                ))}
            </ScrollView>
            <View style={[styles.footer]}>
                <FooterComponent />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'rgb(40, 54, 24)',
    },

    footer: {
        justifyContent: 'flex-end',
    },
});

export default HomeScreen;