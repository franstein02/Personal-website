import { useHomeData } from './hooks/useHomeData';
import { AppProvider } from './context/AppProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import Accounts from './components/Accounts';
import Footer from './components/Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';

function PortfolioApp() {
  const { data, loading, error } = useHomeData();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)', color: 'var(--text)' }}>Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)', color: 'var(--text)' }}>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <Hero profile={data?.profile} />
      <About profile={data?.profile} />
      <Certificates certificates={data?.certificates} />
      <Experience experiences={data?.experiences} />
      <Accounts accounts={data?.accounts} />
      <Footer profile={data?.profile} />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PortfolioApp />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path="profile" element={<Dashboard />} />
              <Route path="certificates" element={<Dashboard />} />
              <Route path="experiences" element={<Dashboard />} />
              <Route path="accounts" element={<Dashboard />} />
              <Route path="*" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </AppProvider>
  );
}

export default App;