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
            const formatMonthYear = (dateString) => {
              if (!dateString) return t('exp_now') || 'Present';
              const date = new Date(dateString);
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const year = date.getFullYear();
              return `${month}/${year}`;
            };
            
            const startDateFormatted = formatMonthYear(exp.start_date);
            const endDateFormatted = formatMonthYear(exp.end_date);
            
            return (
              <div key={exp.id} className="flex gap-5 w-full">
                <div className="timeline-dot mt-2"></div>
                <div className="w-full pb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <h3 className="font-display text-xl font-medium">{exp.role}</h3>
                      <p className="font-mono text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        {exp.company} {exp.employment_type ? `· ${exp.employment_type}` : ''}
                      </p>
                    </div>
                    <div className="shrink-0 mt-1 md:mt-0">
                      <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--accent)]/20">
                        {startDateFormatted} — {endDateFormatted}
                      </span>
                    </div>
                  </div>
                  
                  <ul className="mt-5 list-disc list-outside pl-4 space-y-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                    {exp.description?.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                      <li key={i}>{line.trim()}</li>
                    ))}
                  </ul>
                  
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {exp.tags.map(tag => (
                        <span 
                          key={typeof tag === 'object' ? tag.tag : tag} 
                          className="bg-[var(--accent)]/10 text-[var(--accent)] font-medium text-xs px-2.5 py-1 rounded-md uppercase tracking-wider border border-[var(--accent)]/20"
                        >
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
