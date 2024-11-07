import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/css/AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/create-course" className={({ isActive }) => isActive ? 'active' : ''}>과정 생성</NavLink>
          </li>
          <li>
            <NavLink to="/admin/course" className={({ isActive }) => isActive ? 'active' : ''}>과정 관리</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>사용자 관리</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
