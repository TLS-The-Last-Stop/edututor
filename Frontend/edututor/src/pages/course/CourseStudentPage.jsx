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

  const handleTestClick = (testPaperId, testPaperStatus) => {
    if (testPaperStatus === 1) {
      navigate(`/student/test/${testPaperId}`);
    }
  };

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
                            </div>

                            <div className="materials">
                              {unit.materials.map(material => (
                                  <div key={material.materialId} className="material-item">
                                  <span className="material-title">
                                    학습자료: {material.title}
                                  </span>
                                    <button
                                        className="material-btn"
                                        onClick={() => handleMaterialClick(material.materialId)}
                                    >
                                      보기
                                    </button>
                                  </div>
                              ))}
                            </div>

                            {unit.testPaper && (
                                <div className="testpaper">
                                  <span className="testpaper-title">시험지: {unit.testPaper.title}</span>
                                  <button
                                      className="testpaper-btn"
                                      onClick={() => handleTestClick(unit.testPaper.testPaperId, unit.testPaper.testPaperStatus)}
                                      disabled={unit.testPaper.testPaperStatus !== 1}
                                  >
                                    {unit.testPaper.testPaperStatus === 0 && "평가 전"}
                                    {unit.testPaper.testPaperStatus === 1 && "응시하기"}
                                    {unit.testPaper.testPaperStatus === 2 && "응시완료"}
                                  </button>
                                </div>
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
