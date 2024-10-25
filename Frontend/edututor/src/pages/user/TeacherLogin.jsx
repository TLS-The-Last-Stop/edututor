import {
  Button,
  Container, ErrorText, FieldSet,
  FormContainer,
  FormGroup,
  FormHeader,
  FormSection, Input,
  Label, LinkGroup, LogoText, SNSButton, SNSButtonGroup, SNSLoginSection, SNSTitle, StyledRouterLink, SubTitle,
  Title
} from '../../components/common/UserStyledComponents.js';
import naver from '../../assets/icon/naver.png';
import kakao from '../../assets/icon/kakao.png';
import google from '../../assets/icon/google.png';
import { useState } from 'react';
import { login } from '../../api/user/user.js';
import { useNavigate } from 'react-router-dom';


const initForm = {
  loginId : '',
  password: '',
  type    : 'teacher'
};

const initErrors = {
  loginId : '',
  password: ''
};

const TeacherLogin = () => {
  const [formData, setFormData] = useState(initForm);
  const [errors, setErrors] = useState(initErrors);

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

  const handleSubmit = async () => {

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
      localStorage.setItem('username', result);

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
            <SubTitle>T셀파에 오신 선생님들을 환영합니다.</SubTitle>
            <p>T셀파에서는 선생님들의 역량 강화 및 수업에</p>
            <p>도움을 드리기 위해 최선을 다하도록 하겠습니다.</p>
          </FormHeader>

          <FormContainer>
            <FieldSet>
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
                  type="password"
                  onChange={handleInputChange}
                  $hasError={!!errors.password}
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
              </FormGroup>

              <LinkGroup>
                <StyledRouterLink to="/find-id">아이디 찾기</StyledRouterLink>
                <StyledRouterLink to="/find-password">비밀번호 찾기</StyledRouterLink>
                <StyledRouterLink to="/join">회원가입</StyledRouterLink>
              </LinkGroup>

              <FormGroup>
                <Button $primary onClick={handleSubmit}>로그인</Button>
              </FormGroup>

              <SNSLoginSection>
                <SNSTitle>SNS 로그인</SNSTitle>
                <SNSButtonGroup>
                  <SNSButton $provider="naver">
                    <img src={naver} alt="naver logo" />
                    <LogoText>네이버</LogoText>
                  </SNSButton>
                  <SNSButton $provider="kakao">
                    <img src={kakao} alt="naver logo" />
                    카카오
                  </SNSButton>
                  <SNSButton $provider="google">
                    <img src={google} alt="naver logo" />
                    구글
                  </SNSButton>
                </SNSButtonGroup>
              </SNSLoginSection>

            </FieldSet>
          </FormContainer>
        </FormSection>
      </Container>
    </>
  );
};

export default TeacherLogin;