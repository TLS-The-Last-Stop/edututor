import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/MaterialEditPage.css';
import { publicApi } from '../../api/axios.js';
import { showALert } from '../../utils/SwalAlert.js';
import { Required } from '../../components/common/UserStyledComponents.js';

const MaterialEditPage = () => {
  const { materialId } = useParams();
  const [formData, setFormData] = useState({
    title  : '',
    content: '',
    url    : ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await publicApi.get(`/material/${materialId}`);
        const { title, content, url } = response.data.data;
        setFormData({ title, content, url });
      } catch (error) {
        setErrorMessage('학습자료 데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('Error loading material:', error);
      }
    };
    fetchMaterial();
  }, [materialId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await publicApi.put(`/material/${materialId}`, formData);
      setSuccessMessage('학습자료가 성공적으로 수정되었습니다!');
      showALert({ icon: 'success', title: '학습자료가 성공적으로 수정되었습니다!' });
      navigate(-1);
    } catch (error) {
      setErrorMessage('학습자료 수정 중 오류가 발생했습니다.');
      console.error('Error updating material:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await publicApi.delete(`/material/${materialId}`);
      showALert({ icon: 'success', title: '학습자료가 성공적으로 삭제되었습니다!' });
      navigate(-1);
    } catch (error) {
      setErrorMessage('학습자료 삭제 중 오류가 발생했습니다.');
      console.error('Error deleting material:', error);
    }
  };

  return (
    <div className="material-edit-container">
      <h2 className="page-title">학습 자료 수정</h2>
      <form onSubmit={handleUpdate} className="material-form">
        <div className="form-field" style={{ display: 'flex' }}>
          <label style={{ display: 'inline-block', width: '25%' }}>제목 (Title)<Required>*</Required></label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input-field"
            required
            style={{ margin: '0' }}
          />
        </div>
        <div className="form-field" style={{ display: 'flex' }}>
          <label>내용 (Content)<Required>*</Required></label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="textarea-field"
            required
          />
        </div>
        <div className="form-field" style={{ display: 'flex' }}>
          <label>학습자료 URL</label>
          <input
            type="text"  // URL 타입을 text로 변경
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className="input-field"
            placeholder="https://www.youtube.com/watch?v=example"
            style={{ margin: '0' }}
          />
        </div>

        <button type="submit" className="submit-button0" disabled={isSubmitting}>
          {isSubmitting ? '수정 중...' : '수정하기'}
        </button>
        <button type="button" onClick={handleDelete} className="delete-button">
          삭제하기
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default MaterialEditPage;
