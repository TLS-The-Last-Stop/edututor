import {
  Button,
  Container, ErrorText, FieldSet,
  FormContainer,
  FormGroup,
  FormHeader,
  FormSection, Input,
  Label,
  Title
} from '../../components/common/UserStyledComponents.js';


const AdminLoginForm = ({ errors, handleSubmit, handleInputChange }) => {
  return (
    <Container style={{ maxWidth: '700px', width: '100%' }}>
      <FormSection>
        <FormHeader>
          <Title>로그인</Title>
        </FormHeader>

        <FormContainer style={{ width: '100%' }}>
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
                  type="password"
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
  );
};

export default AdminLoginForm;