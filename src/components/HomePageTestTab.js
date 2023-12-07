import React from "react";
import { Text, View, Linking, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomePageTestTab = ({ title, nav }) => {
    let titleText = title; 
    const navRoute = nav;
    const navigation = useNavigation();

    const goToTest = () => {
        navigation.navigate(nav, { text: titleText });
    };

    return (
        <TouchableOpacity onPress={goToTest} style={[styles.container]}>
            <Text style={[styles.title]}>{titleText}</Text>
            <Text style={[styles.tag]}
                    onPress={() => Linking.openURL('http://x.com')}>
                #Tag1   #Tag2
            </Text>
            <Text style={[styles.description]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: 'rgb(96, 108, 56)',
        borderWidth: 4,
        borderRadius: 4,
        borderColor: 'rgb(221, 161, 94)',
    },

    title: {
        marginLeft: 5,
        padding: 10,
        fontSize: 20,
        color: 'rgb(254, 250, 224)',
    },

    tag: {
        width: 130,
        marginLeft: 5,
        paddingLeft: 10,
        color: 'rgb(221, 161, 94)',
    },

    description: {
        marginLeft: 5,
        padding: 10,
        fontSize: 15,
        color: 'rgb(254, 250, 224)',
    },
});

export default HomePageTestTab;