import { useEffect, useState } from 'react';
import { ModalContainer, ModalContent, Overlay } from '../common/ModalOverlayComponent.js';
import {
  Button,
  ErrorText, FieldSet,
  FormGroup,
  FormHeader,
  Input,
  JoinButtonGroup,
  Label, Required,
  Title
} from '../common/UserStyledComponents.js';
import { getTeacherByClassroomId } from '../../api/classroom/classroom.js';
import Loading from '../common/Loading.jsx';

const initForm = {
  username       : '',
  password       : '',
  confirmPassword: ''
};

const initErrors = {
  username       : '',
  password       : '',
  confirmPassword: ''
};

const TeacherUpdateFormModal = ({ isOpen, onClose, selectedUser }) => {
  const [teacher, setTeacher] = useState({});
  const [updateForm, setUpdateForm] = useState(initForm);
  const [errors, setErrors] = useState(initErrors);
  const [isLoading, setIsLoading] = useState(false);

  const fetchingUser = async (id) => {
    try {
      const result = await getTeacherByClassroomId(id);
      if (result.status === 200) setTeacher(result.data);

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
  }, []);

  const handleSubmit = () => {

  };

  const handleChange = () => {
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
                <Title $isModal></Title>
              </FormHeader>

              <form onSubmit={handleSubmit}>
                <FieldSet>
                  <FormGroup>
                    <Label>
                      이름<Required>*</Required>
                    </Label>
                    <Input
                      type="text"
                      name="username"
                      value={teacher.username}
                      onChange={handleChange}
                      placeholder="이름을 입력하세요"
                      $hasError={!!errors.username}
                    />
                    {errors.username && <ErrorText>{errors.username}</ErrorText>}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      아이디<Required>*</Required>
                    </Label>
                    <Input
                      type="text"
                      name="loginId"
                      value={teacher.loginId}
                      readOnly
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      새 비밀번호<Required>*</Required>
                    </Label>
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
                    <Label>
                      비밀번호 확인<Required>*</Required>
                    </Label>
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