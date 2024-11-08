import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const MainCss = styled.div`
    flex: 1; // 남은 공간을 모두 차지하도록 설정
    padding-bottom: 248px; // Footer 높이만큼 패딩
`;

const MainLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <MainCss>
        {children}
      </MainCss>
      <Footer />
    </Wrapper>
  );
};

export default MainLayout;