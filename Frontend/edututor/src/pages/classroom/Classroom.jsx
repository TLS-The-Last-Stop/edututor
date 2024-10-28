import { useEffect, useState } from 'react';
import CreateStudent from '../../components/classroom/CreateStudent.jsx';
import StudentList from '../../components/classroom/StudentList.jsx';
import styled from 'styled-components';
import { getAllStudent } from '../../api/classroom/classroom.js';
import { getUserInfo } from '../../utils/auth.js';
import Loading from '../../components/common/Loading.jsx';
import { ErrorText } from '../../components/common/UserStyledComponents.js';
import EmptyState from '../../components/classroom/EmptyState.jsx';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllStudent();
  }, []);

  const fetchAllStudent = async () => {
    try {
      const userInfo = getUserInfo(true);
      const result = await getAllStudent(userInfo.classroom.id);

      if (result.status === 200) {
        setStudents(result.data);
      } else {
        setError('학생 목록을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error fetching students: ', error);
      setError('서버 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (studentId) => {
    setStudents(students.filter(student => student.loginId !== studentId));
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>구성원 관리</Title>
          <CreateStudent fetchAllStudent={fetchAllStudent} />
        </Header>
        {students.length === 0 ? (
          <EmptyState />
        ) : (
          <StudentList students={students} handleDelete={handleDelete} />
        )}
      </ContentWrapper>
    </Container>
  );
};

export default Classroom;