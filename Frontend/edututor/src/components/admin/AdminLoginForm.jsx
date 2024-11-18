import {
  Button,
  ErrorText,
  FieldSet,
  FormContainer,
  FormGroup,
  FormHeader,
  FormSection,
  Input,
  Label, Required,
  Title
} from '../../components/common/UserStyledComponents.js';


const AdminLoginForm = ({ errors, handleSubmit, handleInputChange }) => {
  return (
    <FormSection>
      <FormHeader>
        <Title>에듀튜터 관리자 로그인</Title>
      </FormHeader>

      <FormContainer>
        <FieldSet>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="loginId">아이디<Required>*</Required></Label>
              <Input
                id="loginId"
                name="loginId"
                onChange={handleInputChange}
                $hasError={!!errors.loginId}
              />
              {errors.loginId && <ErrorText>{errors.loginId}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">비밀번호<Required>*</Required></Label>
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
  );
};

export default AdminLoginForm;