// Styled Components
import styled from 'styled-components';

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


const AdminUserList = ({ users }) => {
  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
          <tr>
            <Th>아이디</Th>
            <Th>이름</Th>
            <Th>이메일</Th>
            <Th>가입일</Th>
            <Th>상태</Th>
          </tr>
          </thead>
          <tbody>
          {users.map(user => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.createdAt}</Td>
              <Td>
                <StatusBadge $isActive={user.status === 'active'}>
                  {user.status === 'active' ? '활성' : '비활성'}
                </StatusBadge>
              </Td>
            </Tr>
          ))}
          </tbody>
        </Table>
      </TableContainer>

      <PaginationContainer>
        <PaginationButton disabled>이전</PaginationButton>
        <PageInfo>1 / 1</PageInfo>
        <PaginationButton disabled>다음</PaginationButton>
      </PaginationContainer>
    </Container>
  );
};

export default AdminUserList;