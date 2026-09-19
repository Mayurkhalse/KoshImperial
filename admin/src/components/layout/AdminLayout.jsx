import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar.jsx';
import { Topbar } from './Topbar.jsx';

export const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ki_admin_token');
    localStorage.removeItem('ki_admin_user');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-milkglass-base text-charcoal">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onLogout={handleLogout} />
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
