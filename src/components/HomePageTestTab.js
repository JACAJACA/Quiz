import React from "react";
import { Text, View, Linking, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomePageTestTab = ({ quizData }) => {
    const navigation = useNavigation();

    const goToTest = () => {
        navigation.navigate(quizData.name);
    };

    return (
        <TouchableOpacity onPress={goToTest} style={[styles.container]}>
            <Text style={[styles.title]}>{quizData.name}</Text>
            <Text style={[styles.tag]} onPress={() => Linking.openURL('http://x.com')}>
                {quizData.tags.map(tag => `#${tag}   `)}
            </Text>
            <Text style={[styles.description]}>{quizData.description}</Text>
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
        fontFamily: 'RobotoSlab-Regular',
        color: 'rgb(254, 250, 224)',
    },

    tag: {
        marginRight: 150,
        marginLeft: 5,
        paddingLeft: 10,
        fontFamily: 'RobotoSlab-Regular',
        color: 'rgb(221, 161, 94)',
    },

    description: {
        marginLeft: 5,
        padding: 10,
        fontSize: 15,
        fontFamily: 'RobotoSlab-Regular',
        color: 'rgb(254, 250, 224)',
    },
});

export default HomePageTestTab;