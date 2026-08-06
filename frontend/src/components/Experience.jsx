import { useAppContext } from '../context/AppProvider';

const Experience = ({ experiences }) => {
  const { t, lang } = useAppContext();

  return (
    <section id="experience" className="px-6 md:px-10 py-20 md:py-28" style={{ background: 'var(--bg-soft)' }}>
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">{t('exp_eyebrow')}</p>
        <h2 className="font-display text-4xl font-medium mb-12">{t('exp_headline')}</h2>
        
        <div className="relative pl-8 space-y-10 w-full">
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
            
            const localizedDescription = (exp.description && exp.description[lang]) || '';
            
            return (
              <div key={exp.id} className="flex gap-5 md:gap-8 w-full group relative">
                {/* Timeline dot alignment adjustment */}
                <div className="timeline-dot mt-10 md:mt-12 shrink-0"></div>
                
                <div className="w-full bg-black/5 border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[var(--accent)]/40 relative">
                  
                  {/* Desktop Badge - Absolute Top Right */}
                  <div className="hidden md:block absolute top-6 right-6 md:top-8 md:right-8">
                    <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-1.5 rounded-full text-sm font-mono font-medium border border-[var(--accent)]/20">
                      {startDateFormatted} — {endDateFormatted}
                    </span>
                  </div>

                  {/* Header Area */}
                  <div className="md:pr-56">
                    <h3 className="font-display text-2xl font-semibold">{exp.position || exp.role}</h3>
                    <p className="font-mono text-base mt-1" style={{ color: 'var(--text-muted)' }}>
                      {exp.company} {exp.employment_type ? `· ${exp.employment_type}` : ''}
                    </p>
                  </div>
                  
                  {/* Mobile Badge - Inline Below Header */}
                  <div className="mt-4 md:hidden">
                    <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-1.5 rounded-full text-sm font-mono font-medium border border-[var(--accent)]/20">
                      {startDateFormatted} — {endDateFormatted}
                    </span>
                  </div>
                  
                  <ul className="mt-5 list-disc list-outside pl-5 space-y-2 text-base" style={{ color: 'var(--text-muted)' }}>
                    {localizedDescription.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                      <li key={i}>{line.trim()}</li>
                    ))}
                  </ul>
                  
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2.5 mt-6">
                      {exp.tags.map(tag => (
                        <span 
                          key={typeof tag === 'object' ? tag.tag : tag} 
                          className="bg-[var(--accent)]/10 text-[var(--accent)] font-medium text-sm px-3 py-1.5 rounded-md uppercase tracking-wider border border-[var(--accent)]/20"
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
