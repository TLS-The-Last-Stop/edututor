import React, { useState } from 'react';
import { publicApi } from '../../api/axios';
import '../../assets/css/CourseCreationPage.css';

const CourseCreationPage = () => {
  // 각 선택 항목의 groupCodeId 매핑 데이터 설정
  const gradeLevels = { 초등학교: 1004, 중학교: 1004, 고등학교: 1004 }; // 급수에 해당하는 groupCodeId는 1004
  const years = {
    초등학교: { '1학년': 1003, '2학년': 1003, '3학년': 1003, '4학년': 1003, '5학년': 1003, '6학년': 1003 },
    중학교 : { '1학년': 1003, '2학년': 1003, '3학년': 1003 },
    고등학교: { '1학년': 1003, '2학년': 1003, '3학년': 1003 }
  };
  const semesters = { '1학기': 1002, '2학기': 1002 }; // 학기에 해당하는 groupCodeId는 1002
  const subjects = { 수학: 1001, 국어: 1001, 과학: 1001, 영어: 1001, 사회: 1001, 역사: 1001, 도덕: 1001 }; // 과목에 해당하는 groupCodeId는 1001

  const [formData, setFormData] = useState({
    courseName : '',
    gradeLevel : '',
    year       : '',
    semester   : '',
    subject    : '',
    groupCodeId: null,
    sections   : [
      {
        content: '',
        units  : [{ content: '' }]
      }
    ]
  });

  const handleInputChange = (e, sectionIndex, unitIndex) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    if (unitIndex !== undefined) {
      updatedFormData.sections[sectionIndex].units[unitIndex][name] = value;
    } else if (sectionIndex !== undefined) {
      updatedFormData.sections[sectionIndex][name] = value;
    } else {
      updatedFormData[name] = value;

      // 선택된 값에 따라 groupCodeId 설정
      if (name === 'gradeLevel') {
        updatedFormData.groupCodeId = gradeLevels[value];
      } else if (name === 'year' && formData.gradeLevel) {
        updatedFormData.groupCodeId = years[formData.gradeLevel][value];
      } else if (name === 'semester') {
        updatedFormData.groupCodeId = semesters[value];
      } else if (name === 'subject') {
        updatedFormData.groupCodeId = subjects[value];
      }
    }

    setFormData(updatedFormData);
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        { content: '', units: [{ content: '' }] }
      ]
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // gradeLevel, year, semester, subject 값을 조합하여 groupCode 생성
    const groupCode = `${formData.gradeLevel}-${formData.year}-${formData.semester}-${formData.subject}`;

    const requestData = {
      courseName: formData.courseName,
      groupCode : groupCode,
      sections  : formData.sections
    };

    try {
      const response = await publicApi.post('/course', requestData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="course-creation-container">
      <h2>과정 생성</h2>
      <form onSubmit={handleSubmit} className="course-form">
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

        {/* 급수 드롭다운 */}
        <div className="form-field">
          <label>급수:</label>
          <select
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={(e) => handleInputChange(e)}
            className="input-field"
          >
            <option value="">선택</option>
            {Object.keys(gradeLevels).map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* 학년 드롭다운 */}
        <div className="form-field">
          <label>학년:</label>
          <select
            name="year"
            value={formData.year}
            onChange={(e) => handleInputChange(e)}
            className="input-field"
            disabled={!formData.gradeLevel} // 급수 선택에 따라 학년 활성화
          >
            <option value="">선택</option>
            {formData.gradeLevel && Object.keys(years[formData.gradeLevel]).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* 학기 드롭다운 */}
        <div className="form-field">
          <label>학기:</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={(e) => handleInputChange(e)}
            className="input-field"
          >
            <option value="">선택</option>
            {Object.keys(semesters).map((semester) => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>

        {/* 과목 드롭다운 */}
        <div className="form-field">
          <label>과목:</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange(e)}
            className="input-field"
          >
            <option value="">선택</option>
            {Object.keys(subjects).map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
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
        <button type="submit" className="submit-button">생성하기</button>
      </form>
    </div>
  );
};

export default CourseCreationPage;
