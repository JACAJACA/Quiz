import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderComponent from '../components/HeaderComponent';
import GoHomeButton from '../components/GoHomeButton';

const TestScreen = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [randomId, setRandomId] = useState(null);
  const navigation = useNavigation();
  let lastRandomId = -1;

  function RandomQuiz() {
    const avillableQuiz = [
      "62032610069ef9b2616c761e",
      "62032610069ef9b2616c761c",
      "62032610069ef9b2616c761d",
      "62032610069ef9b2616c761b"
    ];
  
    let randomId = lastRandomId;
    while (randomId === lastRandomId) {
      randomId = Math.floor(Math.random() * avillableQuiz.length);
    }
    lastRandomId = randomId;
  
    return avillableQuiz[randomId];
  }

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!randomId) return;

      try {
        const response = await fetch('https://tgryl.pl/quiz/test/' + randomId);
        const data = await response.json();
        setQuizData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [randomId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const newRandomId = RandomQuiz();
      setRandomId(newRandomId);
    });

    return unsubscribe;
  }, [navigation]);

  const submitScore = async () => {
    const nick = "Jacek";
    const totalQuestions = quizData?.tasks?.length || 0;

    try {
      const response = await fetch('https://tgryl.pl/quiz/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nick,
          score,
          total: totalQuestions,
          type: quizData?.name || '',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Score submitted successfully!');
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  useEffect(() => {
    if (showResults) {
      submitScore();
    }
  }, [showResults]);


  const handleAnswer = (isCorrect) => {
    setUserAnswers([...userAnswers, { question: currentQuestion, isCorrect }]);
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < quizData?.tasks?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const renderResults = () => {
    if (!showResults) {
      return null;
    }

    return (
      <View style={[styles.resultsContainer]}>
        <Text style={[styles.resultsText]}>Your score: {score} / {quizData?.tasks?.length}</Text>
        <GoHomeButton />
      </View>
    );
  };

  useEffect(() => {
    if (currentQuestion === quizData?.tasks?.length) {
      renderResults();
    }
  }, [currentQuestion, quizData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setCurrentQuestion(0);
      setUserAnswers([]);
      setScore(0);
      setShowResults(false);
    });

    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={[styles.loading]}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <HeaderComponent screenName={quizData?.name || ''} />
      <View style={[styles.questionContainer]}>
        {showResults ? (
          renderResults()
        ) : (
          <>
            {quizData?.tasks?.[currentQuestion] ? (
              <>
                <Text style={[styles.questionText]}>
                  {quizData?.tasks?.[currentQuestion].question}
                </Text>
                <View style={[styles.divider]}></View>
                {quizData?.tasks?.[currentQuestion]?.answers.map((answer, index) => (
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
            ) : (
              <Text>Error: Question data is undefined</Text>
            )}
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

    loadingContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgb(40, 54, 24)',
    },

    loading: {
        padding: 30,
        color: 'rgb(254, 250, 224)',
        fontSize: 25,
        fontFamily: 'RobotoSlab-Regular',
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
        fontFamily: 'RobotoSlab-Regular',
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
        fontFamily: 'RobotoSlab-Regular',
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
    fontFamily: 'RobotoSlab-Regular',
    color: 'rgb(254, 250, 224)',
  },
});

export default TestScreen;
