import { useEffect, useState } from 'react';
import { ModalContainer, ModalContent, Overlay } from '../common/ModalOverlayComponent.js';
import {
  Button,
  Divider,
  ErrorText,
  FieldSet,
  FormGroup,
  FormHeader,
  Input,
  JoinButtonGroup,
  Label,
  Select,
  SelectGroup,
  Title
} from '../common/UserStyledComponents.js';
import { getTeacherByClassroomId } from '../../api/classroom/classroom.js';
import Loading from '../common/Loading.jsx';
import { updateTeacher } from '../../api/user/user.js';
import { useNavigate } from 'react-router-dom';
import { showALert } from '../../utils/SwalAlert.js';

const initForm = {
  username       : '',
  password       : '',
  confirmPassword: '',
  phoneFirst     : '010',
  phoneMiddle    : '',
  phoneLast      : ''
};

const initErrors = {
  username       : '',
  password       : '',
  confirmPassword: '',
  phoneMiddle    : false,
  phoneLast      : false
};

const TeacherUpdateFormModal = ({ isOpen, onClose, selectedUser }) => {
  const [teacher, setTeacher] = useState({});
  const [updateForm, setUpdateForm] = useState(initForm);
  const [errors, setErrors] = useState(initErrors);
  const [isLoading, setIsLoading] = useState(false);

  const navigetor = useNavigate();

  const fetchingUser = async (id) => {
    try {
      const result = await getTeacherByClassroomId(id);
      if (result.status === 200) {
        setTeacher(result.data);

        if (result.data.phoneNum) {
          const [phoneFirst, phoneMiddle, phoneLast] = result.data.phoneNum.split('-');
          setUpdateForm(prev => ({
            ...prev,
            phoneFirst,
            phoneMiddle,
            phoneLast
          }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch user: ', error);
    }
  };

  useEffect(() => {
    const user = Object.keys(selectedUser);
    if (user.length) {
      const { id } = selectedUser?.classroom;

      fetchingUser(id);
    }
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdateForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (['loginId', 'password', 'confirmPassword'].includes(name)) validateInput(name, value);
    if (name === 'password' || name === 'confirmPassword') handleconfirmPassword(name, value);
  };

  const validateInput = (name, value) => {
    switch (name) {
      case 'password':
        if (value) {
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,20}$/;
          setErrors(prev => ({
            ...prev,
            password: passwordRegex.test(value) ? '' : '영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함하여 9-20자로 입력해주세요.'
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            password: ''
          }));
        }
        break;
    }
  };

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    const hasNonNumber = /[^0-9]/.test(value);
    const numberOnly = value.replace(/[^0-9]/g, '');

    setErrors(prev => ({
      ...prev,
      [name]: hasNonNumber
    }));

    setUpdateForm(prev => ({
      ...prev,
      [name]: numberOnly
    }));

  };


  const getInputHandler = (e) => {
    const { name } = e.target;
    if (['phoneMiddle', 'phoneLast'].includes(name)) {
      return handleNumberInput(e);
    }

    return handleInputChange(e);
  };

  const handleconfirmPassword = (name, value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,20}$/;

    if (name === 'password') {
      if (value) {
        setErrors(prev => ({
          ...prev,
          password     : passwordRegex.test(value) ? '' : '영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함하여 9-20자로 입력해주세요.',
          passwordMatch: updateForm.confirmPassword !== '' && value !== updateForm.confirmPassword ? '비밀번호가 일치하지 않습니다.' : ''
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          password     : '',
          passwordMatch: ''
        }));
      }
    } else if (name === 'confirmPassword') {
      if (value) {
        setErrors(prev => ({
          ...prev,
          passwordMatch: updateForm.password !== value ? '비밀번호가 일치하지 않습니다.' : ''
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          passwordMatch: ''
        }));
      }
    }

  };

  const validateForm = () => {
    // 패스워드 일치 확인
    if (errors.passwordMatch) {
      const message = { icon: 'warning', title: '비밀번호가 일치하지 않습니다.' };
      showALert(message);
      return false;
    }

    if (updateForm.phoneMiddle.length !== 4 || updateForm.phoneLast.length !== 4) {
      const message = { icon: 'warning', title: '휴대폰 번호를 정확히 입력해주세요.' };
      showALert(message);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = {
      password: updateForm.password,
      phoneNum: `${updateForm.phoneFirst}-${updateForm.phoneMiddle}-${updateForm.phoneLast}`,
      type    : 'TE'
    };

    try {
      const result = await updateTeacher(submitData);

      if (result.status === 204) {
        const message = { icon: 'success', title: '업데이트에 성공하였습니다.' };
        showALert(message);

        setUpdateForm(initForm);
        onClose();
        navigetor('/');
      }
    } catch (error) {
      console.error('Failed to update teacher:', error);
    }

  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalContent>
          {isLoading ? (
            <div><Loading /></div>
          ) : (
            <>
              <FormHeader>
                <Title $isModal>{selectedUser.username}님 회원정보</Title>
              </FormHeader>

              <form onSubmit={handleSubmit}>
                <FieldSet>
                  <FormGroup>
                    <Label style={{ textAlign: 'left' }}>이름</Label>
                    <Input
                      type="text"
                      value={teacher.username}
                      disabled={true}
                    />
                    {errors.username && <ErrorText>{errors.username}</ErrorText>}
                  </FormGroup>

                  <FormGroup>
                    <Label style={{ textAlign: 'left' }}>이메일</Label>
                    <Input
                      type="text"
                      name="username"
                      value={teacher.email}
                      disabled={true}
                    />
                    {errors.username && <ErrorText>{errors.username}</ErrorText>}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="phoneNum" style={{ textAlign: 'left' }}>
                      휴대폰
                    </Label>
                    <SelectGroup>
                      <Select
                        name="phoneFirst"
                        value={updateForm.phoneFirst}
                        onChange={getInputHandler}
                      >
                        <option value="010">010</option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                      </Select>
                      <Divider>-</Divider>
                      <Input
                        name="phoneMiddle"
                        maxLength="4"
                        value={updateForm.phoneMiddle}
                        onChange={getInputHandler}
                        $hasError={errors.phoneMiddle || updateForm.phoneMiddle.length > 0 && updateForm.phoneMiddle.length < 4}
                        $isFilled={updateForm.phoneMiddle.length === 4}
                      />
                      <Divider>-</Divider>
                      <Input
                        name="phoneLast"
                        maxLength="4"
                        value={updateForm.phoneLast}
                        onChange={getInputHandler}
                        $hasError={errors.phoneLast || updateForm.phoneLast.length > 0 && updateForm.phoneLast.length < 4}
                        $isFilled={updateForm.phoneLast.length === 4}
                      />
                    </SelectGroup>
                    {(errors.phoneMiddle || errors.phoneLast) && (
                      <ErrorText>숫자만 입력 가능합니다.</ErrorText>
                    )}
                    {((updateForm.phoneMiddle.length > 0 && updateForm.phoneMiddle.length < 4) ||
                      (updateForm.phoneLast.length > 0 && updateForm.phoneLast.length < 4)) && (
                      <ErrorText style={{ textAlign: 'left' }}>휴대폰 번호는 4자리씩 입력해주세요.</ErrorText>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label style={{ textAlign: 'left' }}>새 비밀번호</Label>
                    <Input
                      type="password"
                      name="password"
                      value={updateForm.password}
                      onChange={getInputHandler}
                      placeholder="새 비밀번호를 입력하세요"
                      $hasError={!!errors.password}
                    />
                    {errors.password && <ErrorText style={{ textAlign: 'left' }}>{errors.password}</ErrorText>}
                  </FormGroup>

                  <FormGroup>
                    <Label style={{ textAlign: 'left' }}>비밀번호 확인</Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={updateForm.confirmPassword}
                      onChange={getInputHandler}
                      placeholder="비밀번호를 다시 입력하세요"
                      $hasError={!!errors.passwordMatch}
                    />
                    {errors.passwordMatch &&
                      <ErrorText style={{ textAlign: 'left' }}>{errors.passwordMatch}</ErrorText>}
                  </FormGroup>

                  <JoinButtonGroup>
                    <Button type="button" onClick={onClose}>
                      취소
                    </Button>
                    <Button type="submit" onClick={handleSubmit} $primary>
                      수정
                    </Button>
                  </JoinButtonGroup>
                </FieldSet>
              </form>
            </>
          )}
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default TeacherUpdateFormModal;