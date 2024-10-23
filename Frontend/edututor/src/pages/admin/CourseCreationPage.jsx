import React, { useState } from 'react';
import instance from "../../api/axios";
import '../../assets/css/CourseCreationPage.css';

const CourseCreationPage = () => {
  const [formData, setFormData] = useState({
    classroomId: '',
    courseName: '',
    sections: [
      {
        content: '',
        units: [{ content: '' }],
      },
    ],
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post('/api/course', formData);
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
            <label>클래스룸 ID:</label>
            <input
                type="text"
                name="classroomId"
                value={formData.classroomId}
                onChange={(e) => handleInputChange(e)}
                className="input-field"
            />
          </div>
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
          <button type="submit" className="submit-button">생성하기</button>
        </form>
      </div>
  );
};

export default CourseCreationPage;
