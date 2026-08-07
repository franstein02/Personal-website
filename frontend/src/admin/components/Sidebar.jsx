import { NavLink } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { FiUser, FiAward, FiBriefcase, FiLink, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  const { logout } = useAdminAuth();

  const menuItems = [
    { name: 'Profile', path: '/admin/profile', icon: <FiUser size={18} /> },
    { name: 'Certificates', path: '/admin/certificates', icon: <FiAward size={18} /> },
    { name: 'Experiences', path: '/admin/experiences', icon: <FiBriefcase size={18} /> },
    { name: 'Accounts', path: '/admin/accounts', icon: <FiLink size={18} /> },
  ];

  return (
    <aside className="w-64 min-h-screen border-r flex flex-col" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="h-16 flex items-center px-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Admin Panel<span style={{ color: 'var(--accent)' }}>.</span>
        </h2>
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

      <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
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
