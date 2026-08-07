import { useAppContext } from '../context/AppProvider';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaGlobe, FaYoutube } from 'react-icons/fa';

const getIcon = (platform) => {
  const p = platform?.toLowerCase() || '';
  if (p.includes('github')) return <FaGithub size={24} />;
  if (p.includes('linkedin')) return <FaLinkedin size={24} />;
  if (p.includes('instagram')) return <FaInstagram size={24} />;
  if (p.includes('twitter') || p.includes('x')) return <FaTwitter size={24} />;
  if (p.includes('facebook')) return <FaFacebook size={24} />;
  if (p.includes('youtube')) return <FaYoutube size={24} />;
  return <FaGlobe size={24} />;
};

const Accounts = ({ accounts }) => {
  const { t, lang } = useAppContext();

  // Helper to get localized text
  const getLocalized = (textObj) => {
    if (!textObj) return '';
    if (typeof textObj === 'string') return textObj;
    return textObj[lang] || textObj['en'] || '';
  };

  return (
    <section id="accounts" className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">{t('acc_eyebrow')}</p>
        <h2 className="font-display text-4xl font-medium mb-12">{t('acc_headline')}</h2>

        <div className="flex flex-col">
          {accounts?.length > 0 ? accounts.map((acc, index) => {
            const isEven = index % 2 !== 0; // 0-indexed, so index 1 is the 2nd item (even in 1-indexed)
            
            const leftContent = (
              <div className="flex flex-col h-full justify-center">
                <div className="flex items-center gap-6 md:gap-8">
                  <span className="text-7xl md:text-8xl font-display font-bold opacity-10 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shrink-0">
                      {getIcon(acc.platform)}
                    </div>
                    <div>
                      <p className="eyebrow mb-1">{acc.category || 'SOCIAL MEDIA'}</p>
                      <h3 className="font-display text-2xl font-medium leading-none mb-2">{acc.platform}</h3>
                      <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
                        {acc.category === 'SOCIAL MEDIA' ? `@${acc.username}` : acc.username}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );

            const rightContent = (
              <div className="flex flex-col h-full justify-center mt-6 md:mt-0">
                <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                  {getLocalized(acc.description)}
                </p>
                
                {acc.tags && acc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {acc.tags.map(tag => (
                      <span 
                        key={typeof tag === 'object' ? tag.tag : tag} 
                        className="px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase"
                        style={{ backgroundColor: 'rgba(var(--accent-rgb, 120, 120, 120), 0.1)', color: 'var(--accent)' }}
                      >
                        {typeof tag === 'object' ? tag.tag : tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <a 
                  href={acc.profile_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 font-medium group transition-colors hover:opacity-80"
                  style={{ color: 'var(--accent)' }}
                >
                  {t('acc_visit')}
                </a>
              </div>
            );

            return (
              <div key={acc.id} className="py-16 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  {/* On mobile, leftContent is always on top. On desktop, it alternates */}
                  <div className={`order-1 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    {leftContent}
                  </div>
                  <div className={`order-2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    {rightContent}
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="py-10" style={{ color: 'var(--text-muted)' }}>No accounts available.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Accounts;
