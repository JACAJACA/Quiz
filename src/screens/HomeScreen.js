import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import HeaderComponent from "../components/HeaderComponent";
import HomePageTestTab from "../components/HomePageTestTab";
import FooterComponent from "../components/FooterComponent";

function HomeScreen({}) {
    return (
        <View style={(styles.main)}>
            <HeaderComponent screenName="Home Page" />
            <ScrollView>
                <HomePageTestTab title="Animals" nav="Animals"/>
                <HomePageTestTab title="Continents" nav="Continents"/>
                <HomePageTestTab title="Oceans" nav="Oceans"/>
                <HomePageTestTab title="Title test #4"/>
                <HomePageTestTab title="Title test #5"/>
                <HomePageTestTab title="Title test #6"/>
                <HomePageTestTab title="Title test #7"/>
                <HomePageTestTab title="Title test #8"/>
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