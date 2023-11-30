import React from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';

import HeaderComponent from "../components/HeaderComponent";

function TestScreen({}) {
    const route = useRoute();
    const receivedText = route.params?.text || 'Test';

    return (
        <View style={(styles.main)}>
            <HeaderComponent screenName={receivedText} />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'rgb(40, 54, 24)',
    },
});

export default TestScreen;