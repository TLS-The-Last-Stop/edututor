import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../../assets/css/CoursePage.css';
import {publicApi} from '../../api/axios.js';
import ExamShareModal from '../../components/exam/ExamShareModal';
import Loading from '../../components/common/Loading.jsx';
import {LuBookOpenCheck} from "react-icons/lu";
import {TbChecks, TbClockHour4, TbWriting} from "react-icons/tb";
import styled from "styled-components";

const SectionContent = styled.div`
    max-height: ${props => props.isOpen ? '500px' : '0'};
    overflow: auto;
    transition: max-height 0.5s ease-in-out;
    -ms-overflow-style: none; // IE, Edge 스크롤바 숨기기
    scrollbar-width: none; // Firefox 스크롤바 숨기기

    &::-webkit-scrollbar { // Chrome, Safari 스크롤바 숨기기
        display: none;
    }
`;

const TooltipButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin: 0;
    padding: 8px;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? 0.7 : 1};
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background-color: #f7fafc;
        border-color: #4299e1;
        color: #4299e1;
    }

    &::before {
        content: "${props => props.tooltip}";
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.5rem 0.75rem;
        background-color: #2d3748;
        color: white;
        font-size: 0.75rem;
        white-space: nowrap;
        border-radius: 4px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease, visibility 0.2s ease;
        pointer-events: none;
        z-index: 1000;
    }

    &::after {
        content: '';
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #2d3748;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease, visibility 0.2s ease;
        pointer-events: none;
        z-index: 1000;
    }

    &:hover::before,
    &:hover::after {
        opacity: 1;
        visibility: visible;
    }
`

const CoursePage = () => {
  const {courseId} = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const toggleSection = (sectionId) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId]
    }));
  };

  if (loading) return <div><Loading/></div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="course-page">
        <div className="sidebar">
          <h3>등록된 과정 목록</h3>
          <ul>
            {courses.map(course => (
                <li
                    key={course.courseId}
                    className={`course-item ${courseData?.courseId === course.courseId ? 'selected' : ''}`}
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

                {courseData.sections.map((section, sectionIndex) => (
                    <div key={section.sectionId} className="section">
                      <h3
                          className="section-header"
                          style={{cursor: 'pointer'}}
                          onClick={() => toggleSection(section.sectionId)}
                      >
                        {sectionIndex + 1}. {section.content}
                      </h3>

                      <SectionContent isOpen={openSections[section.sectionId]}>
                        {section.units.map((unit, unitIndex) => (
                            <div key={unit.unitId} className="unit" style={{display: 'block'}}>
                              {/* 제목 영역 */}
                              <div style={{marginBottom: '16px'}}>
                                <h4 style={{color: '#4285f4', margin: '0'}}>
                                  {sectionIndex + 1}.{unitIndex + 1} {unit.content}
                                </h4>
                              </div>

                              {/* 학습자료와 시험지 콘텐츠 영역 */}
                              <div style={{paddingLeft: '20px'}}> {/* 들여쓰기를 주기 위한 padding */}
                                {/* 학습자료 영역 */}
                                {unit.materials.map(material => (
                                    <div key={material.materialId} style={{
                                      display        : 'flex',
                                      justifyContent : 'space-between',
                                      alignItems     : 'center',
                                      padding        : '8px 12px',
                                      marginBottom   : '8px',
                                      backgroundColor: '#f8f9fa',
                                      borderRadius   : '4px'
                                    }}>
                                      <span>학습자료: {material.title}</span>
                                      <TooltipButton
                                          onClick={() => handleMaterialClick(material.materialId)}
                                          tooltip="학습자료 보기"
                                      >
                                        <LuBookOpenCheck size={17}/>
                                      </TooltipButton>
                                    </div>
                                ))}

                                {/* 시험지 영역 */}
                                {unit.testPaper && (
                                    <div style={{
                                      display        : 'flex',
                                      justifyContent : 'space-between',
                                      alignItems     : 'center',
                                      padding        : '8px 12px',
                                      backgroundColor: '#f8f9fa',
                                      borderRadius   : '4px'
                                    }}>
                                      <span>시험지: {unit.testPaper.title}</span>
                                      <TooltipButton
                                          onClick={() => handleTestClick(unit.testPaper.testPaperId, unit.testPaper.testPaperStatus)}
                                          disabled={unit.testPaper.testPaperStatus !== 1}
                                          tooltip={
                                            unit.testPaper.testPaperStatus === 0 ? '평가 전' :
                                                unit.testPaper.testPaperStatus === 1 ? '응시하기' :
                                                    '응시완료'
                                          }
                                      >
                                        {unit.testPaper.testPaperStatus === 0 && <TbClockHour4 size={17}/>}
                                        {unit.testPaper.testPaperStatus === 1 && <TbWriting size={17}/>}
                                        {unit.testPaper.testPaperStatus === 2 && <TbChecks size={17}/>}
                                      </TooltipButton>
                                    </div>
                                )}
                              </div>
                            </div>
                        ))}
                      </SectionContent>
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
            setSelectedTest={() => console.log('선택된 시험')}
        />
      </div>
  );
};

export default CoursePage;
