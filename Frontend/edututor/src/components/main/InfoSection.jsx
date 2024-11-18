import styled from 'styled-components';
import featuresData from '../../data/features.json';
import ai from '../../assets/icon/ai.png';
import db from '../../assets/icon/db.png';
import 시각화 from '../../assets/icon/시각화.png';
import 평가 from '../../assets/icon/평가.png';
import 선생님가이드 from '../../assets/file/지니아튜터+상세가이드(교사)_2407.pdf';
import 학생가이드 from '../../assets/file/지니아튜터+상세가이드(학생)_2407.pdf';
import { BsChatDots, BsDownload, BsQuestionCircle } from 'react-icons/bs';
import { StyledRouterLink } from '../common/UserStyledComponents.js';
import { useNavigate } from 'react-router-dom';
import { getBoardsByCategory } from '../../api/board/board.js';
import { useEffect, useState } from 'react';
import formatData from '../../utils/dateFormat.js';

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
    background: ${props => props.$primary ? 'linear-gradient(-135deg, rgb(22, 140, 255) 0%, rgb(132, 85, 255) 100%)' : 'white'};
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
    color: ${props => props.$primary ? '#fff' : '#171616FF'};

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
    display: flex;
    flex-direction: column;
    gap: 20px;
    // 여기에 오른쪽 섹션 스타일 추가
`;

const NoticeContainer = styled.div`
    background: white;
    border-radius: 12px;
    border: 1px solid #eaeaea;
    padding: 24px;
`;

const NoticeHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const NoticeTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
`;

const NoticeList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const NoticeItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;

    a {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #171616;
        text-decoration: none;
        font-size: 14px;

        &:hover {
            color: #108eff;
        }

        &:after {
            content: none !important;
        }

    }

    span {
        color: #7e7e7e;
        font-size: 14px;
    }

`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 12px;
    margin-top: auto;
`;

const ActionButton = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid #eaeaea;
    background: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #171616;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: #f8f8f8;
        transform: translateY(-2px);
    }

    svg {
        width: 20px;
        height: 20px;
        color: #7e7e7e;
    }

`;

const DownloadWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const DownloadATag = styled.a`
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 56px;
    border-radius: 25px;
    font-size: 18px;
    font-weight: 600;

    border: ${props => props.$teacher ? '' : '1px solid #108eff'};
    background: ${props => props.$teacher ? '#108eff' : '#fff'};
    color: ${props => props.$teacher ? '#fff' : '#171616FF'};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(16, 142, 255, 0.2);
    }

    svg {
        width: 18px;
        height: 18px;
        margin-left: 4px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const InfoSection = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [fiveNotice, setFiveNotice] = useState([]);
  useEffect(() => {
    const iconMap = {
      'db' : db,
      '평가' : 평가,
      'ai' : ai,
      '시각화': 시각화
    };

    const readFeatures = featuresData.features.map(feature => ({
      ...feature,
      icon: iconMap[feature.iconName]
    }));

    setFeatures(readFeatures);
  }, []);

  const fetchingAllNotice = async () => {
    try {
      const result = await getBoardsByCategory(1);

      if (result.status === 200) setFiveNotice(result.data.slice(0, 5));

    } catch (error) {
      console.error('Failed to fetch notice: ', error);
    }
  };

  const handleMove = (to) => {
    navigate(`/cmmn/${to}`);
  };

  useEffect(() => {
    fetchingAllNotice();
  }, []);

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
          <DownloadATag
            $teacher
            href={선생님가이드}
            download="지니아튜터+상세가이드(교사)_2407"
          >
            교사용 이용 가이드
            <BsDownload />
          </DownloadATag>
          <DownloadATag
            href={학생가이드}
            download="지니아튜터+상세가이드(학생)_2407"
          >
            학생용 이용 가이드
            <BsDownload />
          </DownloadATag>
        </DownloadWrapper>

        <NoticeContainer>
          <NoticeHeader>
            <NoticeTitle>공지사항</NoticeTitle>
            <StyledRouterLink to="/cmmn/notice">더보기</StyledRouterLink>
          </NoticeHeader>

          <NoticeList>
            {fiveNotice.map(notice => (
              <NoticeItem key={notice.boardId}>
                <StyledRouterLink to={`/cmmn/notice/${notice.boardId}`}>{notice.title}</StyledRouterLink>
                <span>{formatData(notice.createdAt)}</span>
              </NoticeItem>
            ))}
          </NoticeList>
        </NoticeContainer>

        <ButtonContainer>
          <ActionButton onClick={() => handleMove('faq')}>
            <BsQuestionCircle />
            <StyledRouterLink to="#" style={{ color: 'black' }}>
              자주 묻는 질문
            </StyledRouterLink>
          </ActionButton>
          <ActionButton onClick={() => handleMove('inquiry')}>
            <BsChatDots />
            <StyledRouterLink to="#" style={{ color: 'black' }}>
              1:1 문의하기
            </StyledRouterLink>
          </ActionButton>
        </ButtonContainer>

      </NoticeSection>
    </InfoContainer>
  );
};

export default InfoSection;