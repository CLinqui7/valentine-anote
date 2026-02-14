import React, { useEffect, useMemo, useRef, useState } from 'react';

const koreanMessages = ['사랑해', '내 사랑']; // Te amo / Mi amor
const PREFERRED_EXT = 'jpeg'; // Preferimos .jpeg, pero soportamos .jpg como fallback automático.

const sections = [
  { id: 'inicio', type: 'intro' },
  {
    id: 'primera-cita',
    question: '¿Te acuerdas de nuestra primera cita?',
    images: ['cita_1', 'cita_2', 'cita_3', 'cita_4', 'cita_5'],
  },
  {
    id: 'primer-beso',
    question: '¿Te acuerdas de nuestro primer beso?',
    images: ['beso_1', 'beso_2', 'beso_3', 'beso_4', 'beso_5'],
  },
  {
    id: 'primera-vez',
    question: '¿Te acuerdas de nuestra primera vez?',
    images: ['primera_vez_1', 'primera_vez_2', 'primera_vez_3', 'primera_vez_4', 'primera_vez_5'],
  },
  {
    id: 'primer-hijo',
    question: '¿Te acuerdas de nuestro primer hijo?',
    images: ['caracol_1', 'caracol_2', 'caracol_3', 'caracol_4', 'caracol_5'],
  },
  {
    id: 'primera-navidad',
    question: '¿Te acuerdas de nuestra primera Navidad?',
    images: ['navidad_1', 'navidad_2', 'navidad_3', 'navidad_4', 'navidad_5'],
  },
  {
    id: 'ano-nuevo',
    question: '¿Te acuerdas de nuestro primer año nuevo?',
    images: ['año_nuevo_1', 'año_nuevo_2', 'año_nuevo_3', 'año_nuevo_4', 'año_nuevo_5'],
  },
  {
    id: 'novios',
    question: '¿Te acuerdas de cuando te pedí ser novios?',
    images: [
      'propuesta_1',
      'propuesta_2',
      'propuesta_3',
      'propuesta_4',
      'propuesta_5',
      'propuesta_6',
      'propuesta_7',
      'propuesta_8',
      'propuesta_9',
      'propuesta_10',
    ],
  },
  {
    id: 'final',
    type: 'final',
    question: '¿Quieres ser mi Valentine?',
    images: Array.from({ length: 30 }, (_, i) => `fotos_ultima_${i + 1}`),
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalYes, setFinalYes] = useState(false);

  // Cursor caracol 🐌 (optimizado, solo desktop y sin reduced-motion)
  const [showSnail, setShowSnail] = useState(false);
  const [snailActive, setSnailActive] = useState(false);
  const snailRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const pointerFine = window.matchMedia?.('(pointer: fine)')?.matches ?? false;
    setShowSnail(pointerFine && !prefersReducedMotion);
  }, []);

  useEffect(() => {
    if (!showSnail) return;

    const el = snailRef.current;
    if (!el) return;

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setSnailActive(true);
    };
    const onLeave = () => setSnailActive(false);

    const tick = () => {
      const { x, y } = mouseRef.current;
      el.style.transform = `translate3d(${x + 14}px, ${y + 14}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [showSnail]);

  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, sections.length - 1));
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const current = sections[currentIndex];
  const nextSection = sections[Math.min(currentIndex + 1, sections.length - 1)];

  // Pre-carga mínima: 2 imágenes de la siguiente sección (sin quemar RAM)
  usePrefetchImages((nextSection?.images ?? []).slice(0, 2), PREFERRED_EXT);

  return (
    <div className="app">
      {showSnail && (
        <div
          ref={snailRef}
          className={`snail-cursor ${snailActive ? 'snail-cursor--active' : ''}`}
          aria-hidden="true"
        >
          🐌
        </div>
      )}

      <div className="background-glow" />

      <div className="content-wrapper">
        {current.type === 'intro' ? (
          <Intro onStart={goNext} />
        ) : current.type === 'final' ? (
          <MemorySection
            section={current}
            onPrev={goPrev}
            isFinal
            onFinalYes={() => setFinalYes(true)}
            finalYes={finalYes}
          />
        ) : (
          <MemorySection section={current} onNext={goNext} onPrev={goPrev} />
        )}
      </div>

      <CornerKoreanMessages />
    </div>
  );
}

function Intro({ onStart }) {
  const phrase = 'Hola, Anote';

  return (
    <section className="section section--centered">
      <div className="intro-card">
        <h1 className="intro-title">
          {phrase.split('').map((char, index) => (
            <span
              key={index}
              className={char === ' ' ? 'intro-title__space' : 'intro-title__letter'}
              style={{ '--i': index }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="intro-subtitle">Un pequeño viaje por nuestras memorias. 💌</p>
        <button className="btn-primary" onClick={onStart}>
          Inicio
        </button>
      </div>
    </section>
  );
}

function MemorySection({ section, onNext, onPrev, isFinal, onFinalYes, finalYes }) {
  return (
    <section className="section">
      <header className="section-header">
        <p className="section-step">{isFinal ? 'Final' : 'Recuerdo'}</p>
        <h2 className="section-question">{section.question}</h2>
      </header>

      <div className={`collage collage--${section.images.length}`}>
        {section.images.map((name) => (
          <div key={name} className="collage-item">
            <div className="collage-item__inner">
              <LazyImage base={`/imagenes/${name}`} alt={name} preferredExt={PREFERRED_EXT} />
            </div>
          </div>
        ))}
      </div>

      <div className="section-actions">
        {onPrev && (
          <button className="btn-secondary" onClick={onPrev}>
            Volver
          </button>
        )}

        {isFinal ? (
          <div className="final-actions">
            <button className="btn-primary btn-primary--floaty" onClick={onFinalYes}>
              Sí quiero ser tu Valentine
            </button>

            {/* NO: solo imagen, NO clickeable */}
            <img className="no-sticker" src="/no.svg" alt="No" draggable="false" aria-hidden="true" />
          </div>
        ) : (
          onNext && (
            <button className="btn-primary btn-primary--floaty" onClick={onNext}>
              Sí, me acuerdo
            </button>
          )
        )}
      </div>

      {isFinal && finalYes && <div className="final-yes">💘💘💘</div>}
    </section>
  );
}

function LazyImage({ base, alt, preferredExt = 'jpeg' }) {
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          setSrc(`${base}.${preferredExt}`);
          io.disconnect();
        }
      },
      { root: null, rootMargin: '250px', threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [base, preferredExt]);

  const handleError = () => {
    // Fallback: si no existe .jpeg, intenta .jpg
    if (src && src.endsWith('.jpeg')) setSrc(`${base}.jpg`);
  };

  return (
    <div ref={ref} className="lazy-wrap">
      {visible ? (
        <img
          src={src}
          alt={alt}
          onError={handleError}
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
      ) : (
        <div className="img-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}

function usePrefetchImages(names, preferredExt = 'jpeg') {
  const safe = useMemo(() => (Array.isArray(names) ? names.filter(Boolean) : []), [names]);

  useEffect(() => {
    if (!safe.length) return;

    const links = safe.map((name) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = `/imagenes/${name}.${preferredExt}`;
      document.head.appendChild(link);
      return link;
    });

    return () => links.forEach((l) => l.remove());
  }, [safe, preferredExt]);
}

function CornerKoreanMessages() {
  return (
    <>
      <div className="korean-note korean-note--top-left">{koreanMessages[0]}</div>
      <div className="korean-note korean-note--bottom-right">{koreanMessages[1]}</div>
    </>
  );
}

export default App;
