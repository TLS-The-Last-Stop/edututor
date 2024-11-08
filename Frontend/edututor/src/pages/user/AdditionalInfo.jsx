import React, { useState } from 'react';
import SchoolSearchModal from '../../components/user/SchoolSearchModal.jsx';
import OAuthUserJoinForm from '../../components/user/OAuthUserJoinForm.jsx';
import { useNavigate } from 'react-router-dom';
import { additionalInfo } from '../../api/user/user.js';
import { showALert } from '../../utils/SwalAlert.js';


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
  phoneMiddle     : false,
  phoneLast       : false,
  birthYear       : false,
  birthMonth      : false,
  birthDay        : false,
  birthDateInvalid: false
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
  const [lastDay, setLastDay] = useState('');

  const navigate = useNavigate();

  /* input 값 변경 */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    const hasNonNumber = /[^0-9]/.test(value);
    const numberOnly = value.replace(/[^0-9]/g, '');

    // 숫자가 아닌 값이 입력되었을 때 에러 처리
    setErrors(prev => ({
      ...prev,
      [name]: hasNonNumber
    }));

    setForm(prev => ({
      ...prev,
      [name]: numberOnly
    }));

    if (name.startsWith('birth')) {
      const formData = {
        ...form,
        [name]: numberOnly
      };

      if (formData.birthYear || formData.birthMonth || formData.birthDay) {
        let year = parseInt(formData.birthYear) || 0;
        let month = parseInt(formData.birthMonth) || 0;
        let day = parseInt(formData.birthDay) || 0;

        if (name === 'birthYear') year = parseInt(numberOnly) || 0;
        if (name === 'birthMonth') month = parseInt(numberOnly) || 0;
        if (name === 'birthDay') day = parseInt(numberOnly) || 0;

        const currentYear = new Date().getFullYear();
        const isValidYear = year >= 1900 && year <= currentYear;
        const isValidMonth = month >= 1 && month <= 12;

        let isValidDay = true;
        if (year > 0 || month > 0 || day > 0) {
          const lastDayOfMonth = new Date(year, month, 0).getDate();
          isValidDay = day >= 1 && day <= lastDayOfMonth;
          setLastDay(lastDayOfMonth);
        }

        // 각각의 유효성 상태를 따로 저장
        setErrors(prev => ({
          ...prev,
          birthYearInvalid : year > 0 && !isValidYear,
          birthMonthInvalid: month > 0 && !isValidMonth,
          birthDayInvalid  : day > 0 && !isValidDay
        }));
      }
    }
  };

  const getInputHandler = (e) => {
    const { name } = e.target;
    if (['phoneMiddle', 'phoneLast', 'birthYear', 'birthMonth', 'birthDay'].includes(name)) {
      return handleNumberInput(e);
    }

    return handleInputChange(e);
  };

  const validateForm = () => {
    /* 생년월일 검사 */
    const year = parseInt(form.birthYear);
    const month = parseInt(form.birthMonth);
    const day = parseInt(form.birthDay);

    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      const message = { icon: 'warning', title: '올바른 연도를 입력해주세요.' };
      showALert(message);
      return false;
    }

    if (month < 1 || month > 12) {
      const message = { icon: 'warning', title: '올바른 월을 입력해주세요 (1-12)' };
      showALert(message);
      return false;
    }

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > lastDayOfMonth) {
      const message = { icon: 'warning', title: `올바른 일을 입력해주세요 (1-${lastDayOfMonth})` };
      showALert(message);
      return false;
    }

    // 기존 필수값 체크
    if (!form.phoneMiddle || !form.phoneLast ||
      !form.birthYear || !form.birthMonth || !form.birthDay ||
      !selectedSchool.name || !classroom.year || !classroom.grade || !classroom.classroomName) {
      const message = { icon: 'warning', title: '모든 필수 항목을 입력해주세요.' };
      showALert(message);
      return false;
    }

    return true;
  };

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
      const result = await additionalInfo(submitData);

      if (result.status === 204) {
        navigate('/teacher-login');
      }
      if (result.status === 400) {
        const message = { icon: 'warning', title: result.message };
        showALert(message);
      }
    } catch (error) {
      console.error('Failed to join: ', error.response?.data?.message || '회원가입 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <OAuthUserJoinForm
        errors={errors} form={form} getInputHandler={getInputHandler}
        handleSchoolSearch={handleSchoolSearch} selectedSchool={selectedSchool}
        handleCreateClassroom={handleCreateClassroom} classroom={classroom}
        handleSubmit={handleSubmit} lastDay={lastDay}
      />
      <SchoolSearchModal
        isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)}
        onSelectSchool={handleSelectSchool}
      />
    </>
  );
};

export default AdditionalInfo;