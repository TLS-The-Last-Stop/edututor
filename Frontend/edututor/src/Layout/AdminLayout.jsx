import React from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import '../assets/css/AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
      <div className="admin-layout">
        <AdminHeader />
        <div className="admin-container">
          <AdminSidebar />
          <main className="admin-content">
            {children}
          </main>
        </div>
      </div>
  );
};

export default AdminLayout;
