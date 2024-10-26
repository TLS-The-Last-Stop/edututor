import styled from 'styled-components';
import StudentListItem from './StudentListItem.jsx';

const StudentCard = styled.div`
    background: white;
    border-radius: 0.5rem;
    height: 115px;
    box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem; // 카드 사이 간격

    &:last-child {
        margin-bottom: 0; // 마지막 카드는 마진 제거
    }
`;

const StudentList = ({ students, handleDelete }) => {
  return (
    <>
      {students.map(student => (
        <StudentCard key={student.id}>
          <StudentListItem student={student} handleDelete={handleDelete} />
        </StudentCard>
      ))}
    </>
  );
};

export default StudentList;