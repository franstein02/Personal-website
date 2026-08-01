import { useAppContext } from '../context/AppProvider';

const Hero = ({ profile }) => {
  const { t } = useAppContext();
  
  // Using profile data if available, else fallback to translation
  const headline = profile?.headline || t('hero_headline');
  const role = profile?.current_role || t('hero_role');
  const bio = profile?.bio_short || t('hero_subheadline');

  return (
    <section id="home" className="relative px-6 md:px-10 py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="eyebrow mb-4">{role}</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] font-medium" 
              dangerouslySetInnerHTML={{ __html: headline }} />
          <p className="mt-6 text-lg max-w-md" style={{ color: 'var(--text-muted)' }}>
            {bio}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#experience" className="btn-primary">{t('hero_cta_primary')}</a>
            <a href="#accounts" className="btn-ghost">{t('hero_cta_secondary')}</a>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="hero-glow"></div>
          <div className="portrait-frame">
            <div className="portrait-mask">
              <img src="/profile.png" alt="Foto profil" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
