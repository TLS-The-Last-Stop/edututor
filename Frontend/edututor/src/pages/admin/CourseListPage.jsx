import React, { useEffect, useState } from 'react';
import instance from "../../api/axios";

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await instance.get('/api/course');
      setCourses(response.data);
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
                {course.courseName} - {course.classroomName}
              </li>
          ))}
        </ul>
      </div>
  );
};

export default CourseListPage;
