import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/MaterialDetailPage.css';
import { publicApi } from '../../api/axios.js';

const MaterialDetailStudentPage = () => {
  const { materialId } = useParams();
  const [materialData, setMaterialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await publicApi.get(`/material/${materialId}`);
        setMaterialData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('학습자료 데이터를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };
    fetchMaterial();
  }, [materialId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="material-detail-page">
      <h1>학습자료 상세</h1>
      {materialData ? (
        <div>
          <h2>제목: {materialData.title}</h2>
          <p>내용: {materialData.content}</p>
        </div>
      ) : (
        <p>학습자료가 존재하지 않습니다.</p>
      )}
    </div>
  );
};

export default MaterialDetailStudentPage;
