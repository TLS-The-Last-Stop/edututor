import styled from 'styled-components';
import {
  Button,
  ErrorText,
  FormGroup,
  FormHeader,
  Input,
  JoinButtonGroup,
  Label,
  Title
} from '../common/UserStyledComponents.js';

const Overlay = styled.section`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    pointer-events: auto;
    opacity: 1;

    &, &:hover {
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
    }
`;

const ModalContainer = styled.div`
    background-color: white;
    width: 100%;
    max-width: 600px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 1;
`;

const ModalContent = styled.main`
    padding: 2rem;
`;

const StudentDetailModal = ({
                              isOpen,
                              onClose,
                              student,
                              handleChange,
                              handleSubmit,
                              updateForm,
                              isLoading,
                              errors
                            }) => {

  if (!isOpen) return null;
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalContent>
          {isLoading ? (
            <div>로딩 중...</div>
          ) : student ? (
            <>
              <FormHeader>
                <Title $isModal>학생 정보</Title>
              </FormHeader>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>이름</Label>
                  <Input
                    type="text"
                    name="username"
                    value={student.username}
                    onChange={handleChange}
                    placeholder="이름을 입력하세요"
                    $hasError={!!errors.username}
                  />
                  {errors.username && <ErrorText>{errors.username}</ErrorText>}
                </FormGroup>
                <FormGroup>
                  <Label>아이디</Label>
                  <Input
                    type="text"
                    name="loginId"
                    value={student.loginId}
                    readOnly
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Label>새 비밀번호</Label>
                  <Input
                    type="password"
                    name="password"
                    value={updateForm.password}
                    onChange={handleChange}
                    placeholder="새 비밀번호를 입력하세요"
                    $hasError={!!errors.password}
                  />
                  {errors.password && <ErrorText>{errors.password}</ErrorText>}
                </FormGroup>
                <FormGroup>
                  <Label>비밀번호 확인</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={updateForm.confirmPassword}
                    onChange={handleChange}
                    placeholder="비밀번호를 다시 입력하세요"
                    $hasError={!!errors.confirmPassword}
                  />
                  {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
                </FormGroup>
                {errors.submit && <ErrorText>{errors.submit}</ErrorText>}
                <JoinButtonGroup>
                  <Button type="button" onClick={onClose}>
                    취소
                  </Button>
                  <Button type="submit" onClick={handleSubmit} $primary>
                    저장
                  </Button>
                </JoinButtonGroup>
              </form>
            </>
          ) : (
            <div>학생 정보를 불러오는데 실패했습니다.</div>
          )}
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default StudentDetailModal;