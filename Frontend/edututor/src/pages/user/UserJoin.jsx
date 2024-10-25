import { useState } from 'react';
import UserJoinForm from '../../components/user/UserJoinForm.jsx';
import SchoolSearchModal from '../../components/user/SchoolSearchModal.jsx';
import { checkDuplicateId, join } from '../../api/user/user.js';
import { useNavigate } from 'react-router-dom';


const initForm = {
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
  loginId      : false,
  password     : false,
  passwordMatch: false
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

const UserJoin = () => {
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

    if (['loginId', 'password', 'passwordCheck'].includes(name)) {
      validateInput(name, value);
    }

    if (name === 'password' || name === 'passwordCheck') {
      handlePasswordCheck(name, value);
    }

  };

  const validateInput = (name, value) => {
    switch (name) {
      case 'loginId':
        // 값이 있을 때만 검사
        if (value) {
          const loginIdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
          setErrors(prev => ({
            ...prev,
            loginId: !loginIdRegex.test(value)
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            loginId: false
          }));
        }
        break;

      case 'password':
        if (value) {
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,20}$/;
          setErrors(prev => ({
            ...prev,
            password: !passwordRegex.test(value)
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            password: false
          }));
        }
        break;
    }
  };

  /* 아이디 중복체크 */
  const handleCheckDuplicatedId = async () => {
    if (!form.loginId) {
      alert('아이디를 입력해주세요.');
      return;
    }

    if (form.loginId.length < 6) {
      alert('아이디가 너무 짧습니다.');
      return;
    }

    if (form.loginId.length > 20) {
      alert('아이디를 줄여주세요.');
      return;
    }

    try {
      const result = await checkDuplicateId(form.loginId);
      if (result.status === 204) {
        setIsIdChecked(true);
        setIdCheckMessage('사용 가능한 아이디 입니다.');
      } else {
        setIsIdChecked(false);
        setIdCheckMessage('이미 사용중이 아이디입니다.');
      }

    } catch (error) {
      console.error('아이디 중복체크 실패: ', error);
      setIsIdChecked(false);
      setIdCheckMessage('중복 확인 중 오류가 발생하였습니다.');
    }
  };

  /* 이메일 처리 */
  const handleEmailDomain = (e) => {
    const { name, value } = e.target;

    if (name === 'emailDomainSelect') {
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
    console.log('이게 안되는구나');
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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,20}$/;

    if (name === 'password') {
      if (value) {
        setErrors(prev => ({
          ...prev,
          password: !passwordRegex.test(value),
          // 비밀번호가 바뀌었을 때는 확인란이 비어있지 않은 경우에만 일치 여부 체크
          passwordMatch: form.passwordCheck !== '' && value !== form.passwordCheck
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          password     : false,
          passwordMatch: false
        }));
      }
    } else if (name === 'passwordCheck') {
      if (value) {
        setErrors(prev => ({
          ...prev,
          passwordMatch: form.password !== value
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          passwordMatch: false
        }));
      }
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

  /* 회원가입 전 검사 */
  const validateForm = () => {
    // 아이디 중복 체크 확인
    if (!isIdChecked) {
      alert('아이디 중복확인을 해주세요.');
      return false;
    }

    // 패스워드 일치 확인
    if (errors.passwordMatch) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    // 기타 유효성 검사
    if (errors.loginId || errors.password) {
      alert('입력한 정보를 다시 확인해주세요.');
      return false;
    }

    if (!form.fullName || !form.loginId || !form.password || !form.passwordCheck ||
      !form.email || !form.phoneMiddle || !form.phoneLast ||
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
      fullName: form.fullName,
      loginId : form.loginId,
      password: form.password,
      email   : `${form.email}@${form.emailDomain || form.emailDomainSelect}`,
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
      }
    };

    try {
      const result = await join(submitData);

      if (result.status === 204) navigate('/login');
      if (result.status === 400) alert(result.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || '회원가입 처리 중 오류가 발생했습니다.';
      alert(errorMessage);
    }


  };
  return (
    <>
      <UserJoinForm errors={errors} form={form} getInputHandler={getInputHandler}
                    handleSchoolSearch={handleSchoolSearch} selectedSchool={selectedSchool}
                    handleCheckDuplicatedId={handleCheckDuplicatedId} isIdChecked={isIdChecked}
                    idCheckMessage={idCheckMessage}
                    handleCreateClassroom={handleCreateClassroom} classroom={classroom}
                    handleSubmit={handleSubmit}
      />
      <SchoolSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)}
                         onSelectSchool={handleSelectSchool}
      />
    </>
  );
};

export default UserJoin;