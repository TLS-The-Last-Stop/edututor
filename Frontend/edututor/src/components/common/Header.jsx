import styled from 'styled-components';
import { useAuth } from '../../utils/AuthContext.jsx';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import cs from '../../assets/icon/custom-service.png';
import tutor from '../../assets/icon/tutor.png';
import study from '../../assets/icon/study.png';
import report from '../../assets/icon/report.png';

const HeaderContainer = styled.header`
    width: 100%;
    border-bottom: 1px solid #eaeaea;
    background: white;
    font-family: 'Noto Sans KR', sans-serif;
`;

const HeaderContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

const MainNav = styled.nav`
    display: flex;
    align-items: center;
    height: 64px;
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-right: 40px;
    display: flex;
    align-items: center;

    span:first-child {
        color: #4285f4;
    }

    .edu {
        font-size: 12px;
        background: #eef3ff;
        color: #4285f4;
        padding: 2px 6px;
        border-radius: 4px;
        margin-left: 4px;
    }
`;

const NavList = styled.ul`
    display: flex;
    gap: 32px;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-grow: 1;

    li {
        font-size: 16px;
        color: #333;
        cursor: pointer;

        &:hover {
            color: #4285f4;
        }

        &.active {
            color: #4285f4;
            font-weight: 500;
        }
    }

    @media (max-width: 765px) {
        display: none;
    }
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;

    @media (max-width: 765px) {
        display: none;
    }
`;

const AuthButtons = styled.div`
    display: flex;
    gap: 12px;

    button {
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;

        &.login {
            background: #4285f4;
            color: white;
            border: none;

            &:hover {
                background: #3b78e7;
            }
        }

        &.register {
            background: white;
            color: #4285f4;
            border: 1px solid #4285f4;

            &:hover {
                background: #f8f9fa;
            }
        }
    }

    @media (max-width: 765px) {
        display: none;
    }
`;


const SubNav = styled.nav`
    height: 40px;
    border-top: 1px solid #eaeaea;

    ul {
        display: flex;
        gap: 24px;
        list-style: none;
        margin: 0;
        padding: 0;
        height: 100%;
        align-items: center;

        li {
            font-size: 14px;
            color: #666;
            cursor: pointer;

            &:hover {
                color: #4285f4;
            }

            &.active {
                color: #4285f4;
                font-weight: 500;
            }
        }
    }
`;

const HamburgerButton = styled.button`
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    margin-left: auto;

    @media (max-width: 765px) {
        display: block;
    }
`;

const HamburgerMenu = styled.div`
    display: none;

    @media (max-width: 765px) {
        display: ${props => props.isOpen ? 'block' : 'none'};
        position: fixed;
        top: 0;
        right: ${props => props.isOpen ? '0' : '-250px'};
        width: 250px;
        height: 100vh;
        background: white;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        padding: 20px;
        z-index: 1000;
        transition: right 0.3s ease-in-out;  // 부드러운 전환 효과 추가
    }
`;

const HamburgerMenuHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const HamburgerMenuItem = styled.div`
    display: flex;
    align-items: center;
    text-align: left;
    padding: 12px 0;
    border-bottom: 1px solid #eaeaea;
    color: #333;
    cursor: pointer;

    img {
        padding-right: 10px;
    }

    &:hover {
        color: #4285f4;
    }

    &.active {
        color: #4285f4;
        font-weight: 500;
    }
`;

const HamburgerAuthButtons = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
        width: 100%;
        padding: 12px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;

        &.login {
            background: #4285f4;
            color: white;
            border: none;
        }

        &.register {
            background: white;
            color: #4285f4;
            border: 1px solid #4285f4;
        }
    }
`;

const Overlay = styled.div`
    display: none;

    @media (max-width: 765px) {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        opacity: ${props => props.isOpen ? 1 : 0};
        visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
        transition: all 0.3s ease-in-out;
        z-index: 999;
    }
`;


const Header = () => {
  const { userInfo } = useAuth();
  const [hamburger, setHamburger] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const [activeSubMenu, setActiveSubMenu] = useState(false);

  const toggleHamburger = () => {
    setHamburger(!hamburger);
    if (hamburger) {
      setActiveSubMenu('');
      setActiveSubMenu('');
    }
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? '' : menuName);
    setActiveSubMenu(''); // 메인 메뉴 클릭시 서브메뉴 선택 초기화
  };

  const handleSubMenuClick = (subMenuName) => {
    setActiveSubMenu(subMenuName === activeSubMenu ? '' : subMenuName);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <MainNav>
          <Logo>
            <span>E</span>dututor
            <span className="edu">edu</span>
          </Logo>
          <NavList>
            <li onClick={() => handleMenuClick('학습')} className={activeMenu === '학습' ? 'active' : ''}>학습</li>
            <li onClick={() => handleMenuClick('리포트')} className={activeMenu === '리포트' ? 'active' : ''}>리포트</li>
            <li onClick={() => handleMenuClick('에듀튜터')} className={activeMenu === '에듀튜터' ? 'active' : ''}>에듀튜터 소개
            </li>
            <li onClick={() => handleMenuClick('고객센터')} className={activeMenu === '고객센터' ? 'active' : ''}>고객센터</li>
          </NavList>

          {userInfo ? (
            <HamburgerMenuItem style={{ marginTop: '20px' }}>
              {userInfo.fullName}님
            </HamburgerMenuItem>
          ) : (
            <AuthButtons>
              <button className="login">로그인</button>
              <button className="register">회원가입</button>
            </AuthButtons>
          )}
          <HamburgerButton onClick={toggleHamburger}>
            <FiMenu size={24} />
          </HamburgerButton>
        </MainNav>
      </HeaderContent>

      {activeMenu === '에듀튜터' && (
        <HeaderContent>
          <SubNav>
            <ul>
              <li onClick={() => handleSubMenuClick('활용사례')} className={activeMenu === '활용사례' ? 'active' : ''}>활용 사례
              </li>
              <li onClick={() => handleSubMenuClick('서비스소개')} className={activeMenu === '서비스소개' ? 'active' : ''}>서비스
                소개
              </li>
            </ul>
          </SubNav>
        </HeaderContent>
      )}

      <Overlay isOpen={hamburger} onClick={toggleHamburger}>
        <HamburgerMenu isOpen={hamburger}>
          <HamburgerMenuHeader>
            <div>메뉴</div>
            <button onClick={toggleHamburger} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <IoClose size={24} />
            </button>
          </HamburgerMenuHeader>

          <HamburgerMenuItem className={activeMenu === '학습' ? 'active' : ''}
                             onClick={() => handleMenuClick('학습')}>
            <img src={study} alt="학습 이미지" /> 학습
          </HamburgerMenuItem>
          <HamburgerMenuItem className={activeMenu === '리포트' ? 'active' : ''}
                             onClick={() => handleMenuClick('리포트')}>
            <img src={report} alt="리포트 이미지" />리포트
          </HamburgerMenuItem>
          <HamburgerMenuItem className={activeMenu === '에듀튜터' ? 'active' : ''}
                             onClick={() => handleMenuClick('에듀튜터')}>
            <img src={tutor} alt="에듀튜터 이미지" />에듀튜터
          </HamburgerMenuItem>
          {activeMenu === '에듀튜터' && (
            <>
              <HamburgerMenuItem onClick={() => handleSubMenuClick('활용사례')}
                                 clasName={activeMenu === '활용사례' ? 'active' : ''} style={{ paddingLeft: '32px' }}
              >활용
                사례</HamburgerMenuItem>
              <HamburgerMenuItem onClick={() => handleSubMenuClick('서비스소개')}
                                 clasName={activeMenu === '서비스소개' ? 'active' : ''} style={{ paddingLeft: '32px' }}
              >서비스
                소개</HamburgerMenuItem>
            </>
          )}
          <HamburgerMenuItem className={activeMenu === '고객센터' ? 'active' : ''}
                             onClick={() => handleMenuClick('고객센터')}>
            <img src={cs} alt="고객센터 이미지" />고객센터
          </HamburgerMenuItem>

          {userInfo ? (
            <HamburgerMenuItem style={{ marginTop: '20px' }}>
              {userInfo.fullName}님
            </HamburgerMenuItem>
          ) : (
            <HamburgerAuthButtons>
              <button className="login">로그인</button>
              <button className="register">회원가입</button>
            </HamburgerAuthButtons>
          )}

        </HamburgerMenu>
      </Overlay>
    </HeaderContainer>
  );
};

export default Header;