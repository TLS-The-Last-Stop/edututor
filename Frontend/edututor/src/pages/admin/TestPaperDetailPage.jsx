import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TestPaperDetailPage = () => {
  const { testPaperId } = useParams();
  const [testPaperData, setTestPaperData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestPaper = async () => {
      try {
        const response = await axios.get(`/api/test-paper/${testPaperId}`);
        console.log(response.data.data); // 데이터를 콘솔에 출력하여 구조 확인
        setTestPaperData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('시험지 데이터를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchTestPaper();
  }, [testPaperId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div className="test-paper-detail">
        <h1>시험지 상세</h1>
        {testPaperData && (
            <div>
              <h2>시험지 제목: {testPaperData.title || '제목 없음'}</h2>

              {testPaperData.questions && testPaperData.questions.length > 0 ? (
                  testPaperData.questions.map((question) => (
                      <div key={question.id} className="question-block">
                        <h3>질문 {question.id}: {question.content}</h3>
                        <p>설명: {question.commentary}</p>

                        <ul>
                          {question.options.map((option) => (
                              <li key={option.id}>
                                {option.content} {option.correct ? '(정답)' : ''}
                              </li>
                          ))}
                        </ul>
                      </div>
                  ))
              ) : (
                  <p>질문이 없습니다.</p>
              )}
            </div>
        )}
      </div>
  );
};

export default TestPaperDetailPage;
