import styled from 'styled-components';
import { Fragment, useState } from 'react';
import AdminUserDetailModal from './AdminUserDetailModal.jsx';
import { getUser, removeStudent } from '../../api/user/user.js';
import { showALert } from '../../utils/SwalAlert.js';

const Container = styled.div`
    padding: 20px;
`;

const TableContainer = styled.div`
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        text-align: center;
`;

const Th = styled.th`
    background-color: #f9fafb;
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
`;

const Tr = styled.tr`
    cursor: pointer;

    &:hover {
        background-color: #f9fafb;
    }
`;

const StatusBadge = styled.span`
    padding: 4px 8px;
    border-radius: 9999px;
    font-size: 0.875rem;
    ${props => props.$isActive ? `
    background-color: #def7ec;
    color: #03543f;
  ` : `
    background-color: #fde8e8;
    color: #9b1c1c;
  `}
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
`;

const PaginationButton = styled.button`
    padding: 8px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background-color: white;
    cursor: pointer;

    &:disabled {
        background-color: #f3f4f6;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #f9fafb;
    }
`;

const PageInfo = styled.span`
    color: #374151;
`;

const ExpandButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    color: #4b5563;

    width: 28px;
    height: 28px;
    line-height: 20px;

    &:hover {
        background-color: #f3f4f6;
        border-radius: 4px;
    }
`;

const StudentRow = styled(Tr)`
    background-color: #f9fafb;

    td {
        //padding-left: 2rem;
        background: #e1e1e1;
    }
`;


const AdminUserList = ({ teachers, students, fetchingAllUser }) => {
  const [expandedTeachers, setExpandedTeachers] = useState(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const toggleTeacher = (teacherId) => {
    setExpandedTeachers(prev => {
      const newSet = new Set(prev);

      if (newSet.has(teacherId)) newSet.delete(teacherId);
      else newSet.add(teacherId);

      return newSet;
    });
  };

  // 선생님의 반에 속한 학생들 찾기
  const createGroupByClassroomId = (teacher) => {
    return students.filter(student => student.classroom.id === teacher.classroom?.id);
  };

  const handleOpenModal = async (userId) => {
    setIsLoading(true);

    try {
      const result = await getUser(userId);

      if (result.status === 200) {
        setSelectedUser(result.data);
        setIsOpen(true);
      } else {
        const message = { icon: 'error', title: '회원을 불러오는데 실패했습니다.' };
        showALert(message);

        return;
      }
    } catch (error) {
      console.error('Failed to fetch user info: ', error);
    } finally {
      setIsLoading(false);
    }

  };

  const handleSubmit = (e, selectedUser) => {
    e.preventDefault();

    if (selectedUser.role === 'TE') {
      const message = {
        icon             : 'warning',
        title            : '회원을 불러오는데 실패했습니다.',
        text             : '정말 삭제하시겠습니까?',
        showCancelButton : true,
        cancelButtonText : '아니오',
        confirmButtonText: '예'
      };
      showALert(message)
        .then(async (result) => {
          if (result.isConfirmed) {
            const result = await removeStudent(selectedUser.id);
            if (result.status === 204) {
              handleCloseModal();
              fetchingAllUser();
            } else {
              const message = { icon: 'error', title: '회원을 불러오는데 실패했습니다.' };
              showALert(message);
            }
          }
        });
    }

    if (selectedUser.role === 'SU') {
      const message = {
        icon             : 'warning',
        title            : '등록된 학생을',
        text             : '탈퇴시키겠습니까?',
        showCancelButton : true,
        cancelButtonText : '아니오',
        confirmButtonText: '예'
      };
      showALert(message)
        .then(async (result) => {
          if (result.isConfirmed) {
            const result = await removeStudent(selectedUser.id);
            if (result.status === 204) {
              handleCloseModal();
              fetchingAllUser();
            } else {
              const message = { icon: 'error', title: '회원을 불러오는데 실패했습니다.' };
              showALert(message);
            }
          }
        });
    }

  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
          <tr>
            <Th>등록된학생</Th>
            <Th>회원번호</Th>
            <Th>이름</Th>
            <Th>이메일</Th>
            <Th>연락처</Th>
            <Th>반 정보</Th>
            <Th>구분</Th>
          </tr>
          </thead>
          <tbody>
          {teachers.length > 0 ? (
            teachers.map(teacher => (
              <Fragment key={teacher.id}>
                <Tr onClick={() => handleOpenModal(teacher.id)}>
                  <Td onClick={(e) => {
                    e.stopPropagation();
                    toggleTeacher(teacher.id);
                  }}>
                    <ExpandButton>
                      {expandedTeachers.has(teacher.id) ? '▼' : '▶'}
                    </ExpandButton>
                  </Td>
                  <Td>{teacher.id}</Td>
                  <Td>{teacher.username}</Td>
                  <Td>{teacher.email}</Td>
                  <Td>{teacher.phoneNum}</Td>
                  <Td>
                    {teacher.classroom?.classroomName}
                    ({teacher.classroom?.grade})
                  </Td>
                  <Td>선생님</Td>
                </Tr>
                {expandedTeachers.has(teacher.id) && (
                  createGroupByClassroomId(teacher).length > 0 ? (
                    createGroupByClassroomId(teacher).map(student => (
                      <StudentRow key={student.id} onClick={() => handleOpenModal(student.id)}>
                        <Td></Td>
                        <Td>{student.id}</Td>
                        <Td>{student.username}</Td>
                        <Td>{student.loginId}</Td>
                        <Td>-</Td>
                        <Td>{teacher.classroom?.classroomName}</Td>
                        <Td>학생</Td>
                      </StudentRow>
                    ))
                  ) : (
                    <StudentRow>
                      <Td colSpan={7} style={{ textAlign: 'center' }}>등록된 학생이 없습니다.</Td>
                    </StudentRow>
                  ))
                }
              </Fragment>
            ))
          ) : (
            <Tr>
              <Td colSpan={7} style={{ textAlign: 'center' }}>등록된 선생님이 없습니다.</Td>
            </Tr>
          )}
          </tbody>
        </Table>
      </TableContainer>

      <PaginationContainer>
        <PaginationButton disabled>이전</PaginationButton>
        <PageInfo>1 / 1</PageInfo>
        <PaginationButton disabled>다음</PaginationButton>
      </PaginationContainer>

      <AdminUserDetailModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        handleSubmit={handleSubmit}
        selectedUser={selectedUser}
        isLoading={isLoading}
      />

    </Container>
  );
};

export default AdminUserList;