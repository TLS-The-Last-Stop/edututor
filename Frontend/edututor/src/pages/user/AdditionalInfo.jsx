import React, { useState } from 'react';
import SchoolSearchModal from '../../components/user/SchoolSearchModal.jsx';
import OAuthUserJoinForm from '../../components/user/OAuthUserJoinForm.jsx';
import { useNavigate } from 'react-router-dom';
import { checkDuplicateId, teacherJoin } from '../../api/user/user.js';


const initForm = {
  phoneFirst : '010',
  phoneMiddle: '',
  phoneLast  : '',
  birthYear  : '',
  birthMonth : '',
  birthDay   : '',
  schoolType : '초등'
};


const initErrors = {
  phoneMiddle: false,
  phoneLast  : false,
  birthYear  : false,
  birthMonth : false,
  birthDay   : false
};

const initSchool = {
  id        : '',
  type      : '',
  name      : '',
  officeCode: '',
  address   : ''
};

const initClassroom = {
  classroomName: '',
  year         : '',
  grade        : ''
};

const AdditionalInfo = () => {
  const [form, setForm] = useState(initForm);
  const [selectedSchool, setSelectedSchool] = useState(initSchool);
  const [classroom, setClassroom] = useState(initClassroom);
  const [errors, setErrors] = useState(initErrors);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState('');

  const navigate = useNavigate();

  /* input 값 변경 */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'loginId') {
      setIsIdChecked(false);
      setIdCheckMessage('');
    }

  };

  /* 숫자만 입력 가능한 필드 처리 */
  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    const hasNonNumber = /[^0-9]/.test(value);
    const numberOnly = value.replace(/[^0-9]/g, '');

    setErrors(prev => ({
      ...prev,
      [name]: hasNonNumber
    }));

    setForm(prev => ({
      ...prev,
      [name]: numberOnly
    }));
  };

  const getInputHandler = (e) => {
    const { name } = e.target;
    if (['phoneMiddle', 'phoneLast', 'birthYear', 'birthMonth', 'birthDay'].includes(name)) {
      return handleNumberInput(e);
    }

    return handleInputChange(e);
  };

  const validateForm = () => {

    if (!form.phoneMiddle || !form.phoneLast ||
      !form.birthYear || !form.birthMonth || !form.birthDay ||
      !selectedSchool.name || !classroom.year || !classroom.grade || !classroom.classroomName) {
      alert('모든 필수 항목을 입력해주세요.');
      return false;
    }

    return true;
  };

  /* 학교 검색 */
  const handleSchoolSearch = () => {
    setIsSearchModalOpen(true);
  };

  const handleSelectSchool = (schoolData) => {
    setSelectedSchool(prev => ({
      ...prev,
      id        : schoolData['SD_SCHUL_CODE'],
      type      : schoolData['SCHUL_KND_SC_NM'],
      name      : schoolData['SCHUL_NM'],
      officeCode: schoolData['ATPT_OFCDC_SC_CODE'],
      address   : schoolData['ORG_RDNMA']
    }));

    setIsSearchModalOpen(false);

  };

  const handleCreateClassroom = (e) => {
    const { name, value } = e.target;
    setClassroom(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 전송 전 유효성 검사
    if (!validateForm()) return;

    // 전송
    const submitData = {
      phoneNum: `${form.phoneFirst}-${form.phoneMiddle}-${form.phoneLast}`,
      birthDay: `${form.birthYear}-${String(form.birthMonth).padStart(2, '0')}-${String(form.birthDay).padStart(2, '0')}`,

      school: {
        type      : selectedSchool.type,
        name      : selectedSchool.name,
        officeCode: selectedSchool.officeCode,
        address   : selectedSchool.address
      },

      classroom: {
        classroomName: classroom.classroomName,
        year         : classroom.year,
        grade        : classroom.grade
      },
      type     : 'TE'
    };

    try {
      const result = await teacherJoin(submitData);

      if (result.status === 204) navigate('/login');
      if (result.status === 400) alert(result.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || '회원가입 처리 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  return (
    <>
      <OAuthUserJoinForm
        errors={errors} form={form} getInputHandler={getInputHandler}
        handleSchoolSearch={handleSchoolSearch} selectedSchool={selectedSchool}
        handleCreateClassroom={handleCreateClassroom} classroom={classroom}
        handleSubmit={handleSubmit}
      />
      <SchoolSearchModal
        isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)}
        onSelectSchool={handleSelectSchool}
      />
    </>
  );
};

export default AdditionalInfo;