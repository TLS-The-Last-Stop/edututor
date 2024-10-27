import React, { useState, useEffect } from 'react';
import { fetchQuestions, submitAnswer } from '../../api/exam/ExamApi';
import QuestionList from '../../components/exam/QuestionList';
import QuestionNavigation from '../../components/exam/QuestionNavigation';
import SubmitButton from '../../components/exam/SubmitButton';
import '../../assets/css/ExamPage.css';

function ExamPage() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");  // 시험지 제목 상태 추가
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestions(1)
        .then(response => {
          setTitle(response.data.data.title);
          setQuestions(response.data.data.questions);
        })
        .catch(error => console.error("문제 불러오기 실패:", error));
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    const userTest = {
      user: { id: 1 },
      testPaper: { id: 1 },
      result: 0,
      examTaken: true,
    };

    submitAnswer(userTest)
        .then(() => alert("답안이 제출되었습니다!"))
        .catch(error => console.error("답안 제출 실패:", error));
  };

  return (
      <div className="exam-page">
        <h1>시험지: {title}</h1>
        {questions.length > 0 && (
            <QuestionList
                question={questions[currentQuestion]}
                onAnswerChange={handleAnswerChange}
                answer={answers[questions[currentQuestion]?.id] || ''}
                className="question-list"
            />
        )}
        <QuestionNavigation
            total={questions.length}
            current={currentQuestion}
            onNavigate={setCurrentQuestion}
            className="question-navigation"
        />
        <SubmitButton onSubmit={handleSubmit} className="submit-button" />
      </div>
  );
}

export default ExamPage;
