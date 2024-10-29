import React, { useEffect, useState } from 'react';
import '../../assets/css/CoursePage.css';
import { publicApi } from '../../api/axios.js';

const CoursePage = () => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    publicApi.get('/course/1')
      .then(response => {
        setCourseData(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch course data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="course-page">
      <div className="sidebar">
        <button className="new-course-btn">새 과정 등록하기</button>
        <ul>
          <li>{courseData.courseName}</li>
        </ul>
      </div>

      <div className="course-details">
        <div className="course-header">
          <h2>{courseData.courseName}</h2>
          <div className="students-icon">
            <span>학생 관리</span>
          </div>
        </div>

        {/* Sections and units */}
        {courseData.sections.map(section => (
          <div key={section.sectionId} className="section">
            <h3>{section.content}</h3>

            {section.units.map(unit => (
              <div key={unit.unitId} className="unit">
                <h4>{unit.content}</h4>

                <div className="actions">
                  <button className="preview-btn">형성평가 미리보기</button>
                  <button className="share-btn">형성평가 공유하기</button>
                  <button className="material-btn">학습자료 미리보기</button>
                </div>

                {unit.materials.map(material => (
                  <div key={material.materialId}>
                    <p>학습자료: {material.title}</p>
                  </div>
                ))}

                {unit.testPaper ? (
                  <div className="testpaper">
                    <p>시험지: {unit.testPaper.title}</p>
                    <p>Questions: {unit.testPaper.questions.length}</p>
                  </div>
                ) : (
                  <p>시험지가 없습니다.</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
