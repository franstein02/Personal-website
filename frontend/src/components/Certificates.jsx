import { useAppContext } from '../context/AppProvider';

const Certificates = ({ certificates }) => {
  const { t } = useAppContext();

  return (
    <section id="certificates" className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">{t('cert_eyebrow')}</p>
        <h2 className="font-display text-4xl font-medium mb-12">{t('cert_headline')}</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {certificates?.length > 0 ? certificates.map((cert) => (
            <div key={cert.id} className="card cert-card">
              <div className="cert-preview">
                {cert.image_url ? (
                  <img src={cert.image_url} alt={cert.title} />
                ) : (
                  <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{t('cert_preview_text')}</span>
                )}
              </div>
              <div className="px-5 pb-2">
                <h3 className="font-display text-lg font-medium mb-1">{cert.title}</h3>
                <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
                  {cert.issuer} · {cert.year_issued || new Date(cert.date_issued).getFullYear()}
                </p>
              </div>
              <button className="btn-view" onClick={() => cert.credential_url ? window.open(cert.credential_url, '_blank') : null}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
                {t('cert_btn_view')}
              </button>
            </div>
          )) : (
            <div className="col-span-3 text-center" style={{ color: 'var(--text-muted)' }}>No certificates available.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
