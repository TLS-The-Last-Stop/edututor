import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/css/CoursePage.css';
import { publicApi } from '../../api/axios.js';
import ExamShareModal from '../../components/exam/ExamShareModal';

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    publicApi.get(`/course/${courseId}`)
        .then(response => {
          setCourseData(response.data.data);
          setLoading(false);
        })
        .catch(error => {
          setError('Failed to fetch course data.');
          setLoading(false);
        });
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleEnrollClick = () => {
    navigate('/course/enroll');
  };

  // 모달 열기 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
      <div className="course-page">
        <div className="sidebar">
          <button className="new-course-btn" onClick={handleEnrollClick}>새 과정 등록하기</button>
          <ul>
            <li className="current-course">{courseData.courseName}</li>
          </ul>
        </div>

        <div className="course-details">
          <div className="course-header">
            <h2>{courseData.courseName}</h2>
            <div className="students-icon">
              <span>학생 관리</span>
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
                          <button className="share-btn" onClick={handleOpenModal}>시험 공유하기</button> {/* 모달 열기 버튼 */}
                          <button className="material-btn">학습자료 미리보기</button>
                        </div>
                      </div>

                      <div className="materials">
                        {unit.materials.map(material => (
                            <div key={material.materialId} className="material-item">
                              <p>학습자료: {material.title}</p>
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
        </div>

        {/* 모달 컴포넌트 */}
        <ExamShareModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            setSelectedTest={() => console.log("선택된 시험")}
        />
      </div>
  );
};

export default CoursePage;
