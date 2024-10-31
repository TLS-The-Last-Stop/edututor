import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReportList from '../../components/report/ReportList.jsx';
import { getClassroomCourses, getReport } from '../../api/report/report.js';
import '../../assets/css/ReportPage.css';

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [courses, setCourses] = useState([{ id: 'all', name: '전체' }]);
  const [selectedCourse, setSelectedCourse] = useState({ id: 'all', name: '전체' });
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchReportData = async (page, courseId) => {
    const params = new URLSearchParams();
    params.append('page', page);
    if (courseId && courseId !== 'all') {
      params.append('courseId', courseId);
    }

    try {
      const response = await getReport(params.toString());
      if (response.success && response.data) {
        setReportData(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      } else {
        setReportData([]);
        console.error('리포트 데이터 조회 실패:', response.error);
      }
    } catch (error) {
      console.error('리포트 데이터 조회 실패:', error);
      setReportData([]);
    }
  };

  const fetchCourses = async () => {
    const response = await getClassroomCourses();
    if (response.success) {
      const courseList = response.data.map(course => ({
        id: course.courseId,
        name: course.courseName
      }));
      setCourses([{ id: 'all', name: '전체' }, ...courseList]);
    } else {
      console.error('강의 목록 조회 실패~:', response.error);
    }
  };

  const getQueryPage = () => {
    const params = new URLSearchParams(location.search);
    return Number(params.get('page')) || 0;
  };

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
    fetchReportData(page, selectedCourse.id);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setIsOpen(false);
    navigate(`?page=0`);
    fetchReportData(0, course.id);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const page = getQueryPage();
    fetchReportData(page, selectedCourse.id);
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <div className="report-container">
      <div className="dropdown-container" ref={dropDownRef}>
        <button
          className="dropdown-button"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-expanded={isOpen}
        >
          {selectedCourse.name}
          <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
        </button>
        {isOpen && (
          <div className="dropdown">
            {courses.map((course, index) => (
              <div
                key={course.id || `all-${index}`}
                className={`dropdown-item ${selectedCourse.id === course.id ? 'selected' : ''}`}
                onClick={() => handleCourseSelect(course)}
              >
                {course.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <ReportList
        reports={reportData}
        onViewDetail={(id) => navigate(`/report/${id}`)}
      />

      <div className="pagination">
        <button onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}>
          «
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}>
          ‹
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`pagination-button ${index === currentPage ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}>
          ›
        </button>
        <button onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}>
          »
        </button>
      </div>
    </div>
  );
};

export default Report;