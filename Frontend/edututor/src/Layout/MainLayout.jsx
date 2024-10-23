import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

const MainLayout = ( { children }) => {
  return (
    <>
      <Header />
      { children }
      <Footer />
    </>
  );
};

export default MainLayout;