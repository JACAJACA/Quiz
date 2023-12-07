import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import FooterButton from './FooterButton';

const FooterComponent = () => {
    return (
        <View style={[styles.container]}>
            <Text style={[styles.text]}>Get to know your ranking result</Text>
            <View style={[styles.button]}>
                <FooterButton />
            </View>
        </View>
    );
};

const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'rgb(188, 108, 37)',
        alignItems: 'center',
    },

    text: {
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 20,
        color: 'rgb(254, 250, 224)',
    },

    button: {
        marginBottom: 10,
    }
});

export default FooterComponent;