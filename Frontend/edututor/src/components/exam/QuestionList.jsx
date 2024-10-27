import React from 'react';

function QuestionList({ question, onAnswerChange, answer }) {
  return (
      <div className="question-list">
        <h2>문제 {question.id}</h2>
        <p>{question.content}</p>

        {question.commentary === "OBJECTIVE" && question.options && (
            <div className="options">
              {question.options.map((option) => (
                  <label key={option.id}>
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.id}
                        checked={answer === option.id}
                        onChange={() => onAnswerChange(question.id, option.id)}
                    />
                    {option.content}
                  </label>
              ))}
            </div>
        )}

        {question.commentary === "SUBJECTIVE" && (
            <div className="subjective-answer">
              <input
                  type="text"
                  value={answer || ''}
                  placeholder="답을 입력하세요."
                  onChange={(e) => onAnswerChange(question.id, e.target.value)}
              />
            </div>
        )}

        {question.commentary && (
            <div className="commentary">
              <strong>해설:</strong> {question.commentary}
            </div>
        )}
      </div>
  );
}

export default QuestionList;
