import React, { useEffect, useState } from 'react';
import { publicApi } from '../../api/axios';
import '../../assets/css/CourseClassroomEnrollPage.css';
import { PiStudentLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const CourseClassroomEnrollPage = () => {
  const gradeLevels = ['초등학교', '중학교'];
  const years = ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년'];
  const semesters = ['1학기', '2학기'];
  const subjects = ['수학', '국어', '과학', '영어', '사회', '역사', '도덕'];

  const [selectedGradeLevel, setSelectedGradeLevel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await publicApi.get('/course/filtered', {
        params: {
          gradeLevel: selectedGradeLevel,
          year      : selectedYear,
          semester  : selectedSemester,
          subject   : selectedSubject
        }
      });
      setCourses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedGradeLevel || selectedYear || selectedSemester || selectedSubject) {
      fetchCourses();
    }
  }, [selectedGradeLevel, selectedYear, selectedSemester, selectedSubject]);

  const handleFilterClick = (filterType, value) => {
    switch (filterType) {
      case 'gradeLevel':
        setSelectedGradeLevel(value === selectedGradeLevel ? null : value);
        break;
      case 'year':
        setSelectedYear(value === selectedYear ? null : value);
        break;
      case 'semester':
        setSelectedSemester(value === selectedSemester ? null : value);
        break;
      case 'subject':
        setSelectedSubject(value === selectedSubject ? null : value);
        break;
      default:
        break;
    }
  };

  const handleEnrollCourse = async (courseId) => {
    try {
      const response = await publicApi.post('/course/enroll', null, {
        params: { courseId }
      });
      alert(response.data.message);
      window.history.back();
    } catch (error) {
      console.error('Error enrolling course:', error);
      alert('과정 등록에 실패했습니다.');
    }
  };

  return (
      <div className="course-filter-container">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2>학습 과정 필터링</h2>
          <Link to="/classroom">
            <PiStudentLight size={24} style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </Link>
        </div>
        <table className="filter-table">
          <thead>
          <tr>
            <th>학교급</th>
            <th>학년</th>
            <th>학기</th>
            <th>과목</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              {gradeLevels.map((level, index) => (
                  <button
                      key={`gradeLevel-${index}`}
                      className={selectedGradeLevel === level ? 'selected' : ''}
                      onClick={() => handleFilterClick('gradeLevel', level)}
                  >
                    {level}
                  </button>
              ))}
            </td>
            <td>
              {years.map((year, index) => (
                  <button
                      key={`year-${index}`}
                      className={selectedYear === year ? 'selected' : ''}
                      onClick={() => handleFilterClick('year', year)}
                  >
                    {year}
                  </button>
              ))}
            </td>
            <td>
              {semesters.map((semester, index) => (
                  <button
                      key={`semester-${index}`}
                      className={selectedSemester === semester ? 'selected' : ''}
                      onClick={() => handleFilterClick('semester', semester)}
                  >
                    {semester}
                  </button>
              ))}
            </td>
            <td>
              {subjects.map((subject, index) => (
                  <button
                      key={`subject-${index}`}
                      className={selectedSubject === subject ? 'selected' : ''}
                      onClick={() => handleFilterClick('subject', subject)}
                  >
                    {subject}
                  </button>
              ))}
            </td>
          </tr>
          </tbody>
        </table>

        <div className="course-list">
          {loading ? (
              <p>Loading...</p>
          ) : courses.length > 0 ? (
              courses.map(course => (
                  <div
                      key={course.courseId}
                      className="course-card"
                      onClick={() => handleEnrollCourse(course.courseId)}
                  >
                    <h3>{course.courseName}</h3>
                  </div>
              ))
          ) : (
              <p>해당 조건에 맞는 학습 과정이 없습니다.</p>
          )}
        </div>
      </div>
  );
};

export default CourseClassroomEnrollPage;
