import {
  Button,
  Container, FieldSet,
  FormContainer,
  FormGroup,
  FormHeader,
  FormSection, Input,
  Label, SubTitle,
  Title
} from '../../components/common/UserStyledComponents.js';

const StudentLogin = () => {
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
              <FormGroup>
                <Label htmlFor="loginId">아이디</Label>
                <Input id="loginId" name="loginId" />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" name="password" />
              </FormGroup>

              <FormGroup>
                <Button $primary>로그인</Button>
              </FormGroup>
            </FieldSet>
          </FormContainer>
        </FormSection>
      </Container>
    </>
  );
};

export default StudentLogin;