import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderComponent from '../components/HeaderComponent';
import GoHomeButton from '../components/GoHomeButton';

const Oceans = () => {
  const tasks = [
    {
        "question": "Which ocean is the largest and covers more than 30% of the Earth's surface?",
        "answers": [
            {
                "content": "INDIAN OCEAN",
                "isCorrect": false
            },
            {
                "content": "ATLANTIC OCEAN",
                "isCorrect": false
            },
            {
                "content": "PACIFIC OCEAN",
                "isCorrect": true
            },
            {
                "content": "SOUTHERN OCEAN",
                "isCorrect": false
            }
        ],
        "duration": 30
    },
    {
        "question": "Which ocean is the smallest and surrounds the continent of Antarctica?",
        "answers": [
            {
                "content": "ARCTIC OCEAN",
                "isCorrect": false
            },
            {
                "content": "SOUTHERN OCEAN",
                "isCorrect": true
            },
            {
                "content": "ATLANTIC OCEAN",
                "isCorrect": false
            },
            {
                "content": "PACIFIC OCEAN",
                "isCorrect": false
            }
        ],
        "duration": 30
    },
    {
        "question": "Which ocean is located between Asia and the Americas?",
        "answers": [
            {
                "content": "INDIAN OCEAN",
                "isCorrect": false
            },
            {
                "content": "PACIFIC OCEAN",
                "isCorrect": true
            },
            {
                "content": "ATLANTIC OCEAN",
                "isCorrect": false
            },
            {
                "content": "ARCTIC OCEAN",
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
      <HeaderComponent screenName="Oceans" />
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

export default Oceans;
