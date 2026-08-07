import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppProvider';
import { Link } from 'react-router-dom';
import { FiMail, FiMapPin, FiChevronUp } from 'react-icons/fi';

const Footer = ({ profile }) => {
  const { t } = useAppContext();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const fullName = profile?.full_name || 'Fransciesco Steinlie';
  const email = profile?.email || '';
  const location = profile?.location || '';

  return (
    <footer className="relative border-t px-6 md:px-10" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-soft)' }}>
      <div className="max-w-6xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          
          {/* Left Section */}
          <div className="flex flex-col gap-6">
            <div>
              <a href="#home" className="font-display text-2xl font-semibold tracking-tight inline-block mb-4">
                {fullName}<span style={{ color: 'var(--accent)' }}>.</span>
              </a>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {t('based_in')} {location}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-2">
              <a href="#home" className="nav-link text-sm">{t('nav_home')}</a>
              <a href="#about" className="nav-link text-sm">{t('nav_about')}</a>
              <a href="#certificates" className="nav-link text-sm">{t('nav_certificates')}</a>
              <a href="#experience" className="nav-link text-sm">{t('nav_experience')}</a>
              <a href="#accounts" className="nav-link text-sm">{t('nav_accounts')}</a>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col md:items-end">
            <div className="w-full md:w-auto">
              <h3 className="font-display text-xl font-medium mb-6">{t('get_in_touch')}</h3>
              
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--surface-2)', color: 'var(--accent)' }}>
                    <FiMail size={18} />
                  </div>
                  <div>
                    <p className="eyebrow mb-1">{t('footer_email')}</p>
                    <a href={`mailto:${email}`} className="text-sm hover:underline" style={{ color: 'var(--text)' }}>
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--surface-2)', color: 'var(--accent)' }}>
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <p className="eyebrow mb-1">{t('footer_location')}</p>
                    <p className="text-sm" style={{ color: 'var(--text)' }}>
                      {location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2026 {fullName}. All rights reserved.
          </p>
          <Link to="/admin/login" className="text-sm hover:underline" style={{ color: 'var(--text-muted)' }}>
            Admin
          </Link>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 cursor-pointer ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
        aria-label="Back to top"
      >
        <FiChevronUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
