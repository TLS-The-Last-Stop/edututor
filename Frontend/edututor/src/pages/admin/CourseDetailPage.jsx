import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import axios from '../../api/axios';
import '../../assets/css/CourseDetailPage.css'; // 스타일 추가

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 추가

  useEffect(() => {
    axios.get(`/api/course/${courseId}`)
        .then((response) => {
          setCourseData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('데이터를 가져오는 데 실패했습니다.');
          setLoading(false);
        });
  }, [courseId]);

  // 학습자료 등록 페이지로 이동
  const registerMaterial = (unitId) => {
    navigate(`/admin/create-material?unitId=${unitId}`); // unitId를 쿼리 파라미터로 전달
  };

  // 학습자료 보기 페이지로 이동
  const viewMaterial = (unitId) => {
    navigate(`/admin/materials/${unitId}`); // 예: 학습자료 보기 페이지로 이동할 경로
  };

  // 시험지 등록 페이지로 이동
  const registerTestPaper = (unitId) => {
    navigate(`/admin/create-test-paper?unitId=${unitId}`); // unitId를 쿼리 파라미터로 전달
  };

  // 시험지 보기 페이지로 이동
  const viewTestPaper = (unitId) => {
    navigate(`/admin/test-papers/${unitId}`); // 예: 시험지 보기 페이지로 이동할 경로
  };

  const goToEditPage = () => {
    navigate(`/course/edit/${courseId}`); // 수정 페이지로 이동
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div className="course-detail-page">
        <h1>과정 상세</h1>
        {courseData && (
            <div>
              <h2>과정 ID: {courseData.courseId}</h2>
              <h3>과정명 : {courseData.courseName || 'N/A'}</h3>

              {/* 수정하기 버튼 추가 */}
              <button onClick={goToEditPage} className="edit-button">수정하기</button>

              {/* 단원 및 차수 정보 */}
              {courseData.sections.length > 0 ? (
                  courseData.sections.map((section) => (
                      <div key={section.sectionId} className="section">
                        <h4>단원 ID: {section.sectionId}</h4>
                        <p>단원명: {section.content}</p>

                        {section.units.length > 0 ? (
                            section.units.map((unit) => (
                                <div key={unit.unitId} className="unit">
                                  <h5>차수 ID: {unit.unitId}</h5>
                                  <p>차수 명: {unit.content}</p>

                                  {/* 학습자료 처리 */}
                                  {unit.materials.length > 0 ? (
                                      <button onClick={() => viewMaterial(unit.unitId)} className="view-button">학습자료 보기</button>
                                  ) : (
                                      <button onClick={() => registerMaterial(unit.unitId)} className="add-button">학습자료 등록</button>
                                  )}

                                  {/* 시험지 처리 */}
                                  {unit.testPaper ? (
                                      <button onClick={() => viewTestPaper(unit.unitId)} className="view-button">시험지 보기</button>
                                  ) : (
                                      <button onClick={() => registerTestPaper(unit.unitId)} className="add-button">시험지 등록</button>
                                  )}
                                </div>
                            ))
                        ) : (
                            <p className="no-data">차수 없음</p>
                        )}
                      </div>
                  ))
              ) : (
                  <p className="no-data">단원이 없음</p>
              )}
            </div>
        )}
      </div>
  );
};

export default CourseDetailPage;
