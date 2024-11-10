import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { publicApi } from '../../api/axios.js';
import '../../assets/css/TestDetailPage.css';

const TestDetailPage = () => {
  const { userTestId } = useParams();
  const [testDetail, setTestDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestDetail = async () => {
      try {
        const response = await publicApi.get(`/report/shared-tests/${userTestId}`);
        setTestDetail(response.data.data);
      } catch (error) {
        console.error('Error fetching test detail:', error);
        setError('시험 상세 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };

    if (userTestId) {
      fetchTestDetail();
    }
  }, [userTestId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!testDetail) {
    return <p>시험 정보를 불러오는 중입니다...</p>;
  }

  return (
      <div className="test-detail-page">
        <h2>{testDetail.testPaperName}</h2>
        <p>총 점수: {testDetail.totalScore}점</p>
        <h3>문제 목록</h3>
        <ul className="question-list">
          {testDetail.questions.map((question, index) => (
              <li key={question.questionId} className="question-item">
                <div className="question-title">
                  문제 {index + 1}
                  <span className={`icon ${question.correct ? 'correct' : 'incorrect'}`}>
                    {question.correct ? '⭕' : '❌'}
                  </span>
                </div>
                <p className="question-content"><strong>문제:</strong> {question.questionContent}</p>
                <p><strong>내 답변:</strong> {question.userAnswer === 'xxx' ? '답변 없음' : question.userAnswer}</p>
                <ul className="options-list">
                  {question.options.map((option, optionIndex) => (
                      <li key={option.id} className="option">
                        <label>{`${optionIndex + 1}. ${option.content}`}</label>
                      </li>
                  ))}
                </ul>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default TestDetailPage;
