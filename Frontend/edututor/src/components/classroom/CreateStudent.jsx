import styled from 'styled-components';
import CreateStudentModal from './CreateStudentModal.jsx';
import { useState } from 'react';
import { checkDuplicateId } from '../../api/user/user.js';

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
  name         : '',
  loginId      : '',
  password     : '',
  passwordCheck: '',
  grade        : '',
  classNumber  : ''
};


const CreateStudent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState({});
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState('');

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
      case 'name':
        setErrors(prev => ({
          ...prev,
          name: !value ? '이름을 입력해주세요' : ''  // 에러 메시지를 문자열로 설정
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

      case 'passwordCheck':
        setErrors(prev => ({
          ...prev,
          passwordMatch: form.password !== value ? '비밀번호가 일치하지 않습니다.' : ''
        }));
        break;

      case 'classNumber':
        setErrors(prev => ({
          ...prev,
          classNumber: !value ? '반 이름을 입력해주세요' : ''
        }));
        break;

      case 'grade':
        setErrors(prev => ({
          ...prev,
          grade: !value ? '학년을 선택해주세요' : ''
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
    // ... 제출 로직
  };

  return (
    <>
      <CreateButton onClick={() => setIsModalOpen(true)}>
        + 학생 계정 생성
      </CreateButton>
      <CreateStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={form}
        errors={errors}
        isIdChecked={isIdChecked}
        idCheckMessage={idCheckMessage}
        handleInputChange={handleInputChange}
        handleCheckDuplicatedId={handleCheckDuplicatedId}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CreateStudent;