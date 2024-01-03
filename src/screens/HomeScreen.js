import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import _ from 'lodash';

import HeaderComponent from "../components/HeaderComponent";
import HomePageTestTab from "../components/HomePageTestTab";
import FooterComponent from "../components/FooterComponent";

function HomeScreen({}) {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        const fetchQuizData = async () => {
            try{
                const response = await fetch('https://tgryl.pl/quiz/tests');
                const data = await response.json();

                const shuffledData = _.shuffle(data);

                setQuizData(shuffledData);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

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