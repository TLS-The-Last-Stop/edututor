import styled from 'styled-components';
import ExamList from '../../components/exam/ExamList.jsx';
import CourseList from '../../components/exam/CourseList.jsx';

const Container = styled.div`
    width: 1400px;
    margin: 0 auto;
    display: flex;
    border: 1px solid #555555;
    border-radius: 15px;
    overflow: hidden;
`;

const Main = styled.main`
    width: 1120px;
    background: #3b82f6;
    min-height: 700px;
`;

const Aside = styled.aside`
    width: 280px;
    background: #4caf50;
    min-height: 700px;
    padding: 20px;
    box-sizing: border-box;
`;

const ExamSharePage = () => {
  return (
    <Container>
      <Aside>
        <CourseList />
      </Aside>
      <Main>
        <ExamList />
      </Main>
    </Container>
  );
};

export default ExamSharePage;