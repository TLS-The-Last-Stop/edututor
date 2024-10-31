import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { privateApi } from '../../api/axios';
import '../../assets/css/CourseListPage.css';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await privateApi.get('/course');
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
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error occurred: {error.message}</div>;
  }

  return (
    <div className="course-list-page">
      <h1 className="page-title">모든 과정 리스트</h1>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.courseId} className="course-card">
            <Link to={`/admin/course-detail/${course.courseId}`} className="course-link">
              {course.courseName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseListPage;
