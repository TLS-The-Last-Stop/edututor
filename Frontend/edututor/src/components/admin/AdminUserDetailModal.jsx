import Loading from '../common/Loading.jsx';
import {
  Button,
  FormGroup,
  FormHeader,
  Input,
  JoinButtonGroup,
  Label,
  Title
} from '../common/UserStyledComponents.js';
import formatData from '../../utils/dateFormat.js';
import { ModalContainer, ModalContent, Overlay } from '../common/ModalOverlayComponent.js';


const AdminUserDetailModal = ({
                                isOpen,
                                onClose,
                                selectedUser,
                                handleSubmit,
                                isLoading
                              }) => {

  if (!isOpen) return null;
  console.log(selectedUser);
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalContent>
          {isLoading ? (
            <Loading />
          ) : selectedUser ? (
            <>
              <FormHeader>
                <Title $isModal>
                  {selectedUser.role === 'TE' ? (
                    `${selectedUser.username} 선생님 회원 정보`
                  ) : (
                    `${selectedUser.username}님 회원 정보`
                  )}
                </Title>
              </FormHeader>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>이름</Label>
                  <Input
                    type="text"
                    name="username"
                    value={selectedUser?.username || ''}
                    disabled
                    readOnly
                  />
                </FormGroup>

                <FormGroup>
                  <Label>아이디</Label>
                  <Input
                    type="text"
                    name="loginId"
                    value={selectedUser?.loginId || ''}
                    readOnly
                    disabled
                  />
                </FormGroup>

                <FormGroup>
                  <Label>소속된 반</Label>
                  <Input
                    type="text"
                    name="loginId"
                    value={selectedUser?.classroom.classroomName || ''}
                    readOnly
                    disabled
                  />
                </FormGroup>

                <FormGroup>
                  <Label>가입일</Label>
                  <Input
                    type="text"
                    name="loginId"
                    value={formatData(selectedUser?.createdAt) || ''}
                    readOnly
                    disabled
                  />
                </FormGroup>

                <JoinButtonGroup>
                  <Button type="button" onClick={onClose}>
                    취소
                  </Button>
                  <Button type="submit" onClick={(e) => handleSubmit(e, selectedUser)} $primary>
                    회원 탈퇴
                  </Button>
                </JoinButtonGroup>
              </form>
            </>) : (
            <div>회원 정보를 가져오는데 실패했습니다.</div>
          )}
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default AdminUserDetailModal;