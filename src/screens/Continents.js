import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderComponent from '../components/HeaderComponent';
import GoHomeButton from '../components/GoHomeButton';

const Continents = () => {
  const tasks = [
    {
        "question": "Which continent is known as the 'Land Down Under'?",
        "answers": [
            {
                "content": "AFRICA",
                "isCorrect": false
            },
            {
                "content": "EUROPE",
                "isCorrect": false
            },
            {
                "content": "AUSTRALIA",
                "isCorrect": true
            },
            {
                "content": "SOUTH AMERICA",
                "isCorrect": false
            }
        ],
        "duration": 30
    },
    {
        "question": "Which continent is the most populous and is home to countries like China and India?",
        "answers": [
            {
                "content": "NORTH AMERICA",
                "isCorrect": false
            },
            {
                "content": "ASIA",
                "isCorrect": true
            },
            {
                "content": "ANTARCTICA",
                "isCorrect": false
            },
            {
                "content": "OCEANIA",
                "isCorrect": false
            }
        ],
        "duration": 30
    },
    {
        "question": "Which continent is characterized by its diverse wildlife, including the Amazon Rainforest?",
        "answers": [
            {
                "content": "EUROPE",
                "isCorrect": false
            },
            {
                "content": "AFRICA",
                "isCorrect": false
            },
            {
                "content": "SOUTH AMERICA",
                "isCorrect": true
            },
            {
                "content": "NORTH AMERICA",
                "isCorrect": false
            }
        ],
        "duration": 30
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const navigation = useNavigation();

  const handleAnswer = (isCorrect) => {
    setUserAnswers([...userAnswers, { question: currentQuestion, isCorrect }]);
    if (isCorrect) {
      setScore(score + 1);
    }

    // Przejdź do następnego pytania
    if (currentQuestion < tasks.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
  };

  const renderResults = () => {
    return (
      <View style={[styles.resultsContainer]}>
        <Text style={[styles.resultsText]}>Your score: {score} / {tasks.length}</Text>
        <GoHomeButton />
      </View>
    );
  };

  useEffect(() => {
    if (currentQuestion === tasks.length) {
      renderResults();
    }
  }, [currentQuestion]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setCurrentQuestion(0);
      setUserAnswers([]);
      setScore(0);
      setShowResults(false);
    });
  
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={[styles.container]}>
      <HeaderComponent screenName="Continents" />
      <View style={[styles.questionContainer]}>
        {showResults ? (
          renderResults()
        ) : (
          <>
            <Text style={[styles.questionText]}>
              {tasks[currentQuestion].question}
            </Text>
            <View style={[styles.divider]}></View>
            {tasks[currentQuestion].answers.map((answer, index) => (
              <TouchableOpacity
                style={[styles.answerButton]}
                key={index}
                onPress={() => handleAnswer(answer.isCorrect)}>
                <Text style={[styles.answerButtonText]}>
                  {answer.content}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'rgb(40, 54, 24)',
    },

    questionContainer: {
        paddingBottom: 10,
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: 'rgb(96, 108, 56)',
        borderWidth: 4,
        borderRadius: 4,
        borderColor: 'rgb(221, 161, 94)',
    },

    questionText: {
        padding: 15,
        fontSize: 25,
        color: 'rgb(254, 250, 224)',
    },

    divider: {
        height: 5,
        marginBottom: 10,
        backgroundColor: 'rgb(221, 161, 94)',
    },

    answerButton: {
        backgroundColor: 'rgb(40, 54, 24)',
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 4,
        borderRadius: 4,
        borderColor: 'rgb(40, 54, 24)',
    },

    answerButtonText: {
        textAlign: 'center',
        padding: 15,
        fontSize: 20,
        color: 'rgb(254, 250, 224)', 
    },

    resultsContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'rgb(96, 108, 56)',
  },

  resultsText: {
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 25,
    color: 'rgb(254, 250, 224)',
  },
});

export default Continents;
