import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from "../../api/axios";
import '../../assets/css/CourseCreationPage.css';

const CourseEditPage = () => {
  const { courseId } = useParams(); // URL에서 courseId를 가져옴
  const [formData, setFormData] = useState({
    courseName: '',
    sections: [
      {
        content: '',
        units: [{ content: '' }],
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 기존 데이터를 불러오기
    const fetchCourseData = async () => {
      try {
        const response = await instance.get(`/api/course/${courseId}`);
        setFormData(response.data.data); // 기존 데이터 설정
        setLoading(false);
      } catch (error) {
        console.error('데이터를 가져오는 데 실패했습니다:', error);
        setError('데이터를 가져오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleInputChange = (e, sectionIndex, unitIndex) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    if (unitIndex !== undefined) {
      updatedFormData.sections[sectionIndex].units[unitIndex][name] = value;
    } else if (sectionIndex !== undefined) {
      updatedFormData.sections[sectionIndex][name] = value;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        { content: '', units: [{ content: '' }] },
      ],
    });
  };

  const addUnit = (sectionIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].units.push({ content: '' });
    setFormData({ ...formData, sections: updatedSections });
  };

  const removeSection = (sectionIndex) => {
    const updatedSections = formData.sections.filter((_, index) => index !== sectionIndex);
    setFormData({ ...formData, sections: updatedSections });
  };

  const removeUnit = (sectionIndex, unitIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].units = updatedSections[sectionIndex].units.filter(
      (_, index) => index !== unitIndex
    );
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.put(`/api/course/${courseId}`, formData);
      console.log('Response:', response.data);
      alert('과정이 성공적으로 수정되었습니다.');
      navigate(`/course/${courseId}`); // 수정 후 상세 페이지로 이동
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await instance.delete(`/api/course/${courseId}`);
      alert('과정이 성공적으로 삭제되었습니다.');
      navigate('/courses'); // 삭제 후 과정 리스트 페이지로 이동
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="course-creation-container">
      <h2>과정 수정</h2>
      <form onSubmit={handleUpdate} className="course-form">
        <div className="form-field">
          <label>과정명:</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={(e) => handleInputChange(e)}
            className="input-field"
          />
        </div>

        {formData.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="section-block">
            <div className="section-header">
              <h3>단원 {sectionIndex + 1}</h3>
              <button
                type="button"
                onClick={() => removeSection(sectionIndex)}
                className="remove-button"
              >
                단원 삭제
              </button>
            </div>
            <div className="form-field">
              <label>단원 이름:</label>
              <input
                type="text"
                name="content"
                value={section.content}
                onChange={(e) => handleInputChange(e, sectionIndex)}
                className="input-field"
              />
            </div>

            {section.units.map((unit, unitIndex) => (
              <div key={unitIndex} className="unit-block">
                <div className="unit-header">
                  <h4>차수 {unitIndex + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeUnit(sectionIndex, unitIndex)}
                    className="remove-button"
                  >
                    차수 삭제
                  </button>
                </div>
                <div className="form-field">
                  <label>차수 이름:</label>
                  <input
                    type="text"
                    name="content"
                    value={unit.content}
                    onChange={(e) => handleInputChange(e, sectionIndex, unitIndex)}
                    className="input-field"
                  />
                </div>
              </div>
            ))}

            <button type="button" onClick={() => addUnit(sectionIndex)} className="add-button">
              차수 추가
            </button>
          </div>
        ))}

        <button type="button" onClick={addSection} className="add-button">
          단원 추가
        </button>
        <button type="submit" className="submit-button">수정하기</button>
        <button type="button" onClick={handleDelete} className="delete-button">과정 삭제</button>
      </form>
    </div>
  );
};

export default CourseEditPage;
