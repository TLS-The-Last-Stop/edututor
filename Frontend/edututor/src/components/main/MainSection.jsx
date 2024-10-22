import styled from 'styled-components';
import { useState } from 'react';


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

const FirstSectionInner = styled.article`

`;

const TitleWrapper = styled.div`
    font-size: 22px;
    font-weight: 700;

`;

const TapWrapper = styled.div`
    padding: 30px 0;
    height: 25px;
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

const TabWrapper = styled.div`
    display: flex;
    gap: 20px;
    border-bottom: 1px solid #d7d7d7;
`;

const TabButton = styled.div`
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 20px;
    font-weight: 500;

    &:first-child::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background: #e0e0e0;
    }

    ${props => props.isActive && `
      color:#108eff;
      font-weight:bold;
    `}
`;

const MainSection = () => {
  const [activeTab, setActiveTab] = useState('elementary');

  return (
    <>
      <FirstSection>
        <FirstSectionInner>
          <TitleWrapper>이수완️❤️카리나</TitleWrapper>
          <TabWrapper>
            <TabButton
              isActive={activeTab === 'elementary'}
              onClick={() => setActiveTab('elementary')}
            >초등</TabButton>
            <TabButton
              isActive={activeTab === 'middle'}
              onClick={() => setActiveTab('middle')}
            >중등</TabButton>
            <TabButton
              isActive={activeTab === 'high'}
              onClick={() => setActiveTab('high')}
            >고등</TabButton>
          </TabWrapper>
        </FirstSectionInner>
      </FirstSection>
      <SecondSection>
        <LeftArticle></LeftArticle>
        <RighttArticle></RighttArticle>
      </SecondSection>
    </>
  );
};

export default MainSection;