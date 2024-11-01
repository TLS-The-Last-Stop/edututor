import '../../assets/css/AdminHeader.css';
import { logout } from '../../api/user/user.js';
import { useAuth } from '../../utils/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { userRole, updateUserInfo } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('info');
    updateUserInfo();
    await logout();
    navigate('/');
  };


  return (
    <header className="admin-header">
      <div className="header-left">
        <h2>₍₍ ◝(・ω・)◟ ⁾⁾ 관리자 페이지 !</h2>
      </div>
      <div className="header-right">
        {userRole === 'AD' ? (<button onClick={handleLogout}>로그아웃</button>) : ''}
      </div>
    </header>
  );
};

export default AdminHeader;
