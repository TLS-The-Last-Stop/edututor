import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { privateApi, publicApi } from '../../api/axios.js';
import { useAuth } from '../../utils/AuthContext.jsx';
import Loading from '../common/Loading.jsx';
import 수학 from '../../assets/icon/수학.jpg';

const CourseContainer = styled.div`
    margin: 60px 0 0;
    padding: 40px 20px;
    border: 1px solid #9b9b9b;
    border-radius: 15px;
    max-width: 1300px;
    width: 100%;
    box-sizing: border-box;
`;

const TitleWrapper = styled.div`
    margin-top: 12px;
    font-size: 16px;
    color: #333;
    text-align: center;
`;

const CourseList = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); // 반응형 그리드
    gap: 24px; // 카드 간 간격
`;

const CourseItem = styled.div`
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: translateY(-4px);
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 140%;
    border-radius: 12px;
    overflow: hidden;
    background: #f8f8f8; // 배경색을 이미지에 맞게 조정
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 0; // 패딩 제거
        background: transparent; // 이미지 배경 투명하게
    }

    .magnify {
        position: absolute;
        bottom: 8px;
        right: 8px;
        width: 24px;
        height: 24px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1; // 돋보기 아이콘이 항상 위에 보이도록
    }
`;

const CourseTitle = styled.h3`
    margin-top: 12px;
    font-size: 16px;
    color: #333;
    text-align: center;
`;

const RegisterCourseContainer = styled.div`
    margin: 60px 0 0;
    padding: 40px 20px;
    border: 1px solid #9b9b9b;
    border-radius: 15px;
    max-width: 1300px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`;

const RegisterCourseWrapper = styled.div`
    border: 1px solid #9b9b9b;
    max-width: 300px;
    width: 100%;
    height: 150px;
    padding: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;

const RegisterCourseText = styled.p`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
`;

const RegisterCourseButton = styled.button`
    max-width: 400px;
    width: 100%;
    font-size: 20px;
    font-weight: bold;
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
  const [loading, setLoading] = useState(true);

  const { userInfo, userRole } = useAuth();

  const navigate = useNavigate();

  const fetchFilteredCourses = async () => {
    setLoading(true);
    try {
      const response = await privateApi.get('/course/class-courses');
      setCourses(response.data.data);
    } catch (error) {
      console.error('과정을 불러오는데 실패했습니다 : ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userRole)
      fetchFilteredCourses();
  }, [userInfo, userRole]);

  const handleTeacherCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleStudentCourseClick = (courseId) => {
    navigate(`/course0/${courseId}`);
  };

  if (!userInfo || !userInfo) {
    return (
      <CourseContainer>
        <LoginMessage>
          <p>에듀튜터의 학습 과정을 보시려면 로그인이 필요합니다.</p>
          <LoginButton onClick={() => navigate('/login')}>로그인 하기</LoginButton>
        </LoginMessage>
      </CourseContainer>
    );
  }
  if (courses.length === 0 && userRole === 'TE') return (
    <RegisterCourseContainer>
      <RegisterCourseWrapper>
        <RegisterCourseText>등록된 학습 과정이 없습니다.</RegisterCourseText>
        <RegisterCourseButton>
          <Link to="/course/enroll">
            새 과정 등록하기
          </Link>
        </RegisterCourseButton>
      </RegisterCourseWrapper>
    </RegisterCourseContainer>
  );


  return (
    <>
      <CourseContainer>
        <TitleWrapper>에듀튜터 학습 과정</TitleWrapper>
        <CourseList>
          {loading ? (
            <Loading />
          ) : (
            courses.map(course => (
              <CourseItem key={course.courseId}
                          onClick={() => handleTeacherCourseClick(course.courseId)}>
                <ImageWrapper>
                  <img src={수학} alt={course.courseName} />
                  <div className="magnify">
                    🔍
                  </div>
                </ImageWrapper>
                <CourseTitle>{course.courseName}</CourseTitle>
              </CourseItem>
            ))
          )}
        </CourseList>
      </CourseContainer>
    </>
  );
};

export default CourseSection;
