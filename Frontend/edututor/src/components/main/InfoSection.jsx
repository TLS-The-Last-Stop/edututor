import styled from 'styled-components';
import ai from '../../assets/icon/ai.png';
import db from '../../assets/icon/db.png';
import 시각화 from '../../assets/icon/시각화.png';
import 평가 from '../../assets/icon/평가.png';

const InfoContainer = styled.div`
    padding: 40px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 40px;

    @media (max-width: 1024px) {
        flex-direction: column;
        padding: 20px;
    }
`;

// 왼쪽 Features 섹션
const FeaturesSection = styled.div`
    flex: 1;
    width: 100%;
`;

const FeaturesTitle = styled.p`
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const FeaturesSummary = styled.div`
    text-align: center;
    display: block;
    margin-top: 10px;
    color: #7e7e7e;
    line-height: 1.5;
    margin-bottom: 15px;
`;

const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const FeatureCard = styled.div`
    box-sizing: border-box;
    padding: 24px;
    border-radius: 12px;
    background: ${props => props.$primary ? '#4285f4' : 'white'};
    border: 1px solid #eaeaea;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;

    @media (max-width: 768px) {
        padding: 16px;
        flex-direction: column;
        text-align: center;
    }

    @media (max-width: 1024px) {
        padding: 20px;
    }
`;

const FeatureIcon = styled.img`
    width: 50px;
    height: 50px;
    object-fit: contain;

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
    }
`;

const FeatureContent = styled.div`
    flex: 1;
    width: 100%;

    h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }

    p {
        font-size: 14px;
        line-height: 1.4;
        font-weight: 400;

        @media (max-width: 768px) {
            font-size: 13px;
        }
    }
`;

const NoticeSection = styled.div`
    flex: 1;
    // 여기에 오른쪽 섹션 스타일 추가
`;

const DownloadWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const DownloadButton = styled.button`
    width: 50%;
    height: 56px;
    border-radius: 25px;
    font-size: 18px;
    font-weight: 600;

    border: ${props => props.$teacher ? '' : '1px solid #108eff'};
    background: ${props => props.$teacher ? '#108eff' : '#fff'};
    color: ${props => props.$teacher ? '#fff' : '#171616FF'};
`;

const InfoSection = () => {
  const features = [
    {
      id     : 1,
      title1 : '평가 문항',
      title2 : '데이터 베이스',
      primary: true,
      icon   : db
    },
    {
      id     : 2,
      title1 : 'CBT 기반',
      title2 : '온라인 평가서비스',
      primary: false,
      icon   : 평가
    },
    {
      id     : 3,
      title1 : 'AI 맞춤형',
      title2 : '학습 서비스',
      primary: false,
      icon   : ai
    },
    {
      id     : 4,
      title1 : 'LMS 및 학습분석',
      title2 : '시각화 리포트',
      primary: true,
      icon   : 시각화
    }
  ];

  return (
    <InfoContainer>
      <FeaturesSection>
        <FeaturesTitle>Edu Tutor 특징</FeaturesTitle>
        <FeaturesSummary>
          <p>수업 진도에 맞춘 차시별 진단·형성·단원 평가 제공</p>
          <p>오답 유형에 따른 AI 유사 문제 추천을 통한 자기주도 학습 유도</p>
          <p>평가별 리포트 및 종합 리포트 제공</p>
        </FeaturesSummary>
        <FeaturesGrid>
          {features.map(feature => (
            <FeatureCard key={feature.id} $primary={feature.primary}>
              <FeatureIcon src={feature.icon} alt={feature.title} />
              <FeatureContent $primary={feature.primary}>
                <h3>{feature.title1}</h3>
                <h3>{feature.title2}</h3>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <NoticeSection>
        <DownloadWrapper>
          <DownloadButton $teacher>교사용 이용 가이드</DownloadButton>
          <DownloadButton>학생용 이용 가이드</DownloadButton>
        </DownloadWrapper>
      </NoticeSection>
    </InfoContainer>
  );
};

export default InfoSection;