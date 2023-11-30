import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DrawerButton from "./DrawerButton";

const HeaderComponent = ({ screenName }) => {
    let headerText = screenName

    return (
        <View>
            <View style={[styles.container]}>
                <View style={[styles.button]}>
                    <DrawerButton />
                </View>
                <Text style={[styles.text]}>{headerText}</Text>
            </View>
            
            <View style={[styles.divider]}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'rgb(96, 108, 56)',
    },

    button: {
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 20,
        marginBottom: 20,
        marginTop: 20,
    }, 

    text: {
        textAlign: 'center',
        marginLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgb(254, 250, 224)',
    },

    divider: {
        height: 5,
        backgroundColor: 'rgb(221, 161, 94)',
    },
});

export default HeaderComponent;