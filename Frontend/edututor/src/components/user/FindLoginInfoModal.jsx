import {ModalContainer, ModalContent, Overlay} from '../common/ModalOverlayComponent.js';
import Loading from '../common/Loading.jsx';
import {Button, ErrorText, FormGroup, FormHeader, Input, Label, Title} from '../common/UserStyledComponents.js';
import {useEffect, useState} from 'react';
import {findId, findPassword} from '../../api/user/user.js';
import {showALert} from '../../utils/SwalAlert.js';

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
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (findType === 'loginId') {
      if (!formData.email) {
        const message = {icon: 'error', title: '이메일을 입력해주세요.'};
        showALert(message);
        return;
      }
    } else {
      if (!formData.loginId) {
        const message = {icon: 'error', title: '아이디를 입력해주세요.'};
        showALert(message);
        return;
      }
      if (!formData.email) {
        const message = {icon: 'error', title: '이메일을 입력해주세요.'};
        showALert(message);
        return;
      }
    }

    try {
      setIsSending(true);

      if (findType === 'loginId') {
        await findId({email: formData.email});
        const message = {
          icon             : 'success',
          title            : '입력하신 이메일로 아이디가 전송되었습니다.',
          confirmButtonText: '확인'
        };
        showALert(message)
            .then(() => {
              onClose();
            });
      } else {
        await findPassword(formData);
        const message = {
          icon             : 'success',
          title            : '입력하신 이메일로 임시 비밀번호가 전송되었습니다.',
          confirmButtonText: '확인'
        };
        showALert(message)
            .then(() => {
              onClose(); // 모달 닫기
            });
      }
    } catch (error) {
      console.error('Failed to process request: ', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!isOpen) {
      setFormData(initForm);
      setErrors(initErrors);
      setIsSending(false)
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
      <Overlay onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalContent>
            {isLoading ? (
                <Loading/>
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
                        <Button $primary disabled={isSending}>
                          {isSending ? '전송중...' : '아이디 찾기'}
                        </Button>
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
                        <Button $primary disabled={isSending}>
                          {isSending ? '전송중...' : '비밀번호 찾기'}
                        </Button>
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