import styled from 'styled-components';

const StudentItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem; // 패딩 증가
    height: 115px; // 높이 설정
    box-sizing: border-box;
`;

const StudentInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem; // gap 증가
`;

const Avatar = styled.div`
    width: 3rem; // 크기 증가
    height: 3rem; // 크기 증가
    background-color: #f3f4f6;
    border-radius: 9999px;
`;

const StudentName = styled.span`
    font-size: 1.1rem; // 폰트 크기 증가
`;

const DeleteButton = styled.button`
    padding: 0.75rem 1.5rem; // 패딩 증가
    border-radius: 9999px;
    border: 1px solid #FEE2E2;
    color: #DC2626;
    background: transparent;
    font-size: 1rem; // 폰트 크기 증가
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #FEF2F2;
    }
`;

const StudentListItem = ({ student, handleDelete }) => {
  return (
    <StudentItem>
      <StudentInfo>
        <Avatar />
        <StudentName>{student.fullName} ({student.loginId})</StudentName>
      </StudentInfo>
      <DeleteButton onClick={() => handleDelete()}>계정 삭제</DeleteButton>
    </StudentItem>
  );
};

export default StudentListItem;