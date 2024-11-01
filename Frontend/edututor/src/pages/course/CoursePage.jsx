import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/CoursePage.css';
import { publicApi } from '../../api/axios.js';
import ExamShareModal from '../../components/exam/ExamShareModal';
import MaterialPreviewModal from '../../components/material/MaterialPreviewModal.jsx';
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
            {courses.map(course => (
                <li
                    key={course.courseId}
                    className="course-item"
                    onClick={() => navigate(`/course/${course.courseId}`)}
                >
                  {course.courseName}
                </li>
            ))}
          </ul>
        </div>

      {/* 선택된 코스의 상세 정보 */}
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

                {courseData.sections.map(section => (
                    <div key={section.sectionId} className="section">
                      <h3>{section.content}</h3>

                      {section.units.map(unit => (
                          <div key={unit.unitId} className="unit">
                            <div className="unit-header">
                              <h4>{unit.content}</h4>
                              <div className="actions">
                                <button className="preview-btn">형성평가 미리보기</button>
                                <button className="share-btn" onClick={() => setIsModalOpen(true)}>시험 공유하기</button>

                                {/* materials 배열을 순회하여 학습자료 미리보기 버튼 생성 */}
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
                          </div>
                      ))}
                    </div>
                ))}
              </>
          ) : (
              <p>코스를 선택하세요.</p>
          )}
        </div>

        <ExamShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedTest={selectedTest} />

        <MaterialPreviewModal
            isOpen={isMaterialModalOpen}
            onClose={handleCloseMaterialModal}
            material={materialPreview}
        />
      </div>
  );
};

export default CoursePage;
