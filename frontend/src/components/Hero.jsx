import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppProvider';

// Simple typing animation hook — cycles through a list of roles
const useTypingAnimation = (words, typingSpeed = 80, deletingSpeed = 40, pauseTime = 1500) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
};

const Hero = ({ profile }) => {
  const { t, lang } = useAppContext();

  const headline = profile?.tagline?.[lang] || profile?.tagline?.id || profile?.tagline?.en || '';
  const bio = t('hero_subheadline');

  // Roles shown in the typing tag
  const titles = profile?.titles?.length > 0
    ? [...profile.titles]
        .sort((a, b) => a.order_index - b.order_index)
        .map(item => item.text?.[lang] || item.text?.id || item.text?.en || '')
        .filter(text => text !== '')
    : [];
  const typedText = useTypingAnimation(titles);

  return (
    <section
      id="home"
      className="relative px-6 md:px-10 overflow-hidden min-h-[calc(100vh-4.5rem)] flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center w-full pb-16">
        <div>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] font-medium"
              dangerouslySetInnerHTML={{ __html: headline }} />

          {titles.length > 0 && (
            <div className="mt-5 font-mono text-2xl flex items-center gap-1" style={{ color: 'var(--accent)' }}>
              <span>{typedText}</span>
              <span className="inline-block w-[2px] h-[1em] animate-pulse" style={{ background: 'var(--accent)' }}></span>
            </div>
          )}

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
          <img
            src="/profile.png"
            alt="Foto profil"
            className="relative w-[380px] h-[480px] md:w-[420px] md:h-[520px] object-cover object-[center_15%]"
            style={{ filter: 'sepia(12%) saturate(115%) brightness(0.95)' }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 font-mono text-xs tracking-[0.18em] uppercase"
        style={{ color: 'var(--text-muted)' }}
        aria-label="Scroll to About section"
      >
        <span>Scroll</span>
        <span
          className="w-px h-8 animate-bounce"
          style={{ background: 'var(--accent)' }}
        ></span>
      </a>
    </section>
  );
};

export default Hero;