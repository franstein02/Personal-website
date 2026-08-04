import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppProvider';

const CertificateLightbox = ({ certificates, activeIndex, onClose, setIndex }) => {
  const { lang } = useAppContext();
  if (activeIndex === null) return null;
  const cert = certificates[activeIndex];
  
  const sortedImages = cert.images ? [...cert.images].sort((a, b) => a.page_order - b.page_order) : [];

  const handlePrev = (e) => {
    e.stopPropagation();
    setIndex(activeIndex === 0 ? certificates.length - 1 : activeIndex - 1);
  };
  
  const handleNext = (e) => {
    e.stopPropagation();
    setIndex(activeIndex === certificates.length - 1 ? 0 : activeIndex + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button 
        className="absolute left-4 md:left-8 z-50 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        onClick={handlePrev}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div 
        className="relative w-[90vw] max-w-5xl h-[85vh] bg-[#1a1a1a] rounded-2xl flex flex-col shadow-2xl overflow-hidden border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border-b border-white/10 shrink-0 z-10">
          <h3 className="text-white font-medium text-base md:text-lg truncate pr-4">{cert.title?.[lang] || ''}</h3>
          
          <div className="flex items-center gap-3 text-xs md:text-sm text-white/70 font-mono shrink-0">
            <span className="text-[#00e59b]">{activeIndex + 1} / {certificates.length}</span>
            <span>{sortedImages.length > 1 ? `${sortedImages.length} pages` : '1 page'}</span>
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-md transition-colors ml-2 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div key={activeIndex} className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col gap-10 hide-scrollbar bg-[#0a0a0a]">
          {sortedImages.length > 0 ? (
            sortedImages.map((img, idx) => (
              <div key={img.id || idx} className="flex flex-col items-center gap-4">
                <div className="bg-[#1a1a1a] p-2 md:p-4 rounded-xl shadow-xl w-full max-w-4xl flex justify-center border border-white/5">
                  <img 
                    src={img.image_url} 
                    alt={`${cert.title?.[lang] || ''} - Page ${idx + 1}`} 
                    className="max-w-full h-auto max-h-[70vh] object-contain select-none rounded-md"
                  />
                </div>
                <div className="text-white/50 text-xs font-mono">
                  Page {idx + 1} of {sortedImages.length}
                </div>
              </div>
            ))
          ) : (
            <div className="text-white/70 h-full flex items-center justify-center">No image available</div>
          )}
        </div>
      </div>

      <button 
        className="absolute right-4 md:right-8 z-50 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
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
  const { t, lang } = useAppContext();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      lang === 'id' ? 'id-ID' : 'en-US',
      { day: 'numeric', month: 'long', year: 'numeric' }
    );
  };

  return (
    <section id="certificates" className="px-6 md:px-10 py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">{t('cert_eyebrow')}</p>
        <h2 className="font-display text-4xl font-medium mb-12">{t('cert_headline')}</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {certificates?.length > 0 ? certificates.map((cert, idx) => {
            const sortedImages = cert.images ? [...cert.images].sort((a, b) => a.page_order - b.page_order) : [];
            const firstImage = sortedImages.length > 0 ? sortedImages[0].image_url : null;
            
            return (
              <div key={cert.id} className="card cert-card">
                <div className="cert-preview">
                  {firstImage ? (
                    <img src={firstImage} alt={cert.title?.[lang] || ''} />
                  ) : (
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{t('cert_preview_text')}</span>
                  )}
                </div>
                <div className="px-5 pb-2">
                  <h3 className="font-display text-lg font-medium mb-1">{cert.title?.[lang] || ''}</h3>
                  <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
                    {cert.issued_by?.[lang] || ''} · {formatDate(cert.issued_date)} 
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
          );
          }) : (
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
