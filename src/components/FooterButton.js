import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FooterButton = () => {
    const navigation = useNavigation();

    const goToResultScreen = () => {
        navigation.navigate('Results');
    };

    return (
        <TouchableOpacity onPress={goToResultScreen} style={[styles.container]}>
            <Text style={[styles.text]}>Check!</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(96, 108, 56)',
        width: 130,
        borderWidth: 4,
        borderRadius: 4,
        borderColor: 'rgb(40, 54, 24)',
    },

    text: {
        textAlign: 'center',
        color: 'rgb(254, 250, 224)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontWeight: "bold",
    },
});

export default FooterButton;
