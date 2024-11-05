import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/MaterialDetailPage.css';
import { publicApi } from '../../api/axios.js';

const MaterialDetailPage = () => {
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

  const renderVideo = (url) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    return videoId ? (
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    ) : (
        <p>유효한 YouTube URL이 아닙니다.</p>
    );
  };

  return (
      <div className="material-detail-page">
        <h1>학습자료 상세</h1>
        {materialData ? (
            <div>
              <h2>제목: {materialData.title}</h2>
              <p>내용: {materialData.content}</p>
              {materialData.url && (
                  <div className="video-container">
                    {renderVideo(materialData.url)}
                  </div>
              )}
            </div>
        ) : (
            <p>학습자료가 존재하지 않습니다.</p>
        )}
      </div>
  );
};

export default MaterialDetailPage;
