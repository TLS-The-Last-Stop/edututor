import React from 'react';
import '../../assets/css/QuestionNavigation.css';

function QuestionNavigation({ questions, answers, onNavigate }) {
  return (
      <div className="question-navigation">
        {questions.map((question, index) => (
            <button
                key={index}
                onClick={() => onNavigate(question.id)}
                className={`question-number ${answers[question.id] ? 'answered' : ''}`}
            >
              {index + 1}
            </button>
        ))}
      </div>
  );
}

export default QuestionNavigation;
