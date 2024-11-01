import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {publicApi} from '../../api/axios';
import '../../assets/css/CourseDetailPage.css';

const CourseDetailPage = () => {
  const {courseId} = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    publicApi.get(`/course/${courseId}`)
        .then((response) => {
          setCourseData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('데이터를 가져오는 데 실패했습니다.');
          setLoading(false);
        });
  }, [courseId]);

  const registerMaterial = (unitId) => {
    navigate(`/admin/create-material?unitId=${unitId}`);
  };

  const viewMaterial = (materialId) => {
    navigate(`/admin/materials/${materialId}`);
  };

  const registerTestPaper = (unitId) => {
    navigate(`/admin/create-test-paper?unitId=${unitId}`);
  };

  const viewTestPaper = (testPaper) => {
    if (testPaper && (testPaper.id || testPaper.testPaperId)) {
      const testPaperId = testPaper.id || testPaper.testPaperId;
      navigate(`/admin/test-paper-detail/${testPaperId}`);
    } else {
      alert('시험지 ID가 존재하지 않습니다.');
    }
  };

  const goToEditPage = () => {
    navigate(`/admin/course/edit/${courseId}`);
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
                                      unit.materials.map((material) => (
                                          <button
                                              key={material.materialId}
                                              onClick={() => viewMaterial(material.materialId)}
                                              className="view-button"
                                          >
                                            학습자료 보기
                                          </button>
                                      ))
                                  ) : (
                                      <button onClick={() => registerMaterial(unit.unitId)} className="add-button">
                                        학습자료 등록
                                      </button>
                                  )}

                                  {/* 시험지 처리 */}
                                  {unit.testPaper ? (
                                      <button onClick={() => viewTestPaper(unit.testPaper)} className="view-button">
                                        시험지 보기
                                      </button>
                                  ) : (
                                      <button onClick={() => registerTestPaper(unit.unitId)} className="add-button">
                                        시험지 등록
                                      </button>
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
              <button onClick={goToEditPage} className="edit-button">수정하기</button>

            </div>
        )}
      </div>
  );
};

export default CourseDetailPage;
