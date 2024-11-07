import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { privateApi } from '../../api/axios.js';
import { useAuth } from '../../utils/AuthContext.jsx';
import Loading from '../common/Loading.jsx';
import 국어 from '../../assets/icon/subject/국어.png';
import 영어 from '../../assets/icon/subject/영어.png';
import 수학 from '../../assets/icon/subject/수학.png';
import 사회 from '../../assets/icon/subject/사회.png';
import 과학 from '../../assets/icon/subject/과학.png';
import 역사 from '../../assets/icon/subject/역사.png';
import 도덕 from '../../assets/icon/subject/도덕.png';

const CourseContainer = styled.div`
    margin: 60px auto 0; // auto로 중앙 정렬
    padding: 40px 80px; // 좌우 패딩 증가로 화면 끝과 간격 확보
    border: 1px solid #9b9b9b;
    border-radius: 15px;
    max-width: 1300px; // 최대 너비 설정
    width: 100%;
    box-sizing: border-box;
    position: relative; // 슬라이드 버튼의 기준점

    @media (min-width: 765px) {
        padding: 40px 80px;
    }
`;

const TitleWrapper = styled.div`
    margin-top: 12px;
    font-size: 16px;
    color: #333;
    text-align: center;
`;

const CourseListContainer = styled.div`
    position: relative;
    margin: 20px 0;
    width: 100%;

    @media (max-width: 765px) {
        overflow-x: auto; // 모바일에서는 스크롤 가능하도록
        -webkit-overflow-scrolling: touch;

        &::-webkit-scrollbar {
            display: none; // 스크롤바 숨김
        }
    }
`;

const CourseList = styled.div`
    display: flex;
    gap: 16px;
    overflow-x: hidden;
    scroll-behavior: smooth;
    padding: 10px 0;
    width: 100%;

    &:active {
        cursor: grabbing;
    }

    /* 드래그 시 텍스트 선택 방지 */
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;

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

    @media (max-width: 765px) {
        display: none; // 모바일에서는 버튼 숨김
    }

    &:hover {
        background: #f8f8f8;
    }

    &.prev {
        left: -20px; // 왼쪽 버튼 위치 조정

        @media (min-width: 1024px) {
            left: -60px;
        }
    }

    &.next {
        right: -20px; // 오른쪽 버튼 위치 조정

        @media (min-width: 1024px) {
            right: -60px;
        }
    }
`;

const CourseItem = styled.div`
    flex: 0 0 calc(100% - 32px); // 모바일에서는 1개씩
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    @media (min-width: 480px) {
        flex: 0 0 calc(50% - 24px); // 태블릿에서는 2개씩
    }

    @media (min-width: 765px) {
        flex: 0 0 calc(33.333% - 24px); // 작은 데스크톱에서는 3개씩
    }

    @media (min-width: 1024px) {
        flex: 0 0 calc(20% - 19.2px); // 큰 데스크톱에서는 5개씩
    }

    &:hover {
        transform: translateY(-4px);
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 120%; // 비율 조정 (1:1.2)
    border-radius: 12px;
    overflow: hidden;
    background: transparent;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);


    img {
        position: absolute;
        top: 50%; // 중앙 정렬을 위해 추가
        left: 50%; // 중앙 정렬을 위해 추가
        transform: translate(-50%, -50%); // 정중앙 배치
        width: 100%;
        height: 100%;
        object-fit: cover; // contain 대신 cover 사용
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

const initDragState = {
  isDragging : false,
  isMouseDown: false,
  startX     : 0,
  scrollLeft : 0
};

const CourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [dragState, setDragState] = useState(initDragState);


  const { userInfo, userRole } = useAuth?.() ?? {};
  const navigate = useNavigate();
  const listRef = useRef(null);

  /* 마우스 이벤트 핸들러 */
  const handleMouseDown = (e) => {
    e.preventDefault();

    if (!listRef.current) return;

    setDragState({
      isMouseDown: true,
      isDragging : false,
      startX     : e.pageX - listRef.current.offsetLeft,
      scrollLeft : listRef.current.scrollLeft
    });

  };

  const handleMouseUp = () => {
    setDragState(prev => ({
      ...prev,
      isMouseDown: false,
      isDragging : false
    }));
  };

  const handleMouseMove = (e) => {
    const { isMouseDown, startX, scrollLeft } = dragState;
    if (!isMouseDown || !listRef.current) return;

    e.preventDefault();
    setDragState(prev => ({ ...prev, isDragging: true }));

    const x = e.pageX - listRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    listRef.current.scrollLeft = scrollLeft - walk;
  };

  const updateButtonVisibility = () => {
    if (!listRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft + clientWidth < scrollWidth);

  };

  const handleSlide = (direction) => {
    if (!listRef.current) return;

    setDragState(prev => ({
      ...prev,
      isMouseDown: false,
      isDragging : false
    }));

    const scrollAmount = listRef.current.clientWidth;

    listRef.current.scrollTo({
      left    : listRef.current.scrollLeft + (direction === 'prev' ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });

  };

  const handleCourseClick = (e, courseId) => {
    if (dragState.isDragging) {
      e.preventDefault();
      return;
    }

    navigate(userRole === 'TE' ? `/course/${courseId}` : `/course0/${courseId}`);
  };

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
    const list = listRef.current;
    if (list) {
      list.addEventListener('scroll', updateButtonVisibility);
      return () => list.removeEventListener('scroll', updateButtonVisibility);
    }

  }, [courses]);

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

  if (!courses?.length) {
    return (<RegisterCourseWrapper>
      <RegisterCourseText>등록된 학습 과정이 없습니다.</RegisterCourseText>
      <RegisterCourseButton>
        {userRole === 'TE' ? (
          <Link to="/course/enroll">새 과정 등록하기</Link>
        ) : (
          ''
        )}
      </RegisterCourseButton>
    </RegisterCourseWrapper>);
  }

  const subjectImages = {
    '국어': 국어,
    '수학': 수학,
    '영어': 영어,
    '사회': 사회,
    '과학': 과학,
    '역사': 역사,
    '도덕': 도덕
  };

  return (
    <CourseContainer>
      <TitleWrapper>에듀튜터 학습 과정</TitleWrapper>
      <CourseListContainer>
        {showLeftButton && (
          <SlideButton
            className="prev"
            onClick={() => handleSlide('prev')}
            onMouseDown={e => e.stopPropagation()}
          >
            ←
          </SlideButton>
        )}
        <CourseList
          ref={listRef}
          onScroll={updateButtonVisibility}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {loading ? (
            <Loading />
          ) : (
            courses.map(course => (
              <CourseItem
                key={course.courseId}
                onClick={(e) => handleCourseClick(e, course.courseId)}
              >
                <ImageWrapper>
                  <img src={subjectImages[course.subject]} alt={course.courseName} />
                </ImageWrapper>
                <CourseTitle>{course.courseName}</CourseTitle>
              </CourseItem>
            ))
          )}
        </CourseList>
        {showRightButton && (
          <SlideButton
            className="next"
            onClick={() => handleSlide('next')}
            onMouseDown={e => e.stopPropagation()}
          >
            →
          </SlideButton>
        )}
      </CourseListContainer>
    </CourseContainer>
  );
};

export default CourseSection;
