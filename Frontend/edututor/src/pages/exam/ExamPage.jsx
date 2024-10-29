import React, { useState, useEffect } from 'react';
import { fetchQuestions, submitAnswer } from '../../api/exam/ExamApi';
import QuestionList from '../../components/exam/QuestionList';
import QuestionNavigation from '../../components/exam/QuestionNavigation';
import SubmitButton from '../../components/exam/SubmitButton';
import '../../assets/css/ExamPage.css';

function ExamPage() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [answers, setAnswers] = useState({});
  const [answeredCount, setAnsweredCount] = useState(0);

  useEffect(() => {
    fetchQuestions(7)
        .then(response => {
          setTitle(response.data.data.title);
          setQuestions(response.data.data.questions);
        })
        .catch(error => console.error("문제 불러오기 실패:", error));
  }, []);

  const handleAnswerChange = (questionId, answer, questionType) => {
    setAnswers(prevAnswers => {
      const updatedAnswers = {
        ...prevAnswers,
        [questionId]: questionType === 'OBJECTIVE' ? answer : answer.trim() // 객관식은 배열, 주관식은 문자열로 저장
      };
      const newAnsweredCount = Object.keys(updatedAnswers).filter(id => updatedAnswers[id] && updatedAnswers[id].length > 0).length;
      setAnsweredCount(newAnsweredCount);
      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    const userTest = {
      user: { id: 1 },
      testPaper: { id: 7 },
      answers: answers,
      result: 0,
      examTaken: true,
    };

    submitAnswer(userTest)
        .then(() => alert("답안이 제출되었습니다!"))
        .catch(error => console.error("답안 제출 실패:", error));
  };

  return (
      <div className="exam-page">
        <h1 className="exam-title">시험지: {title}</h1>
        <div className="exam-header">
          <span>{answeredCount} / {questions.length} 푼 문제</span>
        </div>
        <div className="exam-content">
          <QuestionNavigation
              questions={questions}
              answers={answers}
              onNavigate={(id) => {
                document.getElementById(`question-${id}`).scrollIntoView({ behavior: "smooth" });
              }}
          />
          <QuestionList
              questions={questions}
              answers={answers}
              onAnswerChange={handleAnswerChange}
          />
        </div>
        <SubmitButton onSubmit={handleSubmit} />
      </div>
  );
}

export default ExamPage;
