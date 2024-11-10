import styled, { css } from 'styled-components';
import { useAuth } from '../../utils/AuthContext.jsx';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import study from '../../assets/icon/study.png';
import report from '../../assets/icon/report.png';
import cs from '../../assets/icon/custom-service.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { logout } from '../../api/user/user.js';
import { StyledRouterLink } from './UserStyledComponents.js';
import TeacherUpdateFormModal from '../user/TeacherUpdateFormModal.jsx';

const commonButtonStyles = css`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: inherit;
    color: inherit;
`;

const HeaderContainer = styled.header`
    width: 100%;
    border-bottom: 1px solid #eaeaea;
    background: white;
    z-index: 99;
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
    position: relative;
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
    align-items: center;

    li {
        font-size: 16px;
        color: #333;
        cursor: pointer;
        height: 64px;
        display: flex;
        align-items: center;

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

    @media (max-width: 768px) {
        display: none;
    }
`;


const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
    height: 100%;

    @media (max-width: 768px) {
        display: none;
    }
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;

    span {
        font-size: 14px;
        color: #333;
    }
`;

const LogoutButton = styled.button`
    height: 36px;
    padding: 0 12px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    background: white;
    color: #666;
    border: 1px solid #ddd;
    transition: all 0.2s;
    display: flex;
    align-items: center;

    &:hover {
        background: #f8f9fa;
    }
`;

const AuthButtons = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    height: 100%;

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

    @media (max-width: 768px) {
        display: none;
    }
`;

const NavItem = styled.li`
    font-size: 16px;
    color: #333;
    cursor: pointer;
    height: 64px;
    display: flex;
    align-items: center;
    position: relative;

    &:hover {
        color: #4285f4;
    }

    &.active {
        color: #4285f4;
        font-weight: 500;
    }
`;

const SubNav = styled.nav`
    position: absolute;
    top: 93%;
    left: 0;
    background: white;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: none;
    z-index: 1000;
    width: max-content; // 컨텐츠 너비에 맞춤
    min-width: 100%; // 최소한 부모 요소 너비만큼

    ${NavItem}:hover &, ${NavItem}.active & {
        display: block;
    }

    ul {
        display: flex;
        gap: 24px;
        list-style: none;
        margin: 0;
        padding: 8px 16px;
        height: 100%;
        align-items: center;
        white-space: nowrap;
    }
`;

const HamburgerButton = styled.button`
    ${commonButtonStyles}
    display: none;
    padding: 8px;
    margin-left: auto;

    @media (max-width: 768px) {
        display: block;
    }
`;

const HamburgerMenu = styled.div`
    display: none;

    @media (max-width: 768px) {
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
        transition: right 0.3s ease-in-out;
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
    border-bottom: 1px solid #eaeaea;
    height: 40px;
    margin: 0;

    img {
        padding-right: 10px;
    }

    a {
        width: 100%;
        color: inherit;
        display: flex;
        align-items: center;
    }

    &:hover {
        color: #4285f4;
        background-color: #f8f9fa;
    }

    &.sub-menu {
        padding-left: 32px;
        background-color: #fafafa;
    }
`;

const HamburgerLogoutButton = styled(LogoutButton)`
    padding: 8px 16px;
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

    @media (max-width: 768px) {
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

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;

    &.active {
        color: #4285f4;
        font-weight: 500;
    }

    &[href^='/cmmn']:not([end]) {
        &.active, &[data-active='true'] {
            color: #4285f4;
            font-weight: 500;
        }
    }

    &[href^='/report']:not([end]) {
        &.active, &[data-active='true'] {
            color: #4285f4;
            font-weight: 500;
        }
    }
`;

const Header = () => {
  const [hamburger, setHamburger] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelecetedUser] = useState({});

  const { userInfo, updateUserInfo, userRole } = useAuth?.() || {};
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('info');
    updateUserInfo();
    logout();
  };

  const toggleHamburger = () => {
    setHamburger(!hamburger);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);

    const userInfo = JSON.parse(localStorage.getItem('info'));

    setSelecetedUser(userInfo);
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
            <NavItem>
              {userRole === 'TE'
                ? (<StyledNavLink to="/course/1">학습</StyledNavLink>)
                : (<StyledNavLink to="/course0/1">학습</StyledNavLink>)}
            </NavItem>

            <NavItem>
              {userRole === 'SU' ? (
                <StyledNavLink to="/report/student">리포트</StyledNavLink>
              ) : (
                <StyledNavLink to="/report/teacher">리포트</StyledNavLink>
              )}
            </NavItem>

            <NavItem>
              <StyledNavLink to="/cmmn">고객센터</StyledNavLink>
              <SubNav>
                <ul>
                  <li key="notice">
                    <StyledNavLink to="/cmmn/notice">공지사항</StyledNavLink>
                  </li>
                  <li key="faq">
                    <StyledNavLink to="/cmmn/faq">자주 묻는 질문(FAQ)</StyledNavLink>
                  </li>
                  <li key="inquiry">
                    <StyledNavLink to="/cmmn/inquiry">1:1문의</StyledNavLink>
                  </li>
                </ul>
              </SubNav>
            </NavItem>
          </NavList>

          {userInfo ? (
            <UserInfoContainer>
              <UserInfo>
                <span onClick={() => {
                  setIsOpen(true);
                  handleOpenModal();
                }}>{userInfo.username}님</span>
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

      <Overlay $isOpen={hamburger} onClick={toggleHamburger}>
        <HamburgerMenu $isOpen={hamburger} onClick={e => e.stopPropagation()}>
          <HamburgerMenuHeader>
            <div>메뉴</div>
            <button onClick={toggleHamburger}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <IoClose size={24} />
            </button>
          </HamburgerMenuHeader>

          <HamburgerMenuItem>
            <img src={study} alt="학습 이미지" />
            <NavItem>
              {userRole === 'TE'
                ? (<StyledNavLink to="/course/1">학습</StyledNavLink>)
                : (<StyledNavLink to="/course/1">학습</StyledNavLink>)}
            </NavItem>
          </HamburgerMenuItem>
          <HamburgerMenuItem>
            <img src={report} alt="리포트 이미지" />
            <StyledNavLink
              to="/report"
              className={({ isActive }) => isActive ? 'active' : ''}>
              리포트
            </StyledNavLink>
          </HamburgerMenuItem>
          <HamburgerMenuItem>
            <img src={cs} alt="고객센터 이미지" />
            <StyledNavLink to="/cmmn">고객센터</StyledNavLink>
          </HamburgerMenuItem>

          {location.pathname.includes('/cmmn') && (
            <>
              <HamburgerMenuItem className="sub-menu" key="notice">
                <StyledNavLink to="/cmmn/notice">공지사항</StyledNavLink>
              </HamburgerMenuItem>
              <HamburgerMenuItem className="sub-menu" key="faq">
                <StyledNavLink to="/cmmn/faq">자주 묻는 질문(FAQ)</StyledNavLink>
              </HamburgerMenuItem>
              <HamburgerMenuItem className="sub-menu" key="inquiry">
                <StyledNavLink to="/cmmn/inquiry">1:1문의</StyledNavLink>
              </HamburgerMenuItem>
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

      <TeacherUpdateFormModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        selectedUser={selectedUser}
      />
    </HeaderContainer>
  );
};

export default Header;