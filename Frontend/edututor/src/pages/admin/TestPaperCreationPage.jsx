import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/TestPaperCreationPage.css';

const TestPaperCreationPage = () => {
  const [formData, setFormData] = useState({
    unitId: '',
    title: '',
    questions: [
      {
        content: '',
        passage: '',
        commentary: '',
        type: 'OBJECTIVE',  // 질문 유형 추가
        answerText: '',     // 주관식 정답 필드 추가
        options: [
          { content: '', isCorrect: false },
          { content: '', isCorrect: false },
        ],
      },
    ],
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const unitId = queryParams.get('unitId');

  useEffect(() => {
    if (unitId) {
      setFormData((prevData) => ({ ...prevData, unitId }));
    }
  }, [unitId]);

  const handleInputChange = (e, questionIndex, optionIndex) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = { ...formData };

    if (optionIndex !== undefined) {
      updatedFormData.questions[questionIndex].options[optionIndex][name] = type === 'checkbox' ? checked : value;
    } else if (questionIndex !== undefined) {
      updatedFormData.questions[questionIndex][name] = value;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          content: '',
          passage: '',
          commentary: '',
          type: 'OBJECTIVE',
          answerText: '',
          options: [
            { content: '', isCorrect: false },
            { content: '', isCorrect: false },
          ],
        },
      ],
    });
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.push({ content: '', isCorrect: false });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/test-paper', formData);
      alert('시험지가 성공적으로 등록되었습니다!');
      setFormData({
        unitId: '',
        title: '',
        questions: [
          {
            content: '',
            passage: '',
            commentary: '',
            type: 'OBJECTIVE',
            answerText: '',
            options: [
              { content: '', isCorrect: false },
              { content: '', isCorrect: false },
            ],
          },
        ],
      });
    } catch (error) {
      alert('시험지 등록 중 오류가 발생했습니다.');
    }
  };

  return (
      <div className="test-paper-creation-container">
        <h2>시험지 생성</h2>
        <form onSubmit={handleSubmit} className="test-paper-form">
          {/* ... 기본 입력 필드 ... */}

          {formData.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-block">
                <h4>질문 {questionIndex + 1}</h4>
                <div className="form-field">
                  <label>질문 유형:</label>
                  <select
                      name="type"
                      value={question.type}
                      onChange={(e) => handleInputChange(e, questionIndex)}
                  >
                    <option value="OBJECTIVE">객관식</option>
                    <option value="SUBJECTIVE">주관식</option>
                  </select>
                </div>

                {/* 객관식 문제일 때 옵션 표시 */}
                {question.type === 'OBJECTIVE' ? (
                    question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="option-block">
                          <h5>옵션 {optionIndex + 1}</h5>
                          <div className="form-field">
                            <label>옵션 내용:</label>
                            <input
                                type="text"
                                name="content"
                                value={option.content}
                                onChange={(e) => handleInputChange(e, questionIndex, optionIndex)}
                                required
                            />
                          </div>
                          <div className="form-field">
                            <label>정답 여부:</label>
                            <input
                                type="checkbox"
                                name="isCorrect"
                                checked={option.isCorrect}
                                onChange={(e) => handleInputChange(e, questionIndex, optionIndex)}
                            />
                          </div>
                        </div>
                    ))
                ) : (
                    // 주관식 문제일 때 정답 필드 표시
                    <div className="form-field">
                      <label>주관식 정답:</label>
                      <input
                          type="text"
                          name="answerText"
                          value={question.answerText}
                          onChange={(e) => handleInputChange(e, questionIndex)}
                          required
                      />
                    </div>
                )}

                <button type="button" onClick={() => addOption(questionIndex)} className="add-button" disabled={question.type === 'SUBJECTIVE'}>
                  옵션 추가
                </button>
              </div>
          ))}

          <button type="button" onClick={addQuestion} className="add-button">질문 추가</button>
          <button type="submit" className="submit-button">시험지 등록</button>
        </form>
      </div>
  );
};

export default TestPaperCreationPage;
