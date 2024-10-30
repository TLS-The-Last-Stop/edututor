import {
  Button,
  Container, ErrorText, FieldSet,
  FormContainer,
  FormGroup,
  FormHeader,
  FormSection, Input,
  Label, SubTitle,
  Title
} from '../../components/common/UserStyledComponents.js';
import { useState } from 'react';
import { login } from '../../api/user/user.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext.jsx';

const initForm = {
  loginId : '',
  password: '',
  type    : 'SU'
};

const initErrors = {
  loginId : '',
  password: ''
};

const StudentLogin = () => {
  const [formData, setFormData] = useState(initForm);
  const [errors, setErrors] = useState(initErrors);
  const { updateUserInfo } = useAuth();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.loginId) {
      setErrors(prev => ({
        ...prev,
        loginId: '아이디를 입력해주세요.'
      }));
      return;
    }

    if (!formData.password) {
      setErrors(prev => ({
        ...prev,
        password: '비밀번호를 입력해주세요.'
      }));
      return;
    }

    try {
      const result = await login(formData);
      localStorage.setItem('info', JSON.stringify(result));
      updateUserInfo();

      if (result) navigate('/');
    } catch (error) {
      const data = error.response?.data;
      if (data) {
        const { code, message } = data;
        if (code === 'AUTH001') {
          setErrors(prev => ({
            ...prev,
            loginId: message
          }));
        } else if (code === 'AUTH002') {
          setErrors(prev => ({
            ...prev,
            password: message
          }));
        } else if (code === 'AUTH004') {
          setErrors(prev => ({
            ...prev,
            loginId : '없는 계정입니다.',
            password: '없는 계정입니다.'
          }));
        }
      } else {
        alert('로그인에 실패하셨습니다.');
      }
    }
  };

  return (
    <>
      <Container>
        <FormSection>
          <FormHeader>
            <Title>로그인</Title>
            <SubTitle>선생님이 만들어준 계정으로 로그인하기</SubTitle>
          </FormHeader>

          <FormContainer>
            <FieldSet>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="loginId">아이디</Label>
                  <Input
                    id="loginId"
                    name="loginId"
                    onChange={handleInputChange}
                    $hasError={!!errors.loginId}
                  />
                  {errors.loginId && <ErrorText>{errors.loginId}</ErrorText>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    name="password"
                    onChange={handleInputChange}
                    $hasError={!!errors.password}
                  />
                  {errors.password && <ErrorText>{errors.password}</ErrorText>}
                </FormGroup>

                <FormGroup>
                  <Button $primary>로그인</Button>
                </FormGroup>
              </form>
            </FieldSet>
          </FormContainer>
        </FormSection>
      </Container>
    </>
  );
};

export default StudentLogin;