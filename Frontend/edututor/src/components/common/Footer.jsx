import styled from 'styled-components';
import insta from '../../assets/icon/인스타.png';
import blog from '../../assets/icon/블로그.png';
import { StyledRouterLink } from './UserStyledComponents.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
    background: #ffffff;
    width: 100%;
    position: absolute;
    height: 248px;
    bottom: 0;
`;

// 좌측 네비게이션
const NavLinks = styled.div`
    display: flex;
    gap: 24px;

    a {
        font-size: 14px;
        color: #333;
        text-decoration: none;

        &:hover {
            color: #000;
        }
    }
`;

const UtilitySection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const Version = styled.span`
    font-size: 14px;
    color: #666;
`;

const FamilySite = styled.div`
    position: relative;
`;

const FamilySiteButton = styled.button`
    width: 200px;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    justify-content: space-between;

    &:after {
        content: '${props => props.$isOpen ? '▲' : '▼'}';
        font-size: 10px;
        margin-left: 8px;
    }

    &:hover {
        background: #f5f5f5;
    }
`;

// 패밀리 사이트 드롭다운
const Dropdown = styled.div`
    position: absolute;
    box-sizing: border-box;
    top: 100%;
    right: 10px;
    width: 200px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 4px;
    display: ${props => props.$isOpen ? 'block' : 'none'};
    z-index: 1000;
`;

// 드롭다운 아이템
const DropdownItem = styled(Link)`
    display: block;
    padding: 8px 16px;
    color: #333;
    font-size: 14px;
    text-decoration: none;

    &:hover {
        background: #f5f5f5;
    }
`;

// 고객센터 정보
const CustomerInfo = styled.div`
    display: flex;
    align-items: center;

    h3 {
        font-size: 18px;
        font-weight: bold;
    }

    span {
        margin-left: 10px;
        font-size: 14px;
        color: #666;
    }
`;

// 소셜 링크
const SocialLinks = styled.div`
    display: flex;
    gap: 10px;

    img {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
`;

// 하단 네비게이션
const FooterNav = styled.nav`
    display: flex;
    box-sizing: border-box;
    gap: 20px;
    padding: 20px;

    a {
        font-size: 14px;
        color: #333;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    @media (max-width: 765px) {
        flex-direction: column;
        padding: 10px;
        gap: 10px;
    }

`;

// 공통으로 사용할 ContentWrapper
const ContentWrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 765px) {
        padding: 0 10px;
    }
`;

// 고객센터 섹션
const CustomerSection = styled.div`
    background: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #eee;

    @media (max-width: 765px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 10px;
    }
`;

const CustomerContent = styled(ContentWrapper)`
    max-width: 1300px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;

    @media (max-width: 765px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
`;

// 패밀리 섹션
const FamilySection = styled.div`
    width: 100%;
    border-bottom: 1px solid #eee;
`;

const FamilyContent = styled(ContentWrapper)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;

    @media (max-width: 765px) {
        flex-direction: column;
        height: auto;
        padding-top: 10px;
        padding-bottom: 10px;
        gap: 10px;
    }
`;


// 회사 정보 섹션
const CompanySection = styled.div`
    width: 100%;
`;

const CompanyContent = styled(ContentWrapper)`
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 14px;
    color: #666;
    line-height: 1.6;

    div {
        margin-bottom: 8px;
    }

    strong {
        margin-right: 8px;
    }
`;

const Footer = () => {
  const [isFamilySiteOpen, setIsFamilySiteOpen] = useState(false);

  return (
    <FooterContainer>
      <CustomerSection>
        <CustomerContent>
          <CustomerInfo>
            <h3>고객센터 010-7196-2013</h3>
            <span>(평일 09:00~17:30)</span>
          </CustomerInfo>
          <SocialLinks>
            <img src={insta} alt="링크이미지" />
            <img src={blog} alt="링크이미지" />
          </SocialLinks>
        </CustomerContent>
      </CustomerSection>

      <FamilySection>
        <FamilyContent>
          <FooterNav>
            <NavLinks>
              <StyledRouterLink to="https://chunjaetext.co.kr/">천재교과서</StyledRouterLink>
              <StyledRouterLink to="https://pass.chunjae.co.kr/#/policy?site=52&tab=1">이용약관</StyledRouterLink>
              <StyledRouterLink to="https://pass.chunjae.co.kr/#/policy?site=52&tab=2">개인정보처리방침</StyledRouterLink>
            </NavLinks>
          </FooterNav>

          <UtilitySection>
            <Version>에듀튜터 v1.0</Version>
            <FamilySite>
              <FamilySiteButton
                onClick={() => setIsFamilySiteOpen(!isFamilySiteOpen)}
                $isOpen={isFamilySiteOpen}
              >
                패밀리 사이트
              </FamilySiteButton>
              <Dropdown $isOpen={isFamilySiteOpen}>
                <DropdownItem to="https://www.milkt.co.kr/Main/Main_new">밀크티 초등</DropdownItem>
                <DropdownItem to="https://mid.milkt.co.kr/Main/frm_Main.aspx">밀크티 중등</DropdownItem>
                <DropdownItem to="https://hme.chunjae.co.kr/hme/main.asp">HME 전국 <p>해법수학 학력평가</p></DropdownItem>
              </Dropdown>
            </FamilySite>
          </UtilitySection>
        </FamilyContent>
      </FamilySection>

      <CompanySection>
        <CompanyContent>
          <div><strong>대표: 김혁진, 한유리, 이수완</strong></div>
          <div><strong>주소: 서울특별시 금천구 가산디지털1로 16, 2011호(가산동)</strong></div>
          <div><strong>사업자등록번호:</strong> 119 - 81 - 70643</div>
        </CompanyContent>
      </CompanySection>
    </FooterContainer>
  );
};

export default Footer;