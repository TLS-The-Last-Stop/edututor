import { NavLink } from 'react-router-dom';
import '../../assets/css/AdminSidebar.css';

const AdminSidebar = () => {
  const getNavClass = ({ isActive }) => isActive ? 'active' : '';

  return (
    <aside className="admin-sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/create-course" className={getNavClass}>과정 생성</NavLink>
          </li>
          <li>
            <NavLink to="/admin/course" className={getNavClass}>과정 관리</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={getNavClass}>사용자 관리</NavLink>
          </li>
          <li>
            <NavLink to="/admin/user-statistic" className={getNavClass}>사용자 현황</NavLink>
          </li>
          <li>
            <NavLink to="/admin/issue-list" className={getNavClass}>문제 신고 목록</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
