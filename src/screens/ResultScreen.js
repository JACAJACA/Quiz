import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';

import HeaderComponent from '../components/HeaderComponent';

const ResultScreen = () => {
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const resultsData = [  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://tgryl.pl/quiz/results?last=20', {
      method: 'GET',
      headers: {
        'Contenent-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setRefreshing(false));
  };

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      fetchData();
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.row]}>
      <Text style={styles.cellNick}>{item.nick}</Text>
      <Text style={styles.cell}>{item.score}</Text>
      <Text style={styles.cell}>{item.total}</Text>
      <Text style={styles.cellType}>{item.type}</Text>
    </View>
  );

  return (
    <View style={[styles.main]}>
      <HeaderComponent screenName="Result"/>
      <View style={[styles.listContainer]}>
        <View style={[styles.row]}>
            <Text style={styles.headerCellNick}>Nick</Text>
            <Text style={styles.headerCell}>Score</Text>
            <Text style={styles.headerCell}>Total</Text>
            <Text style={styles.headerCellType}>Type</Text>
        </View>  
        <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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

    headerCellNick: {
      flex: 2,
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

  headerCellType: {
    flex: 3,
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

    cellNick: {
      flex: 2,
      fontSize: 15,
      paddingVertical: 15,
      paddingHorizontal: 5,
      textAlign: 'center',
      borderRightWidth: 1,
      borderBottomWidth: 1,
      color: 'rgb(254, 250, 224)',
      borderColor: 'rgb(221, 161, 94)',
  },

    cellType: {
      flex: 3,
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
      marginBottom: 150,
      marginHorizontal: 5,
      backgroundColor: 'rgb(96, 108, 56)',
      borderWidth: 4,
      borderRadius: 4,
      borderColor: 'rgb(221, 161, 94)',
  },
});

export default ResultScreen;