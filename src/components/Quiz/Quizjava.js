import "./Quizgame.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Quizjava() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const quiz = {
    topic: "Java",
    level: "Beginner",
    totalQuestions: 4,
    perQuestionScore: 5,
    questions: [
      {
        question: "Who invented Java Programming?",
        choices: ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"],
        type: "MCQs",
        correctAnswer: "James Gosling",
      },
      {
        question: "Which statement is true about Java?",
        choices: ["Java is a sequence-dependent programming language", "Java is a code dependent programming language", "Java is a platform-dependent programming language", "Java is a platform-independent programming language"],
        type: "MCQs",
        correctAnswer: "Java is a platform-independent programming language",
      },
      {
        question: "Which component is used to compile, debug and execute the java programs?",
        choices: ["JRE", "JIT", "JDK", "JVM"],
        type: "MCQs",
        correctAnswer: "JDK",
      },
      {
        question: "Which one of the following is not a Java feature?",
        choices: ["Object-oriented", "Use of pointers", "Portable", "Dynamic and Extensible"],
        type: "MCQs",
        correctAnswer: "Use of pointers",
      },
    ],
  };

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  useEffect(() => {
    if (showResult) {
      const gameData = {
        title: "Java", // Replace with the actual quiz title
        score: result.score,
        correctans: result.correctAnswers,
        wrongans: result.wrongAnswers,
        studentId: localStorage.getItem('studentId'),
      };

      axios.post('http://localhost:8081/storeGameData', gameData)
        .then((response) => {
          console.log('Game data stored successfully');
        })
        .catch((error) => {
          console.error('Error storing game data', error);
        });
    }
  }, [showResult]);

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={
                  selectedAnswerIndex === index ? "selected-answer" : null
                }
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Quizjava;
