import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';

import HeaderComponent from '../components/HeaderComponent';

const ResultScreen = () => {
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Przykładowa tablica obiektów
  const resultsData = [
    { 
        key: 1,
        nick: 'Marek',
        score: 18,
        total: 20,
        type: "historia",
        date: "2022-11-22" 
    },
    {
        key: 2,
        nick: "Anna",
        score: 15,
        total: 20,
        type: "geografia",
        date: "2022-12-05"
    },
    {
        key: 3,
        nick: "Piotr",
        score: 22,
        total: 25,
        type: "fizyka",
        date: "2022-10-15"
    },
  ];

  useEffect(() => {
    // Symulacja pobierania danych (np. z serwera) - Możesz zastąpić prawdziwym pobieraniem danych
    fetchData();
  }, []);

  const fetchData = () => {
    // Symulacja pobierania danych
    setResults(resultsData);
  };

  const handleRefresh = () => {
    setRefreshing(true);

    // Symulacja odświeżania danych (np. ponowne pobieranie danych z serwera)
    setTimeout(() => {
      fetchData();
      setRefreshing(false);
    }, 1000); // Przykładowy czas oczekiwania - dostosuj go do rzeczywistych warunków
  };

  const renderItem = ({ item }) => (
    <View style={[styles.row]}>
      <Text style={styles.cell}>{item.nick}</Text>
      <Text style={styles.cell}>{item.score}</Text>
      <Text style={styles.cell}>{item.total}</Text>
      <Text style={styles.cell}>{item.type}</Text>
    </View>
  );

  return (
    <View style={[styles.main]}>
      <HeaderComponent screenName="Result"/>
      <View style={[styles.listContainer]}>
        <View style={[styles.row]}>
            <Text style={styles.headerCell}>Nick</Text>
            <Text style={styles.headerCell}>Score</Text>
            <Text style={styles.headerCell}>Total</Text>
            <Text style={styles.headerCell}>Type</Text>
        </View>  
        <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'rgb(40, 54, 24)',
    },

    row: {
        textAlign: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },

    headerCell: {
        flex: 1,
        fontSize: 15,
        paddingVertical: 15,
        paddingHorizontal: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        color: 'rgb(254, 250, 224)',
        borderColor: 'rgb(221, 161, 94)',
        backgroundColor: 'rgb(188, 108, 37)',
    },

    cell: {
        flex: 1,
        fontSize: 15,
        paddingVertical: 15,
        paddingHorizontal: 5,
        textAlign: 'center',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        color: 'rgb(254, 250, 224)',
        borderColor: 'rgb(221, 161, 94)',
    },

    listContainer: {
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 5,
        backgroundColor: 'rgb(96, 108, 56)',
        borderWidth: 4,
        borderRadius: 4,
        borderColor: 'rgb(221, 161, 94)',
    },
});

export default ResultScreen;