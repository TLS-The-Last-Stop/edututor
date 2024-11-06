import styled from 'styled-components';
import CreateStudentModal from './CreateStudentModal.jsx';
import { useEffect, useRef, useState } from 'react';
import { checkDuplicateId, createStudent, getUserInfo } from '../../api/user/user.js';
import { useNavigate } from 'react-router-dom';

const CreateButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    background-color: #F3E8FF;
    color: #6B21A8;
    border: none;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        background-color: #E9D5FF;
    }
`;

const initForm = {
  username       : '',
  loginId        : '',
  password       : '',
  confirmPassword: ''
};

const CreateStudent = ({ fetchAllStudent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState({});
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [classroomName, setClassroomName] = useState('');

  const hasAlerted = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const info = getUserInfo(true);
      setUserInfo(info);
      setClassroomName(info.classroom.classroomName);
    } catch (error) {
      if (!hasAlerted.current) {
        alert('로그인 해주세요.');
        hasAlerted.current = true;
      }
      navigate('/teacher-login');
    }
  }, [navigate]);

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

    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    switch (name) {
      case 'username':
        setErrors(prev => ({
          ...prev,
          username: !value ? '이름을 입력해주세요' : ''  // 에러 메시지를 문자열로 설정
        }));
        break;

      case 'loginId':
        if (value) {
          const loginIdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
          setErrors(prev => ({
            ...prev,
            loginId: !loginIdRegex.test(value) ? '영문 대/소문자 + 숫자조합 (6~20자 이내)' : ''
          }));
        }
        break;

      case 'password':
        if (value) {
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,20}$/;
          setErrors(prev => ({
            ...prev,
            password: !passwordRegex.test(value) ?
              '영문 대/소문자, 숫자, 특수문자를 모두 포함하여 9-20자로 입력해주세요.' : ''
          }));
        }
        break;

      case 'confirmPassword':
        setErrors(prev => ({
          ...prev,
          passwordMatch: form.password !== value ? '비밀번호가 일치하지 않습니다.' : ''
        }));
        break;
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      username : form.username,
      loginId  : form.loginId,
      password : form.password,
      classroom: userInfo.classroom,
      school   : userInfo.classroom.school,
      type     : 'SU'
    };

    if (!isIdChecked) {
      alert('아이디 중복확인을 해주세요');
      return;
    }

    if (!form.username || !form.loginId || !form.password || !form.confirmPassword) {
      alert('모든 필수 항목을 입력해주세요.');
      return false;
    }

    try {
      const result = await createStudent(submitData);
      if (result.status === 204) {
        alert(result?.message || '학생이 등록되었습니다.?');
        handleCloseModal();
        fetchAllStudent();
      }

      if (result.status === 400) {
        alert(`이미 ${form.loginId}로 회원가입 되어 있습니다.`);
      }
    } catch (error) {
      console.error('학생 등록에 실패하였습니다.', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setForm(initForm);
    setErrors({});
    setIsIdChecked(false);
    setIdCheckMessage('');
  };

  return (
    <>
      <CreateButton onClick={() => setIsModalOpen(true)}>
        + 학생 계정 생성
      </CreateButton>
      <CreateStudentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        form={form}
        errors={errors}
        isIdChecked={isIdChecked}
        idCheckMessage={idCheckMessage}
        handleInputChange={handleInputChange}
        handleCheckDuplicatedId={handleCheckDuplicatedId}
        handleSubmit={handleSubmit}
        classroomName={classroomName}
      />
    </>
  );
};

export default CreateStudent;