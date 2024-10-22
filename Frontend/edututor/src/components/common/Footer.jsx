import styled from 'styled-components';

const FooterContainer = styled.footer`
    background: coral;
    height: 270px;
    position: relative;
    transform: translateY(0%);
`;

const Footer = () => {


  return (
      <FooterContainer>
        <h3>푸터</h3>
      </FooterContainer>
  );
};

export default Footer;