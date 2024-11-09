import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { privateApi } from '../../api/axios.js';
import { useAuth } from '../../utils/AuthContext.jsx';
import Loading from '../common/Loading.jsx';
import { StyledRouterLink } from '../common/UserStyledComponents.js';
import 국어 from '../../assets/icon/subject/국어.png';
import 영어 from '../../assets/icon/subject/영어.png';
import 수학 from '../../assets/icon/subject/수학.png';
import 사회 from '../../assets/icon/subject/사회.png';
import 과학 from '../../assets/icon/subject/과학.png';
import 역사 from '../../assets/icon/subject/역사.png';
import 도덕 from '../../assets/icon/subject/도덕.png';

const CourseContainer = styled.div`
    margin: 60px auto 0;
    padding: 40px 80px;
    border: 1px solid #9b9b9b;
    border-radius: 15px;
    max-width: 1300px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
`;

const TitleWrapper = styled.div`
    margin-top: 12px;
    font-size: 35px;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

const SubjectFilterContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
`;

const SubjectButton = styled.button`
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background-color: ${({ active }) => (active ? '#007bff' : '#e0e0e0')};
    color: ${({ active }) => (active ? 'white' : '#333')};
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #007bff;
        color: white;
    }
`;

const CourseListContainer = styled.div`
    position: relative;
    margin: 20px 0;
    width: 100%;
`;

const CourseList = styled.div`
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 10px 0;
    width: 100%;
    user-select: none;

    &::-webkit-scrollbar {
        display: none;
    }

    &:active {
        cursor: grabbing;
    }
`;

const SlideButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: 1px solid #eaeaea;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        display: none;
    }

    &:hover {
        background: #f8f8f8;
    }
`;

const CourseItem = styled.div`
    flex: 0 0 calc(100% - 32px);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    @media (min-width: 480px) {
        flex: 0 0 calc(50% - 24px);
    }

    @media (min-width: 768px) {
        flex: 0 0 calc(33.333% - 24px);
    }

    @media (min-width: 1024px) {
        flex: 0 0 calc(20% - 19.2px);
    }

    &:hover {
        transform: translateY(-4px);
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 120%;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const CourseTitle = styled.h3`
    margin-top: 12px;
    font-size: 16px;
    color: #333;
    text-align: center;
`;

const RegisterCourseWrapper = styled.div`
    border: 1px solid #9b9b9b;
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
    height: 150px;
    padding: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const LoginMessage = styled.div`
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #666;
`;

const LoginButton = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
`;

const CourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("전체");
  const listRef = useRef(null);
  const navigate = useNavigate();
  const { userInfo, userRole } = useAuth();
  const subjectImages = { 국어, 수학, 영어, 사회, 과학, 역사, 도덕 };
  const subjectFilters = ["전체", "국어", "수학", "영어", "사회", "과학", "역사", "도덕"];

  const handleSubjectFilter = (subject) => {
    setSelectedSubject(subject);
    setFilteredCourses(subject === "전체" ? courses : courses.filter(course => course.subject === subject));
  };

  const handleCourseClick = (courseId) => {
    const coursePath = userRole === 'TE' ? `/course/${courseId}` : `/course0/${courseId}`;
    navigate(coursePath);
  };

  const fetchFilteredCourses = async () => {
    setLoading(true);
    try {
      const response = await privateApi.get('/course/class-courses');
      setCourses(response.data.data);
      setFilteredCourses(response.data.data);
    } catch (error) {
      console.error('과정을 불러오는데 실패했습니다 : ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userRole) fetchFilteredCourses();
  }, [userInfo, userRole]);

  if (!userInfo) {
    return (
        <LoginMessage>
          <p>에듀튜터의 학습 과정을 보시려면 로그인이 필요합니다.</p>
          <LoginButton onClick={() => navigate('/login')}>로그인 하기</LoginButton>
        </LoginMessage>
    );
  }

  return (
      <CourseContainer>
        <TitleWrapper>우리반 학습 과정</TitleWrapper>
        <SubjectFilterContainer>
          {subjectFilters.map(subject => (
              <SubjectButton
                  key={subject}
                  active={selectedSubject === subject}
                  onClick={() => handleSubjectFilter(subject)}
              >
                {subject}
              </SubjectButton>
          ))}
        </SubjectFilterContainer>

        <CourseListContainer>
          {loading ? (
              <Loading />
          ) : (
              <CourseList ref={listRef}>
                {filteredCourses.map(course => (
                    <CourseItem key={course.courseId} onClick={() => handleCourseClick(course.courseId)}>
                      <ImageWrapper>
                        <img src={subjectImages[course.subject]} alt={course.courseName} />
                      </ImageWrapper>
                      <CourseTitle>{course.courseName}</CourseTitle>
                    </CourseItem>
                ))}
              </CourseList>
          )}
        </CourseListContainer>
      </CourseContainer>
  );
};

export default CourseSection;
