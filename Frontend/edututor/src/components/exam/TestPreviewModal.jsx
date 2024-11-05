import React from 'react';
import '../../assets/css/TestPreviewModal.css';

const TestPreviewModal = ({ isOpen, onClose, testData }) => {
  if (!isOpen || !testData) return null;

  return (
      <div className="modal-overlay">
        <div className="modal-content test-preview-modal">
          <button className="close-button" onClick={onClose}>X</button>
          <h2 className="modal-title">시험지 미리보기</h2>
          <div className="test-info">
            <h3>{testData.title}</h3>
            <p>총 {testData.questions.length}문제</p>
          </div>
          {testData.questions.map((question, index) => (
              <div key={question.id} className="question-preview">
                <div className="question-header">
                  <span className="question-number">{index + 1}</span>
                  <span className="question-difficulty">
                난이도: <span className={`difficulty-label ${question.difficulty}`}>{question.difficulty || "중"}</span>
              </span>
                </div>
                <div className="question-content">
                  <p>{question.content}</p>
                  {question.type === 'OBJECTIVE' && (
                      <ul className="option-list">
                        {question.options.map((option, idx) => (
                            <li key={option.id} className="option-item">
                              {idx + 1}. {option.content} {option.isCorrect && "(정답)"}
                            </li>
                        ))}
                      </ul>
                  )}
                  {question.type === 'SUBJECTIVE' && (
                      <p className="subjective-answer"><strong>주관식 정답:</strong> {question.answerText}</p>
                  )}
                </div>
                <div className="question-footer">
                  <div className="explanation">
                    <strong>해설:</strong> {question.commentary}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default TestPreviewModal;
