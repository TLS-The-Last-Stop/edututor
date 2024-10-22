import styled from 'styled-components';

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

const FirstSection = styled.section`
    margin: 0 auto;
    padding: 40px 20px;
    border: 1px solid #9b9b9b;
    border-radius: 15px;
    max-width: 1300px;
    width: 100%;
    background: khaki;
    height: 550px;
`;

const SecondSection = styled.section`
    margin: 0 auto;
    padding: 40px 20px;
    border: 1px solid #9b9b9b;
    border-radius: 15px;
    max-width: 1300px;
    width: 100%;
    background: khaki;
    height: 480px; // gap의 절반만큼 빼줌
    display: flex;
`;

const LeftArticle = styled.article`
    background: orange;
    width: 50%;
    border: 1px solid brown;
    height: 100%;
    padding-right: 30px;
`;

const RighttArticle = styled.article`
    background: orange;
    width: 45%;
    border: 1px solid brown;
    height: 100%;
`;

const Content = () => {
  return (
    <ContentContainer>
      <FirstSection><h1>디지몬</h1></FirstSection>
      <SecondSection>
        <LeftArticle></LeftArticle>
        <RighttArticle></RighttArticle>
      </SecondSection>
    </ContentContainer>
  );
};

export default Content;