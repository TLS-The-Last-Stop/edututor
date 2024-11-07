import { ModalContainer, ModalContent, Overlay } from '../common/ModalOverlayComponent.js';
import Loading from '../common/Loading.jsx';
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
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { findId, findPassword } from '../../api/user/user.js';

const initForm = {
  loginId: '',
  email  : ''
};

const initErrors = {
  loginId: '',
  email  : ''
};

const FindLoginInfoModal = ({
                              isOpen,
                              onClose,
                              isLoading,
                              findType
                            }) => {

  const [formData, setFormData] = useState(initForm);
  const [errors, setErrors] = useState(initErrors);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (findType === 'loginId') {
      if (!formData.email) {
        Swal.fire({
          icon : 'error',
          title: '이메일을 입력해주세요.'
        });
        return;
      }
    } else {
      if (!formData.loginId) {
        Swal.fire({
          icon : 'error',
          title: '아이디를 입력해주세요.'
        });
        return;
      }
      if (!formData.email) {
        Swal.fire({
          icon : 'error',
          title: '이메일을 입력해주세요.'
        });
        return;
      }
    }

    try {
      if (findType === 'loginId') {
        const result = await findId({ email: formData.email });

        Swal.fire({
          icon             : 'success',
          title            : '입력하신 이메일로 아이디가 전송되었습니다.',
          confirmButtonText: '확인'
        }).then(() => {
          onClose();
        });
      } else {
        const result = await findPassword(formData);

        Swal.fire({
          icon             : 'success',
          title            : '입력하신 이메일로 임시 비밀번호가 전송되었습니다.',
          confirmButtonText: '확인'
        }).then(() => {
          onClose(); // 모달 닫기
        });
      }
    } catch (error) {
      console.error('Failed to process request: ', error);
      Swal.fire({
        icon             : 'error',
        title            : '처리 중 오류가 발생했습니다.',
        text             : error.response?.data?.message || '잠시 후 다시 시도해주세요.',
        confirmButtonText: '확인'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!isOpen) {
      setFormData(initForm);
      setErrors(initErrors);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          {isLoading ? (
            <Loading />
          ) : (
            findType === 'loginId' ? (
              <>
                <FormHeader>
                  <Title>아이디 찾기</Title>
                </FormHeader>

                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>이메일</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="가입하실때 작성한 이메일을 적어주세요."
                      $hasError={!!errors.email}
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                  </FormGroup>

                  <Button $primary>아이디 찾기</Button>
                </form>
              </>) : (
              <>
                <FormHeader>
                  <Title>비밀번호 찾기</Title>
                </FormHeader>

                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>아이디</Label>
                    <Input
                      type="text"
                      name="loginId"
                      value={formData.loginId}
                      onChange={handleChange}
                      placeholder="로그인하는 아이디를 적어주세요."
                      $hasError={!!errors.loginId}
                    />
                    {errors.loginId && <ErrorText>{errors.loginId}</ErrorText>}
                  </FormGroup>

                  <FormGroup>
                    <Label>이메일</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="가입하실때 작성한 이메일을 적어주세요."
                      $hasError={!!errors.email}
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                  </FormGroup>

                  <Button $primary>비밀번호 찾기</Button>
                </form>
              </>
            )
          )}
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default FindLoginInfoModal;