import { NavLink } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAppContext } from '../../context/AppProvider';
import { FiUser, FiAward, FiBriefcase, FiLink, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  const { logout } = useAdminAuth();
  const { theme, toggleTheme } = useAppContext();

  const menuItems = [
    { name: 'Profile', path: '/admin/profile', icon: <FiUser size={18} /> },
    { name: 'Certificates', path: '/admin/certificates', icon: <FiAward size={18} /> },
    { name: 'Experiences', path: '/admin/experiences', icon: <FiBriefcase size={18} /> },
    { name: 'Accounts', path: '/admin/accounts', icon: <FiLink size={18} /> },
  ];

  return (
    <aside className="w-64 min-h-screen border-r flex flex-col" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="h-16 flex items-center justify-between px-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Admin Panel<span style={{ color: 'var(--accent)' }}>.</span>
        </h2>
        <button onClick={toggleTheme} className="icon-btn">
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive ? 'font-medium' : 'hover:opacity-80'
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? 'var(--surface-2)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              border: isActive ? '1px solid var(--border)' : '1px solid transparent'
            })}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t flex flex-col gap-2" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 hover:opacity-80"
          style={{ color: 'var(--text-muted)' }}
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
