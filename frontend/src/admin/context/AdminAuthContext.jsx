import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      localStorage.setItem('admin_token', token);
    } else {
      localStorage.removeItem('admin_token');
    }
  }, [token]);

  const login = async (password) => {
    try {
      // Direct call to avoid the interceptor redirecting immediately on 401
      const response = await axios.post('http://localhost:8002/auth/login', { password });
      if (response.data && response.data.access_token) {
        setToken(response.data.access_token);
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.detail || 'An error occurred during login'
      };
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AdminAuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminAuth = () => useContext(AdminAuthContext);
