import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/css/MaterialCreationPage.css';


const MaterialCreationPage = () => {
  const [formData, setFormData] = useState({
    unitId: '',
    title: '',
    content: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('/api/material', formData);
      setSuccessMessage('학습자료가 성공적으로 등록되었습니다!');
      setFormData({ unitId: '', title: '', content: '' });
    } catch (error) {
      setErrorMessage('학습자료 등록 중 오류가 발생했습니다.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="material-creation-container">
        <h2>학습자료 등록</h2>
        <form onSubmit={handleSubmit} className="material-form">
          <div className="form-field">
            <label>단원 ID (Unit ID):</label>
            <input
                type="number"
                name="unitId"
                value={formData.unitId}
                onChange={handleInputChange}
                className="input-field"
                required
            />
          </div>
          <div className="form-field">
            <label>제목 (Title):</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input-field"
                required
            />
          </div>
          <div className="form-field">
            <label>내용 (Content):</label>
            <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="textarea-field"
                required
            />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '등록하기'}
          </button>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
  );
};

export default MaterialCreationPage;
