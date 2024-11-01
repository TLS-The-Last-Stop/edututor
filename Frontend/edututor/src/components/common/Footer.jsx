import styled from 'styled-components';
import insta from '../../assets/icon/인스타.png';
import blog from '../../assets/icon/블로그.png';

const FooterContainer = styled.footer`
    background: coral;
    height: 270px;
    position: relative;
    transform: translateY(0%);
    display: flex;
    justify-content: center;
`;

const FooterWrapper = styled.div`
    max-width: 1300px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const FooterContent = styled.div`

`;

const FooterText = styled.div`
    font-size: 18px;
    font-weight: bold;

    span {
        font-size: 14px;
        margin-left: 10px;
    }

`;

const FooterLink = styled.div`
`;

const FooterLinkImageWrapper = styled.div`
    cursor: pointer;

    img {
        margin-left: 5px;
    }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterContent>
          <FooterText>고객센터 010-7196-2013<span>(평일이고 주말이고 전화 ㄴㄴ)</span></FooterText>
        </FooterContent>
        <FooterLink>
          <FooterLinkImageWrapper>
            <img src={insta} alt="링크이미지" />
            <img src={blog} alt="링크이미지" />
          </FooterLinkImageWrapper>
        </FooterLink>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;