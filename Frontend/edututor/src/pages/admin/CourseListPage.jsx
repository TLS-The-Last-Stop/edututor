import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';  // axios 인스턴스를 가져옵니다.

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/course');  // API 호출
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
      <div>
        <h1>모든 과정 리스트</h1>
        <ul>
          {courses.map(course => (
              <li key={course.courseId}>
                {course.courseName} - {course.classroomName}
              </li>
          ))}
        </ul>
      </div>
  );
};

export default CourseListPage;
