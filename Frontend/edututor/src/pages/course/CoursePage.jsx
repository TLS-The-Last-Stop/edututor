import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/CoursePage.css';
import { publicApi } from '../../api/axios.js';
import ExamShareModal from '../../components/exam/ExamShareModal';
import MaterialPreviewModal from '../../components/material/MaterialPreviewModal.jsx';
import TestPreviewModal from '../../components/exam/TestPreviewModal';
import { StyledRouterLink } from '../../components/common/UserStyledComponents.js';
import { VscOpenPreview } from 'react-icons/vsc';
import { IoShareOutline } from 'react-icons/io5';
import { LuBookOpenCheck } from 'react-icons/lu';
import Loading from '../../components/common/Loading.jsx';

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
  const [openSections, setOpenSections] = useState({});

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
          const { data } = response.data;
          setCourseData(data);
          setLoading(false);
        })
        .catch(error => {
          setError('Failed to fetch course data.');
          setLoading(false);
        });
    }
  }, [courseId]);

  const handleCourseSelect = (id) => {
    if (courseId !== id) {
      navigate(`/course/${id}`);
    }
  };

  const toggleSection = (sectionId) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId]
    }));
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

  if (loading) return <div><Loading /></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="course-page">
      <div className="sidebar">
        <button className="new-course-btn" onClick={() => navigate('/course/enroll')}>새 과정 등록하기</button>
        <h3 style={{ textAlign: 'center' }}>등록된 과정 목록</h3>

        <ul>
          {courses.length > 0 ? (
            courses.map(course => (
              <li
                key={course.courseId}
                className={`course-item ${courseData?.courseId === course.courseId ? 'selected' : ''}`}
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
                <h3
                  className="section-header"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleSection(section.sectionId)}
                >
                  {sectionIndex + 1}. {section.content}
                </h3>

                <div
                  className={`section-content ${openSections[section.sectionId] ? 'open' : ''}`}
                  style={{
                    maxHeight : openSections[section.sectionId] ? '1000px' : '0',
                    overflow  : 'hidden',
                    transition: 'max-height 0.5s ease-in-out'
                  }}
                >
                  <div
                    className={`section-content ${openSections[section.sectionId] ? 'open' : ''}`}
                  >
                    <div className="section-content-inner">

                      {section.units.map((unit, unitIndex) => (
                        <div key={unit.unitId} className="unit">
                          <div className="unit-header">
                            <h4>{unitIndex + 1}. {unit.content}</h4>
                          </div>

                          <div className="actions">
                            <button
                              data-tooltip="형성평가 미리보기"
                              onClick={() => handleOpenTestPreview(unit.testPaper.testPaperId)}
                            >
                              <VscOpenPreview />
                            </button>

                            <button
                              data-tooltip="시험 공유하기"
                              onClick={() => {
                                setIsModalOpen(true);
                                setSelectedTest(unit.unitId);
                              }}
                            >
                              <IoShareOutline />
                            </button>

                            {unit.materials.map(material => (
                              <button
                                key={material.materialId}
                                data-tooltip="학습자료 미리보기"
                                onClick={() => handleOpenMaterialModal(material.materialId)}
                              >
                                <LuBookOpenCheck />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
