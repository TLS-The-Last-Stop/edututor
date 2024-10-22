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

const TabContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;
`;

const TabWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

const TabButton = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 20px;
    font-weight: 500;
    position: relative;
    padding-right: 20px;

    &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background: #721313;
    }

    ${props => props.isActive && `
      color:#007aff;
    `}
`;

const gradeData = {
  elementary: {
    label : '초등',
    grades: ['전체', '초1', '초2', '초3', '초4', '초5', '초6']
  },
  middle    : {
    label : '중등',
    grades: ['전체', '중1', '중2', '중3']
  },
  high      : {
    label : '고등',
    grades: ['전체', '고1', '고2', '고3']
  }
};

const GradeList = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const GradeItem = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    color: ${props => props.isActive ? '#333' : '#666'};
    font-weight: ${props => props.isActive ? '600' : ''};
    cursor: pointer;

    &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background: #721313;
    }
`;

const MainSection = () => {
  const [activeTab, setActiveTab] = useState('elementary');
  const [activeGrade, setActiveGrade] = useState('전체');

  return (
    <>
      <FirstSection>
        <FirstSectionInner>
          <TitleWrapper>지니아튜터 학습 과정</TitleWrapper>
          <TabContainer>
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

            <GradeList>
              {gradeData[activeTab].grades.map(grade => (
                <GradeItem key={grade} isActive={activeGrade === grade} onClick={() => setActiveGrade(grade)}>
                  {grade}
                </GradeItem>
              ))}
            </GradeList>
          </TabContainer>
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