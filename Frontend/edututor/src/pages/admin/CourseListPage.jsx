import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '../../api/axios';
import '../../assets/css/CourseListPage.css';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await publicApi.get('/course');
      setCourses(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

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
            <Link to={`/admin/course-detail/${course.courseId}`}>{course.courseName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseListPage;
