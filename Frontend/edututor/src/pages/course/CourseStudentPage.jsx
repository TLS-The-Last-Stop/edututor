import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/css/CoursePage.css';
import { publicApi } from '../../api/axios.js';
import ExamShareModal from '../../components/exam/ExamShareModal';

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCourseClick = (id) => {
    if (id) {
      navigate(`/course0/${id}`);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTestClick = (testPaperId) => {
    if (testPaperId) {
      navigate(`/student/test/${testPaperId}`);
    }
  };

  // 학습자료 클릭 시 해당 학습자료 상세 페이지로 이동
  const handleMaterialClick = (materialId) => {
    if (materialId) {
      navigate(`/student/material/${materialId}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="course-page">
        <div className="sidebar">
          <ul>
            {courses.map(course => (
                <li
                    key={course.courseId}
                    className="course-item"
                    onClick={() => handleCourseClick(course.courseId)}
                >
                  {course.courseName}
                </li>
            ))}
          </ul>
        </div>

        <div className="course-details">
          {courseData ? (
              <>
                <div className="course-header">
                  <h2>{courseData.courseName}</h2>
                </div>

                {courseData.sections.map(section => (
                    <div key={section.sectionId} className="section">
                      <h3>{section.content}</h3>

                      {section.units.map(unit => (
                          <div key={unit.unitId} className="unit">
                            <div className="unit-header">
                              <h4>{unit.content}</h4>
                              <div className="actions">
                                <button
                                    className="preview-btn"
                                    onClick={() => handleTestClick(unit.testPaper?.testPaperId)}
                                    disabled={!unit.testPaper}
                                >
                                  형성평가
                                </button>
                              </div>
                            </div>

                            <div className="materials">
                              {unit.materials.map(material => (
                                  <div key={material.materialId} className="material-item">
                                    <p
                                        onClick={() => handleMaterialClick(material.materialId)}
                                        className="material-link"
                                    >
                                      학습자료: {material.title}
                                    </p>
                                  </div>
                              ))}
                            </div>

                            {unit.testPaper ? (
                                <div className="testpaper">
                                  <p>시험지: {unit.testPaper.title}</p>
                                </div>
                            ) : (
                                <p>시험지가 없습니다.</p>
                            )}
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
            onClose={handleCloseModal}
            setSelectedTest={() => console.log("선택된 시험")}
        />
      </div>
  );
};

export default CoursePage;
