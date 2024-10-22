import styled from 'styled-components';
import MainSection from '../main/MainSection.jsx';

const ContentContainer = styled.main`
    position: relative;
    top: 120px;
    background: darkmagenta;
    height: 1150px;
    display: flex;
    flex-direction: column;
    gap: 20px; // 섹션 간 간격
    padding-top: 40px;
    padding-bottom: 270px;
`;


const Content = () => {
  return (
      <ContentContainer>
        <MainSection></MainSection>
      </ContentContainer>
  );
};

export default Content;