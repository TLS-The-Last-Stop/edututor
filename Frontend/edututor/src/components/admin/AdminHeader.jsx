import React from 'react';
import '../../assets/css/AdminHeader.css';

const AdminHeader = () => {
  return (
      <header className="admin-header">
        <div className="header-left">
          <h2>₍₍ ◝(・ω・)◟ ⁾⁾ 관리자 페이지 !</h2>
        </div>
        <div className="header-right">
          <span>관리자님</span>
          <button>로그아웃</button>
        </div>
      </header>
  );
};

export default AdminHeader;
