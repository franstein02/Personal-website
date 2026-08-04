import { useState } from 'react';
import { useAppContext } from '../context/AppProvider';

const CertificateLightbox = ({ certificates, activeIndex, onClose, setIndex }) => {
  if (activeIndex === null) return null;
  const cert = certificates[activeIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    setIndex(activeIndex === 0 ? certificates.length - 1 : activeIndex - 1);
  };
  
  const handleNext = (e) => {
    e.stopPropagation();
    setIndex(activeIndex === certificates.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 z-50">
        <button onClick={onClose} className="p-2 text-white/70 hover:text-white bg-black/50 rounded-full transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="absolute top-4 left-4 z-50">
        <div className="text-white font-medium">{cert.title}</div>
        <div className="text-white/70 text-sm">{activeIndex + 1} / {certificates.length}</div>
      </div>

      <button 
        className="absolute left-4 md:left-8 z-50 p-3 text-white/70 hover:text-white bg-black/50 rounded-full transition-colors"
        onClick={handlePrev}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="relative w-full h-full max-w-5xl max-h-[90vh] p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {cert.image_url ? (
          <img 
            src={cert.image_url} 
            alt={cert.title} 
            className="max-w-full max-h-full object-contain select-none"
          />
        ) : (
          <div className="text-white/70">No image available</div>
        )}
      </div>

      <button 
        className="absolute right-4 md:right-8 z-50 p-3 text-white/70 hover:text-white bg-black/50 rounded-full transition-colors"
        onClick={handleNext}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

const Certificates = ({ certificates }) => {
  const { t } = useAppContext();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <section id="certificates" className="px-6 md:px-10 py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">{t('cert_eyebrow')}</p>
        <h2 className="font-display text-4xl font-medium mb-12">{t('cert_headline')}</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {certificates?.length > 0 ? certificates.map((cert, idx) => (
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
                  {cert.issued_by} · {formatDate(cert.issued_date)} 
                </p>
              </div>
              <button className="btn-view" onClick={() => setLightboxIndex(idx)}>
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

      <CertificateLightbox 
        certificates={certificates}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        setIndex={setLightboxIndex}
      />
    </section>
  );
};

export default Certificates;
