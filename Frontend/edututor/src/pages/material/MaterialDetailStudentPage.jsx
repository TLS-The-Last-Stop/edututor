import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/MaterialDetailPage.css';
import { publicApi } from '../../api/axios.js';
import { questionApi } from '../../api/questionApi.js'; // 새로 추가된 axios 인스턴스
import Loading from '../../components/common/Loading.jsx';

const MaterialDetailStudentPage = () => {
  const { materialId } = useParams();
  const [materialData, setMaterialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatedQuestion, setGeneratedQuestion] = useState(''); // 생성된 시험 문제 상태

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

  const handleGenerateQuestion = async () => {
    if (!materialData || !materialData.content) return;

    try {
      console.log("Sending request to /generate-question with content:", materialData.content); // 요청 내용 로그
      const response = await questionApi.post('/generate-question', { content: materialData.content });
      console.log("Response received:", response.data); // 응답 내용 로그
      setGeneratedQuestion(response.data.question);
    } catch (err) {
      console.error("질문 생성 중 오류가 발생했습니다:", err);
    }
  };

  if (loading) return <p><Loading /></p>;
  if (error) return <p>{error}</p>;

  return (
      <div className="material-detail-page">
        <h1>학습자료 상세</h1>
        {materialData ? (
            <div>
              <h2>제목: {materialData.title}</h2>
              {materialData.url && (
                  <div className="video-container">
                    {renderVideo(materialData.url)}
                  </div>
              )}
              <p>내용: {materialData.content}</p>

              <button onClick={handleGenerateQuestion}>학습자료 요약하기</button>

              {generatedQuestion && (
                  <div className="generated-question">
                    <h3>학습자료 Ai요약</h3>
                    <p>{generatedQuestion}</p>
                  </div>

              )}
            </div>
        ) : (
            <p>학습자료가 존재하지 않습니다.</p>
        )}
      </div>
  );
};

export default MaterialDetailStudentPage;
