import CourseSection from '../../components/main/CourseSection.jsx';
import styled from 'styled-components';
import InfoSection from '../../components/main/InfoSection.jsx';
import FloatingChat from '../../components/main/FloatingChat.jsx';

const HomeContainer = styled.div`
    max-width: 1300px; // 전체 컨테이너 최대 너비 설정
    margin: 40px auto;
    width: 100%;
`;

const Section = styled.section`
    width: 100%; // 부모 컨테이너 너비에 맞춤
    border-radius: 15px;
    box-sizing: border-box;

    & + & { // 연속된 섹션 간 간격
        margin-top: 40px;
    }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Section>
        <CourseSection />
      </Section>
      <Section>
        <InfoSection />
      </Section>
      <FloatingChat />
    </HomeContainer>
  );
};

export default Home;