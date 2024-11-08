import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { privateApi } from '../../api/axios';
import '../../assets/css/CourseListPage.css';
import Loading from '../../components/common/Loading.jsx';

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
    return <div className="loading"><Loading /></div>;
  }

  if (error) {
    return <div className="error-message">Error occurred: {error.message}</div>;
  }

  return (
    <div className="course-list-page">
      <h1 className="page-title">전체 과정 리스트</h1>
      <table className="course-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>과정명</th>
        </tr>
        </thead>
        <tbody>
        {courses.map((course) => (
          <tr key={course.courseId}>
            <td>{course.courseId}</td>
            <td>
              <Link to={`/admin/course-detail/${course.courseId}`} className="course-link">
                {course.courseName}
              </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseListPage;
