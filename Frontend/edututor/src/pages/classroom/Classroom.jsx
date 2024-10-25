import { useEffect, useState } from 'react';
import CreateStudent from '../../components/classroom/CreateStudent.jsx';
import StudentList from '../../components/classroom/StudentList.jsx';
import styled from 'styled-components';

const initStudent = {
  id      : '',
  loginId : '',
  fullName: ''
};

const Container = styled.main`
    min-height: 100vh;
    padding: 2rem;
`;

const ContentWrapper = styled.article`
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
`;

const Classroom = () => {
  const [students, setStudents] = useState([initStudent]);

  useEffect(() => {
    setStudents([{ id: 1, loginId: 'suwan', fullName: '이수완' }, { id: '2', loginId: 'duwan', fullName: '이두완' }]);
  }, []);

  const handleDelete = (studentId) => {
    setStudents(students.filter(student => student.loginId !== studentId));
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>구성원 관리</Title>
          <CreateStudent />
        </Header>
        <StudentList students={students} handleDelete={handleDelete} />
      </ContentWrapper>
    </Container>
  );
};

export default Classroom;