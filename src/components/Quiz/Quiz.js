import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Quiz.css";

const languages = [
  { name: 'java', label: 'Java' },
  { name: 'python', label: 'Python' },
  { name: 'c', label: 'C' },
  { name: 'javascript', label: 'Javascript' },
];

function QuizHome() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleStartLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const startGame = () => {
    const languageRoutes = {
      java: '/quizjava',
      python: '/quizpython',
      c: '/quizc',
      javascript: '/quizjavascript',
    };
    const selectedRoute = languageRoutes[selectedLanguage];
    
    if (selectedRoute) {
      navigate(selectedRoute);
    } else {
      // Display an error message or prompt the user to make selections.
    }
  };

  return (
    <div>
      <h1 className='quizhead'>Assess Yourself Here !!!</h1>
      <div className="language-selection">
        <strong>Select Language:</strong>
        <div className="Language-buttons">
          {languages.map((language) => (
            <button
              key={language.name}
              className={`language-btn ${language.name === selectedLanguage ? 'selected' : ''}`}
              onClick={() => handleStartLanguage(language.name)}
            >
              {language.label}
            </button>
          ))}
        </div>
      </div>

      {(selectedLanguage) && (
        <button className="start-button" onClick={startGame}>
          Start Quiz
        </button>
      )}
    </div>
  );
}

export default QuizHome;