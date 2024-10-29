import React, { useEffect, useState } from 'react';
import { publicApi } from '../../api/axios';
import '../../assets/css/CourseFilterPage.css';

const CourseFilterPage = () => {
  const gradeLevels = ['초등학교', '중학교'];
  const years = ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년'];
  const semesters = ['1학기', '2학기', '구분없음'];
  const subjects = ['수학', '국어', '과학', '영어', '사회', '역사', '도덕'];

  const [selectedGradeLevel, setSelectedGradeLevel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchCourses();
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="course-filter-container">
      <h2>학습 과정 필터링</h2>

      <div className="filters">
        <div className="filter-group">
          <span>학교급: </span>
          {gradeLevels.map((level, index) => (
            <button
              key={`gradeLevel-${index}`} // 고유한 key 속성
              className={selectedGradeLevel === level ? 'selected' : ''}
              onClick={() => handleFilterClick('gradeLevel', level)}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span>학년: </span>
          {years.map((year, index) => (
            <button
              key={`year-${index}`} // 고유한 key 속성
              className={selectedYear === year ? 'selected' : ''}
              onClick={() => handleFilterClick('year', year)}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span>학기: </span>
          {semesters.map((semester, index) => (
            <button
              key={`semester-${index}`} // 고유한 key 속성
              className={selectedSemester === semester ? 'selected' : ''}
              onClick={() => handleFilterClick('semester', semester)}
            >
              {semester}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span>과목: </span>
          {subjects.map((subject, index) => (
            <button
              key={`subject-${index}`} // 고유한 key 속성
              className={selectedSubject === subject ? 'selected' : ''}
              onClick={() => handleFilterClick('subject', subject)}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      <div className="course-list">
        {courses && courses.length > 0 ? (
          courses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.courseName}</h3>
              <p>{course.description}</p>
              <p>{`${course.gradeLevel} - ${course.year} - ${course.semester} - ${course.subject}`}</p>
            </div>
          ))
        ) : (
          <p>해당 조건에 맞는 학습 과정이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CourseFilterPage;
