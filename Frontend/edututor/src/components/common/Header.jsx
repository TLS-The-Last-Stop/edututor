import styled from 'styled-components';
import { useAuth } from '../../utils/AuthContext.jsx';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import study from '../../assets/icon/study.png';
import report from '../../assets/icon/report.png';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../api/user/user.js';
import { StyledRouterLink } from './UserStyledComponents.js';

const HeaderContainer = styled.header`
    width: 100%;
    border-bottom: 1px solid #eaeaea;
    background: white;
    font-family: 'Noto Sans KR', sans-serif;
`;

const HeaderContent = styled.div`
    max-width: 1300px;
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
    margin: 8px 0 0;
    padding: 0;
    flex-grow: 1;
    align-items: center; // 수직 중앙 정렬 추가

    li {
        font-size: 16px;
        color: #333;
        cursor: pointer;
        height: 64px; // MainNav와 동일한 높이
        display: flex; // Flex 컨테이너로 변경
        align-items: center; // 수직 중앙 정렬

        a {
            color: inherit;
            text-decoration: none;
        }

        button {
            color: inherit;
            text-decoration: none;
        }

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

const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
    height: 100%; // MainNav와 동일한 높이

    @media (max-width: 765px) {
        display: none;
    }
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 4px;

    span {
        font-size: 14px;
        color: #333;
    }
`;

const LogoutButton = styled.button`
    height: 36px; // 버튼 높이 고정
    padding: 0 12px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    background: white;
    color: #666;
    border: 1px solid #ddd;
    transition: all 0.2s;
    display: flex;
    align-items: center; // 버튼 내부 텍스트 세로 중앙 정렬

    &:hover {
        background: #f8f9fa;
    }
`;
const AuthButtons = styled.div`
    display: flex;
    gap: 12px;
    align-items: center; // 수직 중앙 정렬
    height: 100%; // MainNav와 동일한 높이

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

    @media (max-width: 765px) {
        display: none;
    }

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

            a {
                color: inherit;
                text-decoration: none;
            }

            &:hover {
                color: #4285f4;
                background: #f8f9fa;
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
        display: ${props => props.$isOpen ? 'block' : 'none'};
        position: fixed;
        top: 0;
        right: ${props => props.$isOpen ? '0' : '-250px'};
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

const HamburgerLogoutButton = styled(LogoutButton)`
    margin-left: auto; // 오른쪽 정렬
    padding: 8px 16px; // 햄버거 메뉴용 크기 조정
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
        opacity: ${props => props.$isOpen ? 1 : 0};
        visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
        transition: all 0.3s ease-in-out;
        z-index: 999;
    }
`;

const StyledButton = styled.button`
    background: none;
    border: none;
    font-size: inherit;
    color: #666;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    margin-right: 0;

    &:hover {
        color: #40a9ff;
    }

`;


const Header = () => {
  const { userInfo, updateUserInfo, userRole } = useAuth?.() || {};
  const [hamburger, setHamburger] = useState(false);
  const [activeHeaderMenu, setActiveHeaderMenu] = useState('');
  const [activeHamburgerMenu, setActiveHamburgerMenu] = useState('');
  const [activeSubMenu, setActiveSubMenu] = useState('공지사항');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('info');
    updateUserInfo();
    logout();
  };

  const toggleHamburger = () => {
    setHamburger(!hamburger);
    if (hamburger) {
      setActiveHamburgerMenu('');
      setActiveSubMenu('');
    }
  };

  const handleHeaderMenuClick = (menuName) => {
    setActiveHeaderMenu(menuName);

    if (menuName === '고객센터') setActiveSubMenu('공지사항');
    else setActiveSubMenu('');
  };

  const handleHamburgerMenuClick = (e, menuName) => {
    e.stopPropagation();
    setActiveHamburgerMenu(activeHamburgerMenu === menuName ? '' : menuName);
    setActiveSubMenu('');
  };

  const handleSubMenuClick = (e, subMenuName) => {
    e.stopPropagation();
    setActiveSubMenu(subMenuName === activeSubMenu ? '' : subMenuName);
  };

  const handleTeacherCourseClick = () => {
    navigate('/course/1'); // 추후 수정
  };

  const handleStudentCourseClick = () => {
    navigate('/course0/1'); // 추후 수정
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <MainNav>
          <Logo>
            <StyledRouterLink to="/">
              <span>E</span>dututor
              <span className="edu">edu</span>
            </StyledRouterLink>
          </Logo>
          <NavList>
            <li onClick={() => handleHeaderMenuClick('학습')} className={activeHeaderMenu === '학습' ? 'active' : ''}>
              {userRole === 'TE'
                ? (<StyledButton onClick={handleTeacherCourseClick}>학습</StyledButton>)
                : (<StyledButton onClick={handleStudentCourseClick}>학습</StyledButton>)}
            </li>
            <li onClick={() => handleHeaderMenuClick('리포트')}
                className={activeHeaderMenu === '리포트' ? 'active' : ''}>
              <StyledRouterLink to="/report">리포트</StyledRouterLink>
            </li>
            <li onClick={() => handleHeaderMenuClick('고객센터')}
                className={activeHeaderMenu === '고객센터' ? 'active' : ''}>
              <StyledRouterLink to="/cmmn/notice">고객센터</StyledRouterLink>
            </li>
          </NavList>

          {userInfo ? (
            <UserInfoContainer>
              <UserInfo>
                <span>{userInfo.username}님</span>
                <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
              </UserInfo>
            </UserInfoContainer>
          ) : (
            <AuthButtons>
              <Link to="/login">
                <button className="login">로그인</button>
              </Link>
              <Link to="join">
                <button className="register">회원가입</button>
              </Link>
            </AuthButtons>
          )}
          <HamburgerButton onClick={toggleHamburger}>
            <FiMenu size={24} />
          </HamburgerButton>
        </MainNav>
      </HeaderContent>

      {activeHeaderMenu === '고객센터' && (
        <HeaderContent>
          <SubNav>
            <ul>
              <li
                onClick={(e) => handleSubMenuClick(e, '공지사항')}
                className={activeSubMenu === '공지사항' ? 'active' : ''}
              >
                <StyledRouterLink to="/cmmn/notice">공지사항</StyledRouterLink>
              </li>
              <li
                onClick={(e) => handleSubMenuClick(e, 'FAQ')}
                className={activeSubMenu === 'FAQ' ? 'active' : ''}
              >
                <StyledRouterLink to="/cmmn/faq">자주 묻는 질문(FAQ)</StyledRouterLink>
              </li>
              <li
                onClick={(e) => handleSubMenuClick(e, '1:1문의')}
                className={activeSubMenu === '1:1문의' ? 'active' : ''}
              >
                <StyledRouterLink to="/cmmn/inquiry">1:1문의</StyledRouterLink>
              </li>
              <li
                onClick={(e) => handleSubMenuClick(e, '오류 문항 신고 현황')}
                className={activeSubMenu === '오류 문항 신고 현황' ? 'active' : ''}
              >
                <StyledRouterLink to="/">오류 문항 신고 현황</StyledRouterLink>
              </li>
            </ul>
          </SubNav>
        </HeaderContent>
      )}

      <Overlay $isOpen={hamburger} onClick={toggleHamburger}>
        <HamburgerMenu $isOpen={hamburger}>
          <HamburgerMenuHeader>
            <div>메뉴</div>
            <button onClick={(e) => {
              e.stopPropagation();
              toggleHamburger();
            }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <IoClose size={24} />
            </button>
          </HamburgerMenuHeader>

          <HamburgerMenuItem className={activeHamburgerMenu === '학습' ? 'active' : ''}
                             onClick={(e) => handleHamburgerMenuClick(e, '학습')}>
            <img src={study} alt="학습 이미지" /> 학습
          </HamburgerMenuItem>
          <HamburgerMenuItem className={activeHamburgerMenu === '리포트' ? 'active' : ''}
                             onClick={(e) => handleHamburgerMenuClick(e, '리포트')}>
            <img src={report} alt="리포트 이미지" /> <StyledRouterLink to="/report">리포트</StyledRouterLink>
          </HamburgerMenuItem>

          {activeHamburgerMenu === '고객센터' && (
            <>
              <HamburgerMenuItem onClick={(e) => handleSubMenuClick(e, '공지사항')}
                                 className={activeHamburgerMenu === '공지사항' ? 'active' : ''}
                                 style={{ paddingLeft: '32px' }}
              ><StyledRouterLink to="/cmmn/notice">공지사항</StyledRouterLink></HamburgerMenuItem>
              <HamburgerMenuItem onClick={(e) => handleSubMenuClick(e, 'FAQ')}
                                 className={activeHamburgerMenu === 'FAQ' ? 'active' : ''}
                                 style={{ paddingLeft: '32px' }}
              ><StyledRouterLink to="/cmmn/faq">자주 묻는 질문(FAQ)</StyledRouterLink></HamburgerMenuItem>
              <HamburgerMenuItem onClick={(e) => handleSubMenuClick(e, '1:1문의')}
                                 class
                                 Name={activeHamburgerMenu === '1:1문의' ? 'active' : ''}
                                 style={{ paddingLeft: '32px' }}
              ><StyledRouterLink to="/cmmn/inquiry">1:1문의</StyledRouterLink></HamburgerMenuItem>
            </>
          )}

          {userInfo ? (
            <HamburgerMenuItem>
              <UserInfo>
                {userInfo.username}님
                <HamburgerLogoutButton onClick={handleLogout}>로그아웃</HamburgerLogoutButton>
              </UserInfo>
            </HamburgerMenuItem>
          ) : (
            <HamburgerAuthButtons>
              <Link to="/login">
                <button className="login">로그인</button>
              </Link>
              <Link to="join">
                <button className="register">회원가입</button>
              </Link>
            </HamburgerAuthButtons>
          )}

        </HamburgerMenu>
      </Overlay>
    </HeaderContainer>
  );
};

export default Header;