import React from 'react';
import '../../assets/css/QuestionList.css';

function QuestionList({ questions, answers, onAnswerChange }) {
  const handleCheckboxChange = (questionId, optionContent) => {
    const currentAnswers = answers[questionId] || [];
    let updatedAnswers;
    if (currentAnswers.includes(optionContent)) {
      updatedAnswers = currentAnswers.filter(answer => answer !== optionContent);
    } else {
      updatedAnswers = [...currentAnswers, optionContent];
    }
    onAnswerChange(questionId, updatedAnswers, 'OBJECTIVE');
  };

  const handleInputChange = (questionId, value) => {
    onAnswerChange(questionId, value, 'SUBJECTIVE');
  };

  return (
      <div className="question-list">
        {questions.map((question, index) => (
            <div key={index} id={`question-${question.id}`} className="question-item">
              <h4 className="question-title">{index + 1}. {question.content}</h4>
              {question.passage && <p className="question-passage">{question.passage}</p>}
              {question.type === 'OBJECTIVE' ? (
                  <div className="options">
                    {question.options.map((option, i) => (
                        <label key={i} className="option-label">
                          <input
                              type="checkbox"
                              name={`question-${question.id}`}
                              value={option.content}
                              checked={(answers[question.id] || []).includes(option.content)}
                              onChange={() => handleCheckboxChange(question.id, option.content)}
                          />
                          {i + 1}. {option.content}
                        </label>
                    ))}
                  </div>
              ) : (
                  <div className="subjective-answer-wrapper">
              <textarea
                  name={`question-${question.id}`}
                  value={answers[question.id] || ''}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  className="subjective-answer-textarea"
                  placeholder="답을 입력하세요"
                  rows="3"
              />
                  </div>
              )}
            </div>
        ))}
      </div>
  );
}

export default QuestionList;
