import React, { useState } from 'react';
import '../../assets/css/TestPreviewModal.css';
import { publicApi } from '../../api/axios.js';
import { showALert } from '../../utils/SwalAlert.js';

const TestPreviewModal = ({ isOpen, onClose, testData }) => {
  const [isReportingIssue, setIsReportingIssue] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [reportContent, setReportContent] = useState(''); // 신고 내용 상태 추가

  if (!isOpen || !testData) return null;

  const difficultyLabel = (level) => {
    switch (level) {
      case 1:
        return '하';
      case 2:
        return '중';
      case 3:
        return '상';
      default:
        return '중';
    }
  };

  const handleReportIssue = async (questionId, content) => {
    try {
      const response = await publicApi.post('/issue/report', {
        questionId: questionId,
        content   : content
      });

      if (response.status === 200) {
        const message = { icon: 'success', title: '신고가 접수되었습니다.' };
        showALert(message);
        setIsReportingIssue(false);
      } else {
        const message = { icon: 'error', title: '신고에 실패했습니다.' };
        showALert(message);
      }
    } catch (error) {
      const message = { icon: 'error', title: '신고 처리 중 오류가 발생했습니다.' };
      showALert(message);
      console.error('Error reporting issue:', error);
    }
  };

  const handleIssueSubmit = () => {
    if (selectedQuestion) {
      handleReportIssue(selectedQuestion.id, reportContent);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content test-preview-modal">
        <button className="close-button" onClick={onClose}>X</button>

        {isReportingIssue ? (
          <>
            <h2 className="modal-title">오류 문항 신고</h2>
            <div className="report-content">
              <label>문제 이름</label>
              <input type="text" value={selectedQuestion?.content || ''} readOnly className="input-field" />

              <label>오류 내용</label>
              <textarea
                placeholder="오류 내용을 입력하세요."
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                className="textarea-field"
              ></textarea>

              <div className="modal-actions">
                <button onClick={handleIssueSubmit} className="confirm-button">확인</button>
                <button onClick={() => setIsReportingIssue(false)} className="cancel-button">취소</button>
              </div>
            </div>
          </>
        ) : (
          <>
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
                    난이도: <span className={`difficulty-label level-${question.level}`}>
                      {difficultyLabel(question.level)}
                    </span>
                  </span>
                </div>
                <div className="question-content">
                  <p>{question.content}</p>
                  {question.type === 'OBJECTIVE' && (
                    <ul className="option-list">
                      {question.options.map((option, idx) => (
                        <li key={option.id} className="option-item">
                          {idx + 1}. {option.content} {option.isCorrect && '(정답)'}
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
                    <strong>해설:</strong> {question.commentary || '해설이 없습니다'}
                  </div>
                  <button
                    className="report-button"
                    onClick={() => {
                      setSelectedQuestion(question);
                      setIsReportingIssue(true);
                    }}
                  >
                    문제 신고
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TestPreviewModal;
