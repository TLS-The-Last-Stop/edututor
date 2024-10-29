import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../assets/css/ExamPage.css';

const fetchQuestions = (testPaperId) => axios.get(`/api/test/${testPaperId}`);
const submitAnswer = (userTest) => axios.post(`/api/test/submit`, userTest);

const ExamPage = () => {
  const { testPaperId } = useParams();
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
            console.error("문제를 가져오는 중 오류 발생:", error);
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
      [questionId]: optionId,
    }));
    setAnsweredQuestions((prev) => new Set(prev).add(questionId)); // 답변 완료 처리
  };

  const handleSubjectiveAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
    setAnsweredQuestions((prev) => new Set(prev).add(questionId)); // 답변 완료 처리
  };

  const handleSubmit = () => {
    const userTest = {
      testPaperId,
      answers: Object.keys(answers).map((questionId) => ({
        questionId: Number(questionId),
        answer: answers[questionId],
      })),
    };

    submitAnswer(userTest)
        .then((response) => {
          alert("답안 제출 완료!");
        })
        .catch((error) => {
          console.error("답안 제출 중 오류 발생:", error);
        });
  };

  if (!testData) return <div>로딩 중...</div>;

  const { questions, title } = testData.data;

  return (
      <div className="exam-page">
        <header>
          <h2>{title || "시험지"}</h2>
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
          {questions.map((question) => (
              <div key={question.questionId} id={`question-${question.questionId}`} className="question">
                <h3>문제 {question.questionId}</h3>
                <p>{question.content}</p>
                {question.type === "OBJECTIVE" ? (
                    <div className="options">
                      {question.options.map((option) => (
                          <label key={option.optionId}>
                            <input
                                type="radio"
                                name={`question-${question.questionId}`}
                                value={option.optionId}
                                checked={answers[question.questionId] === option.optionId}
                                onChange={() => handleObjectiveAnswer(question.questionId, option.optionId)}
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
