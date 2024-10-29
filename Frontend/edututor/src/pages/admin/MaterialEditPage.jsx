import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { publicApi } from '../../api/axios.js';

const MaterialEditPage = () => {
  const { materialId } = useParams();
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await publicApi.get(`/material/${materialId}`);
        setFormData({ title: response.data.data.title, content: response.data.data.content });
        setLoading(false);
      } catch (err) {
        setError('학습자료 데이터를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [materialId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicApi.put(`/material/${materialId}`, formData);
      alert('학습자료가 성공적으로 수정되었습니다!');
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      setError('학습자료 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      await publicApi.delete(`/material/${materialId}`);
      alert('학습자료가 성공적으로 삭제되었습니다!');
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      setError('학습자료 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="material-edit-page">
      <h2>학습자료 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>제목 (Title):</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label>내용 (Content):</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">수정하기</button>
        <button type="button" onClick={handleDelete} className="delete-button">삭제하기</button>
      </form>
    </div>
  );
};

export default MaterialEditPage;
