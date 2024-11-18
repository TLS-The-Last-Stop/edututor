import {
  Button,
  Container,
  FormSection,
  LoginTypeBox,
  LoginTypeContainer,
  Title
} from '../../components/common/UserStyledComponents.js';
import teacher from '../../assets/icon/teacher.png';
import { Link } from 'react-router-dom';
import student from '../../assets/icon/student.png';
import { useState } from 'react';
import styled from 'styled-components';

const Logo = styled.div`
    font-size: 55px;
    font-weight: bold;
    display: flex;
    align-items: center;
    flex-direction: column;

    span:first-child {
        color: #4285f4;
    }

    .edu {
        font-size: 12px;
        background: #eef3ff;
        color: #4285f4;
        padding: 2px 6px;
        border-radius: 4px;
        margin-left: 4px;
    }

    div:first-child {
        color: #666;
        text-decoration: none;
        position: relative;
        padding-bottom: 20px;

    }
`;

const UserLogin = () => {
  const [selectedType, setSelectedType] = useState('teacher');

  return (
    <Container
      style={{
        background   : '#fff',
        display      : 'flex',
        flexDirection: 'column',
        marginTop    : '30px',
        position     : 'static'
      }}>
      <Logo>
        <div>
          <span>E</span>dututor
          <span className="edu">edu</span>
        </div>
        <div>
          <Title>로그인 유형을 선택해주세요.</Title>
        </div>
      </Logo>
      <FormSection>
        <LoginTypeContainer>
          <LoginTypeBox
            $active={selectedType === 'teacher'}
            $type="teacher"
            onClick={() => setSelectedType('teacher')}
          >
            <div className="image-container">
              <img src={teacher} alt="선생님 이미지" />
            </div>
            <div className="button-container">
              <Link to="/teacher-login"><Button $primary>로그인</Button></Link>
            </div>
          </LoginTypeBox>

          <LoginTypeBox
            $active={selectedType === 'student'}
            $type="student"
            onClick={() => setSelectedType('student')}
          >
            <div className="image-container">
              <img src={student} alt="학생 이미지" />
            </div>
            <div className="button-container">
              <Link to="/student-login"><Button $karina>로그인</Button></Link>
            </div>
          </LoginTypeBox>
        </LoginTypeContainer>
      </FormSection>
    </Container>
  );
};

export default UserLogin;