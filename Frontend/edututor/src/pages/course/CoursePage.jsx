import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/css/CoursePage.css';
import { publicApi } from '../../api/axios.js';
import ExamShareModal from '../../components/exam/ExamShareModal';

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // 전체 코스 목록
  const [courseData, setCourseData] = useState(null); // 선택된 코스의 상세 정보
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setSelectedTest, setSetSelectedTest] = useState('');

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

  // 선택된 코스의 상세 정보를 가져오는 useEffect
  useEffect(() => {
    if (courseId) { // courseId가 있을 때만 API 호출
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

  // 새 과정 등록 페이지로 이동하는 함수
  const handleEnrollClick = () => {
    navigate('/course/enroll');
  };

  // 특정 코스 클릭 시 해당 코스 페이지로 이동
  const handleCourseClick = (id) => {
    if (id) {
      navigate(`/course/${id}`);
    }
  };

  // 모달 열기 핸들러
  const handleOpenModal = (unitPk) => {
    setIsModalOpen(true);
    setSetSelectedTest(unitPk);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="course-page">
      <div className="sidebar">
        <button className="new-course-btn" onClick={handleEnrollClick}>새 과정 등록하기</button>
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

      {/* 선택된 코스의 상세 정보 */}
      <div className="course-details">
        {courseData ? (
          <>
            <div className="course-header">
              <h2>{courseData.courseName}</h2>
              <div className="students-icon">
                <span>학생 관리</span>
              </div>
            </div>

            {courseData.sections.map(section => (
              <div key={section.sectionId} className="section"> {/* 고유 key 추가 */}
                <h3>{section.content}</h3>

                {section.units.map(unit => (
                  <div key={unit.unitId} className="unit"> {/* 고유 key 추가 */}
                    <div className="unit-header">
                      <h4>{unit.content}</h4>
                      <div className="actions">
                        <button className="preview-btn">형성평가 미리보기</button>
                        <button className="share-btn" onClick={() => handleOpenModal(unit.unitId)}>시험 공유하기</button>
                        <button className="material-btn">학습자료 미리보기</button>
                      </div>
                    </div>

                    <div className="materials">
                      {unit.materials.map(material => (
                        <div key={material.materialId} className="material-item"> {/* 고유 key 추가 */}
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
          </>
        ) : (
          <p>코스를 선택하세요.</p>
        )}
      </div>

      {/* 모달 컴포넌트 */}
      <ExamShareModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        setSelectedTest={setSelectedTest}
      />
    </div>
  );
};

export default CoursePage;
