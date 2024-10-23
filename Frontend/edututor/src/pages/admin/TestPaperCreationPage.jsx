import React, { useState } from 'react';
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
        options: [
          { content: '', isCorrect: false },
          { content: '', isCorrect: false },
        ],
      },
    ],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 입력값 변경 핸들러
  const handleInputChange = (e, questionIndex, optionIndex) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = { ...formData };

    if (optionIndex !== undefined) {
      // 옵션 값 변경
      updatedFormData.questions[questionIndex].options[optionIndex][name] = type === 'checkbox' ? checked : value;
    } else if (questionIndex !== undefined) {
      // 질문 값 변경
      updatedFormData.questions[questionIndex][name] = value;
    } else {
      // 시험지 정보 변경
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  // 문제 추가 핸들러
  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          content: '',
          passage: '',
          commentary: '',
          options: [
            { content: '', isCorrect: false },
            { content: '', isCorrect: false },
          ],
        },
      ],
    });
  };

  // 옵션 추가 핸들러
  const addOption = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.push({ content: '', isCorrect: false });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // POST 요청을 통해 시험지 데이터 전송
      const response = await axios.post('http://localhost:8080/api/test-paper', formData);
      setSuccessMessage('시험지가 성공적으로 등록되었습니다!');
      setFormData({
        unitId: '',
        title: '',
        content: '',
        questions: [
          {
            content: '',
            passage: '',
            commentary: '',
            options: [
              { content: '', isCorrect: false },
              { content: '', isCorrect: false },
            ],
          },
        ],
      });
    } catch (error) {
      setErrorMessage('시험지 등록 중 오류가 발생했습니다.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="test-paper-creation-container">
        <h2>시험지 생성</h2>
        <form onSubmit={handleSubmit} className="test-paper-form">
          <div className="form-field">
            <label>단원 ID (Unit ID):</label>
            <input
                type="number"
                name="unitId"
                value={formData.unitId}
                onChange={(e) => handleInputChange(e)}
                className="input-field"
                required
            />
          </div>
          <div className="form-field">
            <label>시험지 제목 (Title):</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => handleInputChange(e)}
                className="input-field"
                required
            />
          </div>
          <div className="form-field">
            <label>시험지 내용 (Content):</label>
            <textarea
                name="content"
                value={formData.content}
                onChange={(e) => handleInputChange(e)}
                className="textarea-field"
                required
            />
          </div>

          {/* 질문 추가 */}
          {formData.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-block">
                <h4>질문 {questionIndex + 1}</h4>
                <div className="form-field">
                  <label>질문 내용:</label>
                  <input
                      type="text"
                      name="content"
                      value={question.content}
                      onChange={(e) => handleInputChange(e, questionIndex)}
                      className="input-field"
                      required
                  />
                </div>
                <div className="form-field">
                  <label>설명 (Commentary):</label>
                  <input
                      type="text"
                      name="commentary"
                      value={question.commentary}
                      onChange={(e) => handleInputChange(e, questionIndex)}
                      className="input-field"
                  />
                </div>

                {/* 옵션 추가 */}
                {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="option-block">
                      <h5>옵션 {optionIndex + 1}</h5>
                      <div className="form-field">
                        <label>옵션 내용:</label>
                        <input
                            type="text"
                            name="content"
                            value={option.content}
                            onChange={(e) => handleInputChange(e, questionIndex, optionIndex)}
                            className="input-field"
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
                ))}
                <button type="button" onClick={() => addOption(questionIndex)} className="add-button">
                  옵션 추가
                </button>
              </div>
          ))}

          <button type="button" onClick={addQuestion} className="add-button">
            질문 추가
          </button>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '시험지 등록'}
          </button>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
  );
};

export default TestPaperCreationPage;
