import { useEffect, useState } from 'react';
import { publicApi } from '../../api/axios';
import '../../assets/css/CourseClassroomEnrollPage.css';
import ExamShareModal from '../../components/exam/ExamShareModal';
import MaterialPreviewModal from '../../components/material/MaterialPreviewModal';
import TestPreviewModal from '../../components/exam/TestPreviewModal';
import { LuBookOpenCheck } from 'react-icons/lu';
import { VscOpenPreview } from 'react-icons/vsc';
import { showALert } from '../../utils/SwalAlert.js';

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
  const [selectedCourse, setSelectedCourse] = useState(null); // 선택된 과정
  const [loading, setLoading] = useState(false);

  // 모달 상태들
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [isTestPreviewModalOpen, setIsTestPreviewModalOpen] = useState(false);
  const [materialPreview, setMaterialPreview] = useState(null);
  const [testPreview, setTestPreview] = useState(null);

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
      const message = { icon: 'success', title: response.data.message };
      showALert(message);
      window.history.back();
    } catch (error) {
      const message = { icon: 'error', title: '과정 등록에 실패했습니다.' };
      showALert(message);
      console.error('Error enrolling course:', error);
    }
  };

  const handleCoursePreview = async (courseId) => {
    try {
      const response = await publicApi.get(`/course/${courseId}`);
      setSelectedCourse(response.data.data); // 선택된 과정의 세부 정보 저장
    } catch (error) {
      const message = { icon: 'error', title: '과정 미리보기를 불러오는 데 실패했습니다.' };
      showALert(message);
      console.error('Error fetching course preview:', error);
    }
  };

  const handleOpenMaterialModal = async (materialId) => {
    try {
      const response = await publicApi.get(`/material/${materialId}`);
      setMaterialPreview(response.data.data);
      setIsMaterialModalOpen(true);
    } catch (error) {
      const message = { icon: 'error', title: '학습 자료를 불러오는 데 실패했습니다.' };
      showALert(message);
      console.error('Error fetching material preview:', error);
    }
  };

  const handleOpenTestPreviewModal = async (testPaperId) => {
    try {
      const response = await publicApi.get(`/test-paper/${testPaperId}`);
      setTestPreview(response.data.data);
      setIsTestPreviewModalOpen(true);
    } catch (error) {
      const message = { icon: 'error', title: '시험 미리보기를 불러오는 데 실패했습니다.' };
      showALert(message);
      console.error('Error fetching test preview:', error);
    }
  };

  return (
    <div className="course-filter-container">
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
              className={`course-card ${selectedCourse?.courseId === course.courseId ? 'active' : ''}`}
              onClick={() => handleCoursePreview(course.courseId)} // 과정 미리보기 기능 추가
            >
              <h3>{course.courseName}</h3>
            </div>
          ))
        ) : (
          <p>해당 조건에 맞는 학습 과정이 없습니다.</p>
        )}
      </div>

      {selectedCourse && (
        <div className="course-preview">
          <h2>{selectedCourse.courseName}</h2>
          <p>{selectedCourse.description}</p>
          <h3>단원 및 유닛</h3>
          {selectedCourse.sections.map((section, sectionIndex) => (
            <div key={section.sectionId} className="section">
              <h3>{sectionIndex + 1}. {section.content}</h3>
              {section.units.map((unit, unitIndex) => (
                <div key={unit.unitId} className="unit">
                  <h4>{unitIndex + 1}. {unit.content}</h4>

                  <div className="actions">
                    <button
                      data-tooltip="형성평가 미리보기"
                      onClick={() => handleOpenTestPreviewModal(unit.testPaper.testPaperId)}>
                      <VscOpenPreview />
                    </button>
                    {unit.materials.map(material => (
                      <button
                        key={material.materialId}
                        data-tooltip="학습자료 미리보기"
                        onClick={() => handleOpenMaterialModal(material.materialId)}
                      >
                        <LuBookOpenCheck />
                      </button>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          ))}
          <button onClick={() => handleEnrollCourse(selectedCourse.courseId)}>
            이 과정 등록
          </button>
        </div>
      )}

      <ExamShareModal isOpen={isExamModalOpen} onClose={() => setIsExamModalOpen(false)} />
      <MaterialPreviewModal
        isOpen={isMaterialModalOpen}
        onClose={() => setIsMaterialModalOpen(false)}
        material={materialPreview}
      />
      <TestPreviewModal
        isOpen={isTestPreviewModalOpen}
        onClose={() => setIsTestPreviewModalOpen(false)}
        testData={testPreview}
      />
    </div>
  );
};

export default CourseClassroomEnrollPage;
