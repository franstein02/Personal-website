import { useAppContext } from '../context/AppProvider';

const Experience = ({ experiences }) => {
  const { t } = useAppContext();

  return (
    <section id="experience" className="px-6 md:px-10 py-20 md:py-28" style={{ background: 'var(--bg-soft)' }}>
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">{t('exp_eyebrow')}</p>
        <h2 className="font-display text-4xl font-medium mb-12">{t('exp_headline')}</h2>
        
        <div className="relative pl-8 space-y-10 max-w-2xl">
          <div className="timeline-line"></div>
          
          {experiences?.length > 0 ? experiences.map((exp) => {
            const startDate = new Date(exp.start_date).getFullYear();
            const endDate = exp.end_date ? new Date(exp.end_date).getFullYear() : t('exp_now');
            
            return (
              <div key={exp.id} className="flex gap-5">
                <div className="timeline-dot mt-1"></div>
                <div>
                  <p className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                    {startDate} — {endDate}
                  </p>
                  <h3 className="font-display text-xl font-medium mt-1">{exp.role} / {exp.company}</h3>
                  <p className="mt-2" style={{ color: 'var(--text-muted)' }}>{exp.description}</p>
                  
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.tags.map(tag => (
                        <span key={typeof tag === 'object' ? tag.tag : tag} className="tag">
                          {typeof tag === 'object' ? tag.tag : tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          }) : (
            <div style={{ color: 'var(--text-muted)' }}>No experiences available.</div>
          )}
          
        </div>
      </div>
    </section>
  );
};

export default Experience;
