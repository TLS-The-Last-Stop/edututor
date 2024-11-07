import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/CoursePage.css';
import { publicApi } from '../../api/axios.js';
import ExamShareModal from '../../components/exam/ExamShareModal';
import MaterialPreviewModal from '../../components/material/MaterialPreviewModal.jsx';
import TestPreviewModal from '../../components/exam/TestPreviewModal';
import { StyledRouterLink } from '../../components/common/UserStyledComponents.js';

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState('');
  const [materialPreview, setMaterialPreview] = useState(null);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [testPreview, setTestPreview] = useState(null);
  const [isTestPreviewModalOpen, setIsTestPreviewModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null); // 선택된 과정 ID 상태 추가

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await publicApi.get('/course/class-courses');
        setCourses(response.data.data);
      } catch (error) {
        setError('Failed to fetch course list.');
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (courseId) {
      setSelectedCourseId(courseId);
      setLoading(true);
      publicApi.get(`/course/${courseId}`)
          .then(response => {
            setCourseData(response.data.data);
            setLoading(false);
          })
          .catch(error => {
            setError('Failed to fetch course data.');
            setLoading(false);
          });
    }
  }, [courseId]);

  const handleCourseSelect = (id) => {
    if (selectedCourseId !== id) {
      setSelectedCourseId(id);
      navigate(`/course/${id}`);
    }
  };

  const handleOpenTestPreview = async (testPaperId) => {
    try {
      const response = await publicApi.get(`/test-paper/${testPaperId}`);
      setTestPreview(response.data.data);
      setIsTestPreviewModalOpen(true);
    } catch (error) {
      setError('Failed to fetch test preview data.');
    }
  };

  const handleCloseTestPreviewModal = () => {
    setIsTestPreviewModalOpen(false);
    setTestPreview(null);
  };

  const handleOpenMaterialModal = async (materialId) => {
    try {
      const response = await publicApi.get(`/material/${materialId}`);
      setMaterialPreview(response.data.data);
      setIsMaterialModalOpen(true);
    } catch (error) {
      setError('Failed to fetch material data.');
    }
  };

  const handleCloseMaterialModal = () => {
    setIsMaterialModalOpen(false);
    setMaterialPreview(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="course-page">
        <div className="sidebar">
          <button className="new-course-btn" onClick={() => navigate('/course/enroll')}>새 과정 등록하기</button>
          <ul>
            {courses.length > 0 ? (
                courses.map(course => (
                    <li
                        key={course.courseId}
                        className={`course-item ${selectedCourseId === course.courseId ? 'selected' : ''}`}
                        onClick={() => handleCourseSelect(course.courseId)}
                    >
                      {course.courseName}
                    </li>
                ))
            ) : (
                <li className="no-courses">등록된 과정이 없습니다</li>
            )}
          </ul>
        </div>

        <div className="course-details">
          {courseData ? (
              <>
                <div className="course-header">
                  <h2>{courseData.courseName}</h2>
                  <div className="students-icon">
                    <StyledRouterLink to="/classroom">
                      <span>학생 관리</span>
                    </StyledRouterLink>
                  </div>
                </div>

                {courseData.sections.map((section, sectionIndex) => (
                    <div key={section.sectionId} className="section">
                      <h3>{sectionIndex + 1}. {section.content}</h3> {/* 섹션 번호 추가 */}

                      {section.units.map((unit, unitIndex) => (
                          <div key={unit.unitId} className="unit">
                            <div className="unit-header">
                              <h4>{unitIndex + 1}. {unit.content}</h4> {/* 유닛 번호 추가 */}
                            </div>

                            <div className="actions"> {/* 버튼을 unit-header 바깥으로 이동 */}
                              <button
                                  className="preview-btn"
                                  onClick={() => handleOpenTestPreview(unit.testPaper.testPaperId)}
                              >
                                형성평가 미리보기
                              </button>
                              <button className="share-btn" onClick={() => {
                                setIsModalOpen(true);
                                setSelectedTest(unit.unitId);
                              }}>시험 공유하기</button>

                              {unit.materials.map(material => (
                                  <div key={material.materialId}>
                                    <button
                                        className="material-btn"
                                        onClick={() => handleOpenMaterialModal(material.materialId)}
                                    >
                                      학습자료 미리보기
                                    </button>
                                  </div>
                              ))}
                            </div>
                          </div>
                      ))}
                    </div>
                ))}

              </>
          ) : (
              <p>코스를 선택하세요.</p>
          )}
        </div>

        <ExamShareModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedTest={selectedTest}
        />

        <MaterialPreviewModal
            isOpen={isMaterialModalOpen}
            onClose={handleCloseMaterialModal}
            material={materialPreview}
        />

        <TestPreviewModal
            isOpen={isTestPreviewModalOpen}
            onClose={handleCloseTestPreviewModal}
            testData={testPreview}
        />
      </div>
  );
};

export default CoursePage;
