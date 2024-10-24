import { useState } from 'react';
import UserJoinForm from '../../components/user/UserJoinForm.jsx';
import SchoolSearchModal from '../../components/user/SchoolSearchModal.jsx';
import { checkDuplicateId, join } from '../../api/user/user.js';
import { SlCallOut } from 'react-icons/sl';


const initForm = {
  fullName         : '',
  joinId           : '',
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
  joinId       : false,
  password     : false,
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
  const [form, setForm] = useState(initForm);
  const [selectedSchool, setSelectedSchool] = useState(initSchool);
  const [errors, setErrors] = useState(initErrors);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  /* input 값 변경 */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (['joinId', 'password', 'passwordCheck'].includes(name)) {
      validateInput(name, value);
    }

    if (name === 'password' || name === 'passwordCheck') {
      handlePasswordCheck(name, value);
    }

  };

  const validateInput = (name, value) => {
    console.log(name, value);
    switch (name) {
      case 'joinId':
        // 영문 대/소문자 + 숫자 조합 (6~20자)
        const joinIdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
        setErrors(prev => ({
          ...prev,
          joinId: !joinIdRegex.test(value)
        }));
        break;
      case 'password':
        // 영문 대/소문자 + 특수문자 조합 (9-20자)
        const passwordRegex = /^(?=.*[A-Za-z)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,20}$/;
        setErrors(prev => ({
          ...prev,
          password: !passwordRegex.test(value)
        }));

        if (form.passwordCheck) {
          setErrors(prev => ({
            ...prev,
            passwordMatch: value !== form.passwordCheck
          }));
        }
        break;

      case 'passwordCheck':
        setErrors(prev => ({
          ...prev,
          passwordMatch: form.password !== value
        }));
        break;
    }
  };

  /* 아이디 중복체크 */
  const handleCheckDuplicatedId = async () => {
    const result = await checkDuplicateId(form.joinId);
    console.log('아이디 중복체크 result', result);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* 전송 */
    const submitData = {
      fullName: form.fullName,
      loginId : form.joinId,
      password: form.password,
      email   : `${form.email}@${form.emailDomain || form.emailDomainSelect}`,
      phoneNum: `${form.phoneFirst}-${form.phoneMiddle}-${form.phoneLast}`,
      birthDay: `${form.birthYear}-${String(form.birthMonth).padStart(2, '0')}-${String(form.birthDay).padStart(2, '0')}`,

      school: {
        type      : selectedSchool.type,
        name      : selectedSchool.name,
        officeCode: selectedSchool.officeCode,
        address   : selectedSchool.address
      }
    };

    const result = await join(submitData);
    console.log('회원가입 결과', result);
  };
  return (
    <>
      <UserJoinForm errors={errors} form={form} getInputHandler={getInputHandler}
                    handleSchoolSearch={handleSchoolSearch} selectedSchool={selectedSchool}
                    handleCheckDuplicatedId={handleCheckDuplicatedId} handleSubmit={handleSubmit}
      />
      <SchoolSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)}
                         onSelectSchool={handleSelectSchool}
      />
    </>
  );
};

export default UserJoin;