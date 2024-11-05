import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/css/TestPaperCreationPage.css';
import { publicApi } from '../../api/axios.js';

const TestPaperCreationPage = () => {
  const [formData, setFormData] = useState({
    unitId: '',
    title: '',
    questions: [
      {
        content: '',
        passage: '',
        commentary: '',
        type: 'OBJECTIVE',
        answerText: '',
        LEVEL: '1',
        options: [
          { content: '', isCorrect: false },
          { content: '', isCorrect: false }
        ]
      }
    ]
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
          LEVEL: '1', // 새로운 문제 추가 시 기본 난이도 설정
          options: [
            { content: '', isCorrect: false },
            { content: '', isCorrect: false }
          ]
        }
      ]
    });
  };

  const removeQuestion = (questionIndex) => {
    const updatedQuestions = formData.questions.filter((_, index) => index !== questionIndex);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.push({ content: '', isCorrect: false });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const modifiedFormData = {
      ...formData,
      questions: formData.questions.map(question => ({
        ...question,
        level: question.LEVEL,
      }))
    };

    try {
      await publicApi.post('/test-paper', modifiedFormData);
      alert('시험지가 성공적으로 등록되었습니다.');
      window.history.back();
    } catch (error) {
      alert('시험지 등록 중 오류가 발생했습니다.');
    }
  };

  return (
      <div className="test-paper-creation-container">
        <h2>형성평가 생성</h2>
        <form onSubmit={handleSubmit} className="test-paper-form">
          <div className="form-field">
            <label>시험지 제목:</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
            />
          </div>

          {formData.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-block">
                <div className="question-header">
                  <h4>문제 {questionIndex + 1}</h4>
                  <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="remove-question-button"
                  >
                    문제 제거
                  </button>
                </div>

                <div className="form-field">
                  <label>유형:</label>
                  <select
                      name="type"
                      value={question.type}
                      onChange={(e) => handleInputChange(e, questionIndex)}
                  >
                    <option value="OBJECTIVE">객관식</option>
                    <option value="SUBJECTIVE">주관식</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>문제 내용:</label>
                  <input
                      type="text"
                      name="content"
                      value={question.content}
                      onChange={(e) => handleInputChange(e, questionIndex)}
                      required
                  />
                </div>
                <div className="form-field">
                  <label>난이도:</label>
                  <select
                      name="LEVEL"
                      value={question.LEVEL}
                      onChange={(e) => handleInputChange(e, questionIndex)}
                  >
                    <option value="1">하</option>
                    <option value="2">중</option>
                    <option value="3">상</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>지문:</label>
                  <textarea
                      name="passage"
                      value={question.passage}
                      onChange={(e) => handleInputChange(e, questionIndex)}
                      rows="3"
                  />
                </div>
                <div className="form-field">
                  <label>해설:</label>
                  <textarea
                      name="commentary"
                      value={question.commentary}
                      onChange={(e) => handleInputChange(e, questionIndex)}
                      rows="3"
                  />
                </div>

                {question.type === 'OBJECTIVE' ? (
                    question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="option-block">
                          <div className="form-field">
                            <label>{optionIndex + 1}번:</label>
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
                          <button
                              type="button"
                              onClick={() => removeOption(questionIndex, optionIndex)}
                              className="remove-button"
                          >
                            옵션 제거
                          </button>
                        </div>
                    ))
                ) : (
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

                <button
                    type="button"
                    onClick={() => addOption(questionIndex)}
                    className="add-button"
                    disabled={question.type === 'SUBJECTIVE'}
                >
                  옵션 추가
                </button>
              </div>
          ))}

          <button type="button" onClick={addQuestion} className="add-button">
            문제 추가
          </button>
          <button type="submit" className="submit-button">
            시험지 등록
          </button>
        </form>
      </div>
  );
};

export default TestPaperCreationPage;
