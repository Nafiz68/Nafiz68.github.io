import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import SectionHeader from './fx/SectionHeader';
import { Reveal, EASE } from './fx/Reveal';
import { lockScroll } from '../lib/scroll';

const certificates = [
  {
    title: "AI Foundation",
    issuer: "AI Certs",
    date: "2025",
    image: "/images/certificates/AF.jpg",
    description: "Covered core AI concepts, machine learning algorithms, ethical implications, and business alignment."
  },
  {
    title: "Research Training & Competition 2026",
    issuer: "Elite Research Lab LLC",
    date: "2026",
    image: "/images/certificates/elite.png",
    description: "Completed ELITE Research Lab’s Research Training & Competition 2026, contributing to a research paper as member of LLM Security Research Team.",
  },
  {
    title: "Intro to Machine Learning",
    issuer: "Kaggle",
    date: "2025",
    image: "/images/certificates/Intro to Machine Learning.png",
    description: "Learned practical implementation of data frames, feature selection, and supervised learning algorithms."
  },
  {
    title: "Intermediate ChatGPT",
    issuer: "DataCamp",
    date: "2025",
    image: "/images/certificates/ChatGPT.jpg",
    description: "Focused on advanced prompt engineering methodologies, GPT architectures, and workflow configurations."
  },
  {
    title: "Learn Blockchain & Crypto",
    issuer: "Udemy",
    date: "2025",
    image: "/images/certificates/Blockchain.jpg",
    description: "Gained foundational knowledge in distributed ledgers, blockchain validation, and smart contracts."
  },
  {
    title: "Intermediate SQL",
    issuer: "DataCamp",
    date: "2024",
    image: "/images/certificates/SQL.jpg",
    description: "Mastered subqueries, aggregate grouping, data correlation, and complex relational schema joins."
  }
];

function Lightbox({ cert, onClose }) {
  useEffect(() => {
    lockScroll(true);
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full border hairline glass text-fog hover:text-accent hover:border-accent/60 transition-colors flex items-center justify-center"
        aria-label="Close preview"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <motion.div
        className="max-w-4xl w-full rounded-2xl overflow-hidden border hairline bg-ink-900 p-2"
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={cert.image} alt={cert.title} className="w-full max-h-[68vh] object-contain rounded-xl" />
      </motion.div>

      <motion.div
        className="mt-6 text-center max-w-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Issued by {cert.issuer} · {cert.date}</p>
        <h4 className="text-2xl font-semibold tracking-tight text-fog mb-2">{cert.title}</h4>
        <p className="text-sm text-muted leading-relaxed">{cert.description}</p>
      </motion.div>
    </motion.div>
  );
}

const CYCLE_MS = 2000;
const GLIDE = { duration: 0.9, ease: [0.65, 0, 0.35, 1] };
const RESUME_AFTER_MS = 4000;

const monogram = (issuer) =>
  issuer.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

// Shortest signed distance from the active slide, so the ring wraps around.
const offsetFrom = (i, active, n) => {
  let d = i - active;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
};

function useCardWidth() {
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 520 : Math.min(520, Math.max(250, window.innerWidth * 0.36))));
  useEffect(() => {
    const onResize = () => setW(Math.min(520, Math.max(250, window.innerWidth * (window.innerWidth < 640 ? 0.72 : 0.36))));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return w;
}

export default function Certificates() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [active, setActive] = useState(0);
  // Manual interaction holds the carousel briefly, then autoplay resumes.
  const [holdUntil, setHoldUntil] = useState(0);
  const paused = holdUntil > 0;
  const stageRef = useRef(null);
  const inView = useInView(stageRef, { margin: '-25% 0px -25% 0px' });
  const width = useCardWidth();
  const n = certificates.length;
  const cert = certificates[active];

  const step = useCallback((dir) => setActive((a) => (a + dir + n) % n), [n]);
  const hold = () => setHoldUntil(Date.now() + RESUME_AFTER_MS);
  const go = (dir) => {
    hold();
    step(dir);
  };
  const pick = (i) => {
    hold();
    setActive(i);
  };

  useEffect(() => {
    if (!holdUntil) return undefined;
    const id = setTimeout(() => setHoldUntil(0), Math.max(0, holdUntil - Date.now()));
    return () => clearTimeout(id);
  }, [holdUntil]);

  // Right-to-left: each tick brings the next certificate in from the right.
  useEffect(() => {
    if (!inView || paused || lightboxImg) return undefined;
    const id = setTimeout(() => step(1), CYCLE_MS);
    return () => clearTimeout(id);
  }, [inView, paused, lightboxImg, active, step]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  return (
    <section id="certificates" className="relative py-14 md:py-20 overflow-hidden">
      <div className="container-x">
        <SectionHeader
          index="05"
          label="Credentials"
          title="Certifications & *training*."
          description="Technical validations and professional training courses completed."
        />

        <Reveal>
          <div
            ref={stageRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            aria-roledescription="carousel"
            aria-label="Certificates"
            className="relative outline-none"
          >
            {/* Stage */}
            <motion.div
              className="relative mx-auto touch-pan-y select-none"
              style={{ height: width * 0.72 + 40, perspective: 1400 }}
              onPanEnd={(_, info) => {
                if (info.offset.x < -50) go(1);
                else if (info.offset.x > 50) go(-1);
              }}
            >
              <div
                aria-hidden="true"
                className="absolute left-1/2 bottom-0 -translate-x-1/2 h-24 rounded-[50%] pointer-events-none"
                style={{ width: width * 1.6, background: 'radial-gradient(ellipse at center, rgb(var(--accent) / 0.18), transparent 65%)' }}
              />
              {certificates.map((c, i) => {
                const d = offsetFrom(i, active, n);
                const abs = Math.abs(d);
                const isActive = d === 0;
                return (
                  <motion.button
                    key={c.title}
                    type="button"
                    onClick={() => (isActive ? (hold(), setLightboxImg(c)) : pick(i))}
                    data-cursor={isActive ? 'View' : undefined}
                    aria-label={isActive ? `View ${c.title}` : `Show ${c.title}`}
                    tabIndex={abs > 1 ? -1 : 0}
                    className="absolute top-0 left-1/2 origin-center"
                    style={{ width, marginLeft: -width / 2, zIndex: 20 - abs, transformStyle: 'preserve-3d' }}
                    initial={false}
                    animate={{
                      x: d * width * 0.62,
                      rotateY: d * -32,
                      z: -abs * 140,
                      scale: 1 - Math.min(abs, 3) * 0.08,
                      opacity: abs > 2 ? 0 : 1 - abs * 0.3,
                    }}
                    transition={GLIDE}
                  >
                    <div
                      className={`group relative rounded-2xl p-2 border transition-colors duration-500 ${
                        isActive ? 'border-accent/40 bg-ink-900' : 'hairline bg-ink-900/80'
                      }`}
                      style={{ boxShadow: isActive ? '0 30px 80px -30px rgb(0 0 0 / 0.55), 0 0 0 1px rgb(var(--accent) / 0.08)' : 'var(--card-shadow)' }}
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white">
                        <img
                          src={c.image}
                          alt={`${c.title} certificate`}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        {/* light sweep on hover */}
                        <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:translate-x-[320%] transition-transform duration-[1100ms] ease-out" />
                        {!isActive && <span className="absolute inset-0 bg-ink-950/35 transition-opacity" />}
                        {isActive && (
                          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-accent text-on-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider shadow-lg">
                            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Details + controls */}
            <div className="mt-6 md:mt-8 grid md:grid-cols-[1fr_auto] items-center gap-6 max-w-4xl mx-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex items-start gap-4"
                >
                  <span className="w-11 h-11 shrink-0 rounded-xl border hairline bg-ink-800 flex items-center justify-center font-mono text-xs font-medium text-accent">
                    {monogram(cert.issuer)}
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                      {cert.issuer} / {cert.date}
                    </div>
                    <h3 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight text-fog">{cert.title}</h3>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed max-w-xl">{cert.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-4 md:flex-col md:items-end">
                <div className="flex items-center gap-2">
                  <button onClick={() => go(-1)} aria-label="Previous certificate" className="w-11 h-11 rounded-full border hairline text-fog hover:bg-accent hover:text-on-accent hover:border-accent transition-colors">←</button>
                  <button onClick={() => go(1)} aria-label="Next certificate" className="w-11 h-11 rounded-full border hairline text-fog hover:bg-accent hover:text-on-accent hover:border-accent transition-colors">→</button>
                </div>
                <div className="flex items-center gap-1.5">
                  {certificates.map((c, i) => (
                    <button
                      key={c.title}
                      onClick={() => pick(i)}
                      aria-label={`Go to ${c.title}`}
                      className="relative h-1.5 rounded-full bg-fog/15 overflow-hidden transition-all duration-500"
                      style={{ width: i === active ? 28 : 8 }}
                    >
                      {i === active && inView && !paused && !lightboxImg && (
                        <motion.span
                          key={active}
                          className="absolute inset-0 bg-accent origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                        />
                      )}
                      {i === active && (paused || !inView || lightboxImg) && <span className="absolute inset-0 bg-accent" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {lightboxImg && <Lightbox key={lightboxImg.title} cert={lightboxImg} onClose={() => setLightboxImg(null)} />}
      </AnimatePresence>
    </section>
  );
}
