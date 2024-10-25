import { useEffect, useState } from 'react';
import {
  Button,
  ClassroomGroup,
  ErrorText, FieldSet,
  FormGroup, FormHeader,
  Input, InputGroup,
  Label,
  Required,
  Select, SuccessText, Title
} from '../common/UserStyledComponents.js';
import styled from 'styled-components';

// 모달 전용 스타일 컴포넌트
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
    background-color: white;
    opacity: 1;
`;

const CreateStudentModal = ({
                              isOpen,
                              onClose,
                              form,
                              errors,
                              isIdChecked,
                              idCheckMessage,
                              handleInputChange,
                              handleCheckDuplicatedId,
                              handleSubmit
                            }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 모달이 닫혀있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <FormHeader>
              <Title>학생 계정 생성</Title>
            </FormHeader>

            <FieldSet>
              <FormGroup>
                <Label>
                  이름<Required>*</Required>
                </Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="이름을 입력해주세요"
                  $hasError={!!errors.name}
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>
                  아이디<Required>*</Required>
                </Label>
                <InputGroup>
                  <Input
                    name="loginId"
                    value={form.loginId}
                    onChange={handleInputChange}
                    placeholder="영문 대/소문자+숫자조합 (6~20자 이내)"
                    $hasError={!!errors.loginId}
                  />
                  <Button type="button" onClick={handleCheckDuplicatedId}
                          disabled={!form.loginId || form.loginId.length < 6 || errors.loginId}>
                    중복 확인
                  </Button>
                </InputGroup>
                {errors.loginId && <ErrorText>{errors.loginId}</ErrorText>}
                {idCheckMessage && (
                  <SuccessText $isSuccess={isIdChecked}>{idCheckMessage}</SuccessText>
                )}
              </FormGroup>

              <FormGroup>
                <Label>
                  비밀번호<Required>*</Required>
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  placeholder="영문 대/소문자+특수문자조합(9~20자 이내)"
                  $hasError={!!errors.password}
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>
                  비밀번호 확인<Required>*</Required>
                </Label>
                <Input
                  type="password"
                  name="passwordCheck"
                  value={form.passwordCheck}
                  onChange={handleInputChange}
                  placeholder="비밀번호 확인을 위해 다시 한번 입력해주세요"
                  $hasError={!!errors.passwordMatch}
                />
                {errors.passwordMatch && <ErrorText>{errors.passwordMatch}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>
                  반 정보<Required>*</Required>
                </Label>
                <ClassroomGroup>
                  <Select
                    name="grade"
                    value={form.grade}
                    onChange={handleInputChange}
                    $hasError={!!errors.grade}
                  >
                    <option value="">학년</option>
                    <option value="1">1학년</option>
                    <option value="2">2학년</option>
                    <option value="3">3학년</option>
                  </Select>
                  <Input
                    name="classNumber"
                    value={form.classNumber}
                    onChange={handleInputChange}
                    placeholder="반 이름"
                    maxLength={10}
                    $hasError={!!errors.classNumber}
                  />
                </ClassroomGroup>
                {(errors.grade || errors.classNumber) && (
                  <ErrorText>
                    {errors.grade || errors.classNumber}
                  </ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <Button type="submit" $primary style={{ width: '100%' }}>
                  생성하기
                </Button>
                <Button type="button" onClick={onClose} style={{ width: '100%', marginTop: '0.5rem' }}>
                  취소
                </Button>
              </FormGroup>
            </FieldSet>
          </form>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default CreateStudentModal;