import { useAppContext } from '../context/AppProvider';

const About = ({ profile }) => {
  const { t } = useAppContext();

  // Parse bio_long if available, else fallback
  const p1 = profile?.bio_long ? profile.bio_long.split('\n')[0] : t('about_p1');
  const p2 = profile?.bio_long ? profile.bio_long.split('\n')[1] : t('about_p2');

  const skills = profile?.skills || ['React', 'FastAPI', 'PostgreSQL', 'Docker', 'Tailwind CSS'];

  return (
    <section id="about" className="px-6 md:px-10 py-20 md:py-28" style={{ background: 'var(--bg-soft)' }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-[0.9fr_1.3fr] gap-14 items-start">
        <div>
          <div className="rounded-[20px] overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <img 
              src="/profile.png" 
              alt="Foto profil" 
              className="w-full h-full object-cover" 
              style={{ objectPosition: 'center 15%', filter: 'sepia(12%) saturate(115%) brightness(0.95)' }} 
            />
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">{t('about_eyebrow')}</p>
          <h2 className="font-display text-4xl font-medium leading-tight mb-6">{t('about_headline')}</h2>
          <div className="grain-line mb-6"></div>
          <div className="space-y-6" style={{ color: 'var(--text-muted)' }}>
            <p className="text-lg leading-relaxed">{p1}</p>
            {p2 && <p className="leading-relaxed">{p2}</p>}
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map(skill => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
