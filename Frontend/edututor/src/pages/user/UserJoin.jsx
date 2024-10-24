import { useState } from 'react';
import UserJoinForm from '../../components/user/UserJoinForm.jsx';
import SchoolSearchModal from '../../components/user/SchoolSearchModal.jsx';


const formData = {
  fullName         : '',
  loginId          : '',
  password         : '',
  passwordCheck    : '',
  email            : '',
  emailDomain      : '',
  emailDomainSelect: '직접 입력', // 기본값 설정
  phoneFirst       : '010',
  phoneMiddle      : '',
  phoneLast        : '',
  birthYear        : '',
  birthMonth       : '',
  birthDay         : '',
  schoolType       : '초등'
};

const initErrors = {
  phoneMiddle  : false,
  phoneLast    : false,
  birthYear    : false,
  birthMonth   : false,
  birthDay     : false,
  passwordMatch: false
};

const SCHOOL_KEYS = {
  id        : 'SD_SCHUL_CODE',
  type      : 'SCHUL_KND_SC_NM',
  name      : 'SCHUL_NM',
  officeCode: 'ATPT_OFCDC_SC_CODE',
  address   : 'ORG_RDNMA'
};

const initSchool = {
  id        : '',
  type      : '',
  name      : '',
  officeCode: '',
  address   : ''
};

const UserJoin = () => {
  const [form, setForm] = useState(formData);
  const [selectedSchool, setSelectedSchool] = useState(initSchool);
  const [errors, setErrors] = useState(initErrors);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password' || name === 'passwordCheck') {
      handlePasswordCheck(name, value);
    }

  };

  /* 이메일 처리 */
  const handleEmailDomain = (e) => {
    const { name, value } = e.target;

    if (name === 'emailDomainSelects') {
      setForm(prev => ({
        ...prev,
        emailDomainSelect: value,
        emailDomain      : value
      }));
    } else {
      setForm(prev => ({
        ...prev,
        emailDomain      : value,
        emailDomainSelect: ''
      }));
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

  /* 비밀번호 확인 */
  const handlePasswordCheck = (name, value) => {
    if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        passwordMatch: value !== form.passwordCheck && form.passwordCheck !== ''
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        passwordMatch: form.password !== value && value !== ''
      }));
    }
  };

  /* input type에 따른 handler 선택 */
  const getInputHandler = (e) => {
    const { name } = e.target;
    if (['phoneMiddle', 'phoneLast', 'birthYear', 'birthMonth', 'birthDay'].includes(name)) {
      return handleNumberInput(e);
    }

    if (['emailDomain', 'emailDomainSelect'].includes(name)) {
      return handleEmailDomain(e);
    }

    return handleInputChange(e);
  };

  /* 학교 검색 */
  const handleSchoolSearch = () => {
    setIsSearchModalOpen(true);
  };

  const handleSelectSchool = (schoolData) => {
    setSelectedSchool(prev => ({
      ...prev,
      id        : schoolData[SCHOOL_KEYS.id],
      type      : schoolData[SCHOOL_KEYS.type],
      name      : schoolData[SCHOOL_KEYS.name],
      officeCode: schoolData[SCHOOL_KEYS.officeCode],
      address   : schoolData[SCHOOL_KEYS.address]
    }));

    setIsSearchModalOpen(false);

  };

  return (
    <>
      <UserJoinForm errors={errors} form={form} getInputHandler={getInputHandler}
                    handleSchoolSearch={handleSchoolSearch} selectedSchool={selectedSchool}
      />
      <SchoolSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)}
                         onSelectSchool={handleSelectSchool}
      />
    </>
  );
};

export default UserJoin;