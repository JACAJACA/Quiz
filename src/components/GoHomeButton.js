import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GoHomeButton = () => {
    const navigation = useNavigation();

    const goToHomeScreen = () => {
        navigation.navigate('Home');
    };

    return (
        <TouchableOpacity onPress={goToHomeScreen} style={[styles.container]}>
            <Text style={[styles.text]}>Finish!</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(188, 108, 37)',
        width: 150,
        borderWidth: 4,
        borderRadius: 4,
        borderColor: 'rgb(188, 108, 37)',
    },

    text: {
        textAlign: 'center',
        color: 'rgb(254, 250, 224)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 20,
        fontFamily: 'RobotoSlab-Bold',
    },
});

export default GoHomeButton;