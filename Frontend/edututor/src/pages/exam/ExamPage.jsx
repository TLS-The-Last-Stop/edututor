import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/css/ExamPage.css';
import { publicApi } from '../../api/axios.js';

const fetchQuestions = (testPaperId) => publicApi.get(`/test/${testPaperId}`);
const submitAnswer = (userTest) => publicApi.post(`/test/submit`, userTest);

const ExamPage = () => {
  const { testPaperId } = useParams();
  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  useEffect(() => {
    if (testPaperId) {
      fetchQuestions(testPaperId)
          .then((response) => {
            setTestData(response.data);
          })
          .catch((error) => {
            console.error('문제를 가져오는 중 오류 발생:', error);
          });
    }
  }, [testPaperId]);

  const solvedQuestions = Object.keys(answers).length;

  const scrollToQuestion = (questionId) => {
    document.getElementById(`question-${questionId}`).scrollIntoView({ behavior: 'smooth' });
  };

  const handleObjectiveAnswer = (questionId, optionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId
    }));
    setAnsweredQuestions((prev) => new Set(prev).add(questionId));
  };

  const handleSubjectiveAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer
    }));
    setAnsweredQuestions((prev) => new Set(prev).add(questionId));
  };

  const handleSubmit = () => {
    // 답변이 입력되지 않은 질문이 있는지 확인
    const unansweredQuestions = testData.data.questions.filter(
        (question) => !answers[question.questionId]
    );

    if (unansweredQuestions.length > 0) {
      // 경고 메시지 표시
      const confirmSubmit = window.confirm(
          '아직 입력하지 않은 문제가 있습니다. 그래도 제출하시겠습니까?'
      );
      if (!confirmSubmit) return;
    }

    const userTest = {
      testPaperId,
      answers: testData.data.questions.map((question) => ({
        questionId: question.questionId,
        answer: answers[question.questionId] || "xxx"
      }))
    };

    submitAnswer(userTest)
        .then((response) => {
          alert('답안 제출 완료!');
          navigate(-1);
        })
        .catch((error) => {
          console.error('답안 제출 중 오류 발생:', error);
        });
  };

  if (!testData) return <div>로딩 중...</div>;

  const { questions, title } = testData.data;

  return (
      <div className="exam-page">
        <header>
          <h2>{title || '시험지'}</h2>
          <div>
            <span>푼 문제: {solvedQuestions} / 전체 문제: {questions.length}</span>
          </div>
        </header>

        <aside className="question-nav">
          {questions.map((question, index) => (
              <button
                  key={question.questionId}
                  onClick={() => scrollToQuestion(question.questionId)}
                  className={answeredQuestions.has(question.questionId) ? 'answered' : ''}
              >
                {index + 1}
              </button>
          ))}
        </aside>

        <main className="questions">
          {questions.map((question, index) => (
              <div key={question.questionId} id={`question-${question.questionId}`} className="question">
                <h4>문제 {index + 1}</h4>
                {question.passage && <p className="passage">{question.passage}</p>}
                <p>{question.content}</p>
                {question.type === 'OBJECTIVE' ? (
                    <div className="options">
                      {question.options.map((option, index) => (
                          <label key={option.optionId}>
                            <span className="option-number">{index + 1}</span>
                            <input
                                type="radio"
                                name={`question-${question.questionId}`}
                                value={index + 1}
                                checked={answers[question.questionId] === index + 1}
                                onChange={() => handleObjectiveAnswer(question.questionId, index + 1)}
                            />
                            {option.content}
                          </label>
                      ))}
                    </div>
                ) : (
                    <div className="subjective-answer">
                <textarea
                    placeholder="답변을 입력하세요."
                    value={answers[question.questionId] || ''}
                    onChange={(e) => handleSubjectiveAnswer(question.questionId, e.target.value)}
                />
                    </div>
                )}
              </div>
          ))}
        </main>

        <button className="submit" onClick={handleSubmit}>답안 제출</button>
      </div>
  );
};

export default ExamPage;
