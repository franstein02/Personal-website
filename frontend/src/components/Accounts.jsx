import { useAppContext } from '../context/AppProvider';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaGlobe, FaYoutube } from 'react-icons/fa';

const getIcon = (platform) => {
  const p = platform?.toLowerCase() || '';
  if (p.includes('github')) return <FaGithub size={20} />;
  if (p.includes('linkedin')) return <FaLinkedin size={20} />;
  if (p.includes('instagram')) return <FaInstagram size={20} />;
  if (p.includes('twitter') || p.includes('x')) return <FaTwitter size={20} />;
  if (p.includes('facebook')) return <FaFacebook size={20} />;
  if (p.includes('youtube')) return <FaYoutube size={20} />;
  return <FaGlobe size={20} />;
};

const Accounts = ({ accounts }) => {
  const { t } = useAppContext();

  return (
    <section id="accounts" className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">{t('acc_eyebrow')}</p>
        <h2 className="font-display text-4xl font-medium mb-12">{t('acc_headline')}</h2>

        {accounts?.length > 0 ? accounts.map((acc, index) => (
          <div key={acc.id} className="account-row py-10 grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="flex items-center gap-5">
              <span className="account-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="account-icon">
                {getIcon(acc.platform)}
              </div>
              <div>
                <p className="eyebrow mb-1">{acc.category}</p>
                <h3 className="font-display text-2xl font-medium">{acc.platform}</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{acc.handle}</p>
              </div>
            </div>
            <div>
              <p className="max-w-md mb-4" style={{ color: 'var(--text-muted)' }}>{acc.description}</p>
              
              {acc.tags && acc.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {acc.tags.map(tag => (
                    <span key={typeof tag === 'object' ? tag.tag : tag} className="pill-tag">
                      {typeof tag === 'object' ? tag.tag : tag}
                    </span>
                  ))}
                </div>
              )}
              
              <a href={acc.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium inline-flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                {t('acc_visit')}
              </a>
            </div>
          </div>
        )) : (
          <div style={{ color: 'var(--text-muted)' }}>No accounts available.</div>
        )}

        <div className="pt-10 text-center">
          <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{t('footer_text')}</p>
        </div>
      </div>
    </section>
  );
};

export default Accounts;
