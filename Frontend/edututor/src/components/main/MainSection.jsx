import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicApi } from "../../api/axios.js";

const FirstSection = styled.section`
    margin: 0 auto;
    padding: 40px 20px;
    border: 1px solid #9b9b9b;
    border-radius: 15px;
    max-width: 1300px;
    width: 100%;
    background: khaki;
    height: 550px;
`;

const FirstSectionInner = styled.article``;

const TitleWrapper = styled.div`
    font-size: 22px;
    font-weight: 700;
`;

const CourseList = styled.div`
    margin-top: 20px;
`;

const CourseItem = styled.div`
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    border-radius: 5px;
    background: #fff;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }
`;

const gradeData = {
  elementary: { label: '초등', grades: ['전체', '초1', '초2', '초3', '초4', '초5', '초6'] },
  middle: { label: '중등', grades: ['전체', '중1', '중2', '중3'] },
  high: { label: '고등', grades: ['전체', '고1', '고2', '고3'] },
};

const MainSection = () => {
  const [activeTab, setActiveTab] = useState('elementary');
  const [activeGrade, setActiveGrade] = useState('전체');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFilteredCourses = async () => {
    setLoading(true);
    try {
      const response = await publicApi.get('/course/class-courses');
      setCourses(response.data.data);
    } catch (error) {
      console.error("과정을 불러오는데 실패했습니다 : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredCourses();
  }, [activeTab, activeGrade]);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
      <>
        <FirstSection>
          <FirstSectionInner>
            <TitleWrapper>지니아튜터 학습 과정</TitleWrapper>
            <CourseList>
              {loading ? (
                  <p>Loading...</p>
              ) : (
                  courses.map(course => (
                      <CourseItem key={course.courseId} onClick={() => handleCourseClick(course.courseId)}>
                        {course.courseName}
                      </CourseItem>
                  ))
              )}
            </CourseList>
          </FirstSectionInner>
        </FirstSection>
      </>
  );
};

export default MainSection;
