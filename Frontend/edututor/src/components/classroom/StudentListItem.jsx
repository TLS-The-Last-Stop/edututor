import styled from 'styled-components';
import StudentDetailModal from './StudentDetailModal.jsx';
import { useState } from 'react';
import { getStudentByStudentId } from '../../api/classroom/classroom.js';
import { updateStudent } from '../../api/user/user.js';

const StudentItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem; // 패딩 증가
    height: 115px; // 높이 설정
    box-sizing: border-box;
`;

const StudentInfo = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    gap: 1.5rem; // gap 증가
`;

const Avatar = styled.div`
    width: 3rem; // 크기 증가
    height: 3rem; // 크기 증가
    background-color: #f3f4f6;
    border-radius: 9999px;
`;

const StudentName = styled.span`
    font-size: 1.1rem; // 폰트 크기 증가
`;

const DeleteButton = styled.button`
    width: 20%;
    padding: 0.75rem 1.5rem; // 패딩 증가
    border-radius: 9999px;
    border: 1px solid #FEE2E2;
    color: #DC2626;
    background: transparent;
    font-size: 1rem; // 폰트 크기 증가
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        background-color: #FEF2F2;
    }
`;

const initForm = {
  username       : '',
  password       : '',
  confirmPassword: ''
};

const initErrors = {
  username       : '',
  password       : '',
  confirmPassword: ''
};

const StudentListItem = ({ classroomId, student, fetchAllStudent, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentDetail, setStudentDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateForm, setUpdateForm] = useState(initForm);
  const [errors, setErrors] = useState(initErrors);

  const handleOpenModal = async () => {
    try {
      setIsLoading(true);

      const result = await getStudentByStudentId(classroomId, student.id);

      if (result.status === 200) {
        setStudentDetail(result.data);
        setIsOpen(true);
      } else {
        alert('학생 정보를 불러오는데 실패했습니다.');
      }

    } catch (error) {
      console.error('Failed to fetch student details:', error);
      alert('서버 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setStudentDetail(prev => ({
        ...prev,
        username: value
      }));
    } else {
      setUpdateForm(prev => {
        const newForm = {
          ...prev,
          [name]: value
        };

        if (name === 'password') {
          validateInput('password', value);
          if (newForm.confirmPassword) {
            validateInput('confirmPassword', newForm.confirmPassword);
          }
        }
        if (name === 'confirmPassword') {
          validateInput('confirmPassword', value);
        }

        return newForm;
      });
    }
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    switch (name) {
      case 'username':
        setErrors(prev => ({
          ...prev,
          username: !value ? '이름을 입력해주세요' : ''
        }));
        break;

      case 'password':
        if (value) {
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,20}$/;
          setErrors(prev => ({
            ...prev,
            password: !passwordRegex.test(value) ?
              '영문 대/소문자, 숫자, 특수문자를 모두 포함하여 9-20자로 입력해주세요.' : ''
          }));
        } else {
          setErrors(prev => ({ ...prev, password: '' }));
        }
        break;

      case 'confirmPassword':
        setErrors(prev => ({
          ...prev,
          confirmPassword: updateForm.password !== value ?
            '비밀번호가 일치하지 않습니다.' : ''
        }));
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호가 입력된 경우에만 검증
    if (updateForm.password || updateForm.confirmPassword) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,20}$/;
      if (!passwordRegex.test(updateForm.password)) {
        alert('비밀번호는 영문 대/소문자, 숫자, 특수문자를 모두 포함하여 9-20자로 입력해주세요.');
        return;
      }

      if (updateForm.password !== updateForm.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    if (!studentDetail.username) {
      alert('이름을 입력해주세요.');
      return;
    }

    try {
      const updateData = {
        username: studentDetail.username,
        ...(updateForm.password && { password: updateForm.password })
      };

      const result = await updateStudent(studentDetail.id, updateData);
      if (result.status === 204) {
        alert('수정이 완료되었습니다.');
        handleCloseModal();
        fetchAllStudent();
      } else {
        alert('업데이트에서 문제 생김');
      }
    } catch (error) {
      console.error('Failed to update student:', error);
      alert('학생 정보 수정에 실패했습니다.');
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setStudentDetail(null);
    setUpdateForm(initForm);
    setErrors(initErrors);
  };

  return (
    <>
      <StudentItem onClick={handleOpenModal}>
        <StudentInfo>
          <Avatar />
          <StudentName>{student.username} ({student.loginId})</StudentName>
        </StudentInfo>
        <DeleteButton onClick={(e) => {
          e.stopPropagation();
          handleDelete(student.id);
        }}>계정 삭제</DeleteButton>
      </StudentItem>

      <StudentDetailModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        updateForm={updateForm}
        student={studentDetail}
        isLoading={isLoading}
        errors={errors}
      />
    </>
  );
};

export default StudentListItem;