import { useState } from 'react';
import { publicApi } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/CourseCreationPage.css';
import { showALert } from '../../utils/SwalAlert.js';
import styled from 'styled-components';
import { FileInput, Input, SelectInput } from '../../components/common/AdminStyledComponent.jsx';

const PageContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1.5rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: center;
    gap: 1rem;

    label {
        font-weight: 500;
        color: #555;
        font-size: 0.9rem;
    }
`;

const SectionBlock = styled.div`
    background-color: #f8fafc;
    padding: 1.5rem;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e2e8f0;

    h3 {
        margin: 0;
        color: #333;
        font-size: 1.1rem;
        font-weight: 600;
    }
`;

const UnitBlock = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    align-items: center;
    background-color: white;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #edf2f7;

    label {
        font-weight: 500;
        color: #555;
        font-size: 0.9rem;
        min-width: 60px;
    }
`;

const Button = styled.button`
    height: 40px;
    padding: 0 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const AddButton = styled(Button)`
    background-color: #f0f7ff;
    color: #2b6cb0;
    border: 1px solid #bee3f8;
    min-width: 100px;

    &:hover:not(:disabled) {
        background-color: #e3effd;
    }
`;

const RemoveButton = styled(Button)`
    background-color: #fff5f5;
    color: #c53030;
    border: 1px solid #fed7d7;

    &:hover:not(:disabled) {
        background-color: #fee2e2;
    }
`;

const SubmitButton = styled(Button)`
    background-color: #38b2ac;
    color: white;
    width: 100%;
    height: 48px;
    margin-top: 1rem;
    font-size: 1rem;

    &:hover:not(:disabled) {
        background-color: #319795;
    }
`;

const CourseCreationPage = () => {
  const navigate = useNavigate();
  const gradeLevels = { 초등학교: 1004, 중학교: 1004, 고등학교: 1004 };
  const years = {
    초등학교: { '1학년': 1003, '2학년': 1003, '3학년': 1003, '4학년': 1003, '5학년': 1003, '6학년': 1003 },
    중학교 : { '1학년': 1003, '2학년': 1003 },
    고등학교: { '1학년': 1003, '2학년': 1003, '3학년': 1003 }
  };
  const semesters = { '1학기': 1002, '2학기': 1002 };
  const subjects = { 수학: 1001, 국어: 1001, 과학: 1001, 영어: 1001, 사회: 1001, 역사: 1001, 도덕: 1001 };

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
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e, sectionIndex, unitIndex) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    if (unitIndex !== undefined) {
      updatedFormData.sections[sectionIndex].units[unitIndex][name] = value;
    } else if (sectionIndex !== undefined) {
      updatedFormData.sections[sectionIndex][name] = value;
    } else {
      updatedFormData[name] = value;

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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
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

    const requestData = new FormData();
    const jsonBlob = new Blob([JSON.stringify({
      courseName: formData.courseName,
      groupCode : `${formData.gradeLevel}-${formData.year}-${formData.semester}-${formData.subject}`,
      sections  : formData.sections
    })], { type: 'application/json' });

    requestData.append('request', jsonBlob);

    if (imageFile) {
      requestData.append('imageFile', imageFile);
    }

    try {
      const response = await publicApi.post('/course', requestData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.status === 200) {
        showALert({ icon: 'success', title: '과정 생성 성공' });
        navigate('/admin/course');
      } else {
        throw new Error(response.data.message || '과정 생성 실패');
      }
    } catch (error) {
      showALert({ icon: 'warning', title: error.message || '과정 생성 중 오류가 발생했습니다.' });
    }
  };


  return (
    <PageContainer>
      <Title>과정 생성</Title>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label>과정명</label>
          <Input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={(e) => handleInputChange(e)}
            placeholder="과정명을 입력하세요"
            required
          />
        </FormField>

        <FormField>
          <label>과정 이미지</label>
          <FileInput
            onChange={handleFileChange}
            value={imageFile}
          />
        </FormField>

        <FormField>
          <label>급수</label>
          <SelectInput
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={(e) => handleInputChange(e)}
            required
          >
            <option value="">선택</option>
            {Object.keys(gradeLevels).map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </SelectInput>
        </FormField>

        <FormField>
          <label>학년</label>
          <SelectInput
            name="year"
            value={formData.year}
            onChange={(e) => handleInputChange(e)}
            disabled={!formData.gradeLevel}
            required
          >
            <option value="">선택</option>
            {formData.gradeLevel && Object.keys(years[formData.gradeLevel]).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </SelectInput>
        </FormField>

        <FormField>
          <label>학기</label>
          <SelectInput
            name="semester"
            value={formData.semester}
            onChange={(e) => handleInputChange(e)}
            required
          >
            <option value="">선택</option>
            {Object.keys(semesters).map((semester) => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </SelectInput>
        </FormField>

        <FormField>
          <label>과목</label>
          <SelectInput
            name="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange(e)}
            required
          >
            <option value="">선택</option>
            {Object.keys(subjects).map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </SelectInput>
        </FormField>

        {formData.sections.map((section, sectionIndex) => (
          <SectionBlock key={sectionIndex}>
            <SectionHeader>
              <h3>단원 {sectionIndex + 1}</h3>
              {sectionIndex > 0 && (
                <RemoveButton
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                >
                  단원 삭제
                </RemoveButton>
              )}
            </SectionHeader>

            <FormField>
              <label>단원 이름</label>
              <Input
                type="text"
                name="content"
                value={section.content}
                onChange={(e) => handleInputChange(e, sectionIndex)}
                placeholder="단원 이름을 입력하세요"
                required
              />
            </FormField>

            {section.units.map((unit, unitIndex) => (
              <UnitBlock key={unitIndex}>
                <label>차수 {unitIndex + 1}</label>
                <Input
                  type="text"
                  name="content"
                  value={unit.content}
                  onChange={(e) => handleInputChange(e, sectionIndex, unitIndex)}
                  placeholder={`${unitIndex + 1}차시 내용을 입력하세요`}
                  required
                />
                {unitIndex > 0 && (
                  <RemoveButton
                    type="button"
                    onClick={() => removeUnit(sectionIndex, unitIndex)}
                  >
                    삭제
                  </RemoveButton>
                )}
              </UnitBlock>
            ))}

            <AddButton
              type="button"
              onClick={() => addUnit(sectionIndex)}
            >
              차수 추가
            </AddButton>
          </SectionBlock>
        ))}

        <AddButton type="button" onClick={addSection}>
          단원 추가
        </AddButton>
        <SubmitButton type="submit">
          생성하기
        </SubmitButton>
      </Form>
    </PageContainer>
  );
};

export default CourseCreationPage;
