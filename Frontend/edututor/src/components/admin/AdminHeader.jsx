import React from 'react';
import '../../assets/css/AdminHeader.css';
import { logout } from '../../api/user/user.js';
import { useAuth } from '../../utils/AuthContext.jsx';

const AdminHeader = () => {
  const { userInfo, updateUserInfo } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('info');
    updateUserInfo();
    logout();
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <h2>₍₍ ◝(・ω・)◟ ⁾⁾ 관리자 페이지 !</h2>
      </div>
      <div className="header-right">
        {userInfo ? (<button onClick={handleLogout}>로그아웃</button>) : ''}
      </div>
    </header>
  );
};

export default AdminHeader;
