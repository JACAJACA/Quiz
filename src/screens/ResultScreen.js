import React from "react";
import { View, StyleSheet } from "react-native";

import HeaderComponent from "../components/HeaderComponent";

function ResultScreen({}) {
    return (
        <View style={(styles.main)}>
            <HeaderComponent screenName="Result" />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'rgb(40, 54, 24)',
    },
});

export default ResultScreen;