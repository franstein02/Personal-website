import { useHomeData } from './hooks/useHomeData';
import { AppProvider } from './context/AppProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import Accounts from './components/Accounts';
import Footer from './components/Footer';

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
      <PortfolioApp />
    </AppProvider>
  );
}

export default App;