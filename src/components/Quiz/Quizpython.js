import React, { useState, useEffect } from "react";
import axios from "axios";

function Quizpython() {
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
    topic: "Python",
    level: "Beginner",
    totalQuestions: 4,
    perQuestionScore: 5,
    questions: [
      {
        question:
          "In Python, which module is used to serialize an object into a JSON string?",
        choices: ["jsonify()", "serialize()", "dumps()", "None of the above"],
        type: "MCQs",
        correctAnswer: "dumps()",
      },
      {
        question:
          "Which keyword is used to define a variable in Python?",
        choices: ["var", "let", "const", "None of the above"],
        type: "MCQs",
        correctAnswer: "None of the above",
      },
      {
        question:
          "Which of the following methods can be used to display data in Python?",
        choices: [
          "print()",
          "log()",
          "alert()",
          "All of the above",
        ],
        type: "MCQs",
        correctAnswer: "print()",
      },
      {
        question: "How can a constant be declared in Python?",
        choices: ["constant", "var", "let", "const"],
        type: "MCQs",
        correctAnswer: "None of the above",
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
        title: "Python", // Replace with the actual quiz title
        score: result.score,
        correctans: result.correctAnswers,
        wrongans: result.wrongAnswers,
        studentId: localStorage.getItem('studentId'),
      };

      axios.post('https://student-hub-portal.onrender.com/storeGameData', gameData)
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

export default Quizpython;
