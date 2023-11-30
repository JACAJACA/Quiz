import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import HeaderComponent from "../components/HeaderComponent";
import HomePageTestTab from "../components/HomePageTestTab";
import FooterComponent from "../components/FooterComponent";
import FooterButton from "../components/FooterButton";

function HomeScreen({}) {
    return (
        <View style={(styles.main)}>
            <HeaderComponent screenName="Home Page" />
            <ScrollView>
                <HomePageTestTab Title="Title test #1"/>
                <HomePageTestTab Title="Title test #2"/>
                <HomePageTestTab Title="Title test #3"/>
                <HomePageTestTab Title="Title test #4"/>
                <HomePageTestTab Title="Title test #5"/>
                <HomePageTestTab Title="Title test #6"/>
                <HomePageTestTab Title="Title test #7"/>
                <HomePageTestTab Title="Title test #8"/>
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