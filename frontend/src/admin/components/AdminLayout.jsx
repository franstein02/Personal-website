import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  const location = useLocation();
  
  // If we are exactly at /admin, redirect to /admin/profile for a better default experience
  if (location.pathname === '/admin' || location.pathname === '/admin/') {
    return <Navigate to="/admin/profile" replace />;
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
