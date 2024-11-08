import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/css/MaterialCreationPage.css';
import { publicApi } from '../../api/axios.js';
import { showALert } from '../../utils/SwalAlert.js';

const MaterialCreationPage = () => {
  const [formData, setFormData] = useState({
    title  : '',
    content: '',
    url    : ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const unitId = queryParams.get('unitId');

  useEffect(() => {
    if (!unitId) {
      setErrorMessage('단원 ID를 찾을 수 없습니다.');
    }
  }, [unitId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    // URL 형식 확인을 위한 정규식
    const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}([a-zA-Z]{2,})(\/\S*)?$/;

    if (formData.url && !urlPattern.test(formData.url)) {
      setErrorMessage('유효한 URL을 입력하세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await publicApi.post('/material', { ...formData, unitId });
      setSuccessMessage('학습자료가 성공적으로 등록되었습니다!');
      setFormData({ title: '', content: '', url: '' });
      const message = { icon: 'success', title: '학습자료가 성공적으로 등록되었습니다!' };
      showALert(message);
      window.history.back();
    } catch (error) {
      setErrorMessage('학습자료 등록 중 오류가 발생했습니다.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="material-creation-container">
      <h2 className="page-title">학습 자료 등록</h2>
      <form onSubmit={handleSubmit} className="material-form">
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
        <div className="form-field">
          <label>학습자료 URL (선택):</label>
          <input
            type="text"  // URL 타입을 text로 변경
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className="input-field"
            placeholder="https://www.youtube.com/watch?v=example"
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
