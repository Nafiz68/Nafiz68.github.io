import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { EASE } from './Reveal';
import ScrambleText from './ScrambleText';

const STATUS = [
  'booting kernel',
  'mounting neural modules',
  'compiling projects',
  'linking experience',
  'establishing uplink',
];

const LOAD_MS = 1900;
const LOCK_MS = 550;
const SPLIT = [0.76, 0, 0.24, 1];

const RING_R = 92;
const RING_C = 2 * Math.PI * RING_R;

// "N" and "K" as single strokes, drawn on in sequence.
const MONOGRAM = [
  'M14 58 V14 L44 58 V14',
  'M60 14 V58',
  'M90 14 L60 40',
  'M70 31 L92 58',
];

const pad = (v) => String(Math.round(v)).padStart(3, '0');

// Resolves once fonts are in and the main thread has a quiet moment, i.e. after the
// site underneath has finished its initial mount. Capped so a busy page can't stall the intro.
const settled = () =>
  Promise.race([
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((r) => (window.requestIdleCallback ? window.requestIdleCallback(r, { timeout: 450 }) : setTimeout(r, 150))),
    ]),
    new Promise((r) => setTimeout(r, 700)),
  ]);

function Corner({ className }) {
  return <span className={`absolute w-6 h-6 border-accent/60 ${className}`} />;
}

// A ring drawn in its own SVG and spun as an HTML layer, so rotation stays on the compositor.
function SpinningRing({ duration, reverse, children }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 will-change-transform"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 220 220" className="w-full h-full">{children}</svg>
    </motion.div>
  );
}

// Boot intro: the monogram draws inside a HUD ring while a progress arc fills, then the
// screen locks, a light beam crosses the middle and the two halves split apart.
// Progress lives in a motion value, so the arc, bar and counter update without React renders.
export default function Preloader({ onReveal, onDone }) {
  const [phase, setPhase] = useState('load'); // load -> lock -> exit
  const [started, setStarted] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const progress = useMotionValue(0);
  const counterRef = useRef(null);

  const dashOffset = useTransform(progress, (v) => RING_C * (1 - v / 100));
  const barScale = useTransform(progress, (v) => v / 100);

  useMotionValueEvent(progress, 'change', (v) => {
    if (counterRef.current) counterRef.current.textContent = `${pad(v)}%`;
    const idx = Math.min(STATUS.length - 1, Math.floor(v / (100 / STATUS.length)));
    setStatusIdx((cur) => (cur === idx ? cur : idx));
  });

  useEffect(() => {
    let alive = true;
    settled().then(() => alive && setStarted(true));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!started) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lockTimer;
    const controls = animate(progress, 100, {
      duration: (reduced ? 300 : LOAD_MS) / 1000,
      ease: [0.25, 0.6, 0.35, 1],
      onComplete: () => {
        setPhase('lock');
        lockTimer = setTimeout(() => setPhase('exit'), reduced ? 0 : LOCK_MS);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(lockTimer);
    };
  }, [started, progress]);

  useEffect(() => {
    if (phase === 'exit' && onReveal) onReveal();
  }, [phase, onReveal]);

  const locked = phase !== 'load';
  const exiting = phase === 'exit';
  const status = locked ? 'access granted' : STATUS[statusIdx];

  const panel = 'absolute inset-x-0 h-1/2 bg-ink-950 overflow-hidden will-change-transform';

  return (
    <div className="fixed inset-0 z-[150]" aria-label="Loading" role="status">
      {/* Two halves that split apart on exit */}
      <motion.div
        className={`${panel} top-0`}
        animate={exiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 1, ease: SPLIT, delay: 0.15 }}
        onAnimationComplete={() => exiting && onDone()}
      >
        <div className="absolute inset-0 grid-bg opacity-60" style={{ backgroundPosition: 'center bottom' }} />
      </motion.div>
      <motion.div
        className={`${panel} bottom-0`}
        animate={exiting ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 1, ease: SPLIT, delay: 0.15 }}
      >
        <div className="absolute inset-0 grid-bg opacity-60" />
      </motion.div>

      {/* Light beam across the seam */}
      <motion.div
        aria-hidden="true"
        className="absolute left-0 right-0 top-1/2 -mt-px h-[2px] origin-center will-change-transform"
        style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--accent)) 20%, rgb(var(--accent)) 80%, transparent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          exiting
            ? { scaleX: 1, opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }
            : locked
              ? { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } }
              : { scaleX: 0, opacity: 0 }
        }
      />

      {/* HUD content */}
      <motion.div
        className="absolute inset-0 flex flex-col p-5 md:p-10 will-change-transform"
        animate={exiting ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="relative grid grid-cols-2 sm:grid-cols-3 items-center font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-dim">
          <span>nafiz.khan / portfolio</span>
          <span className="hidden sm:block text-center">23.8103° N / 90.4125° E</span>
          <span className="text-right">v4.0 / {new Date().getFullYear()}</span>
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center">
          {/* Ring + monogram */}
          <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px]">
            <Corner className="top-0 left-0 border-t border-l rounded-tl-md" />
            <Corner className="top-0 right-0 border-t border-r rounded-tr-md" />
            <Corner className="bottom-0 left-0 border-b border-l rounded-bl-md" />
            <Corner className="bottom-0 right-0 border-b border-r rounded-br-md" />

            <SpinningRing duration={18}>
              <circle cx="110" cy="110" r="104" fill="none" stroke="rgb(var(--fog) / 0.18)" strokeWidth="1" strokeDasharray="1.5 6" />
            </SpinningRing>
            <SpinningRing duration={9} reverse>
              <circle cx="110" cy="110" r="74" fill="none" stroke="rgb(var(--accent) / 0.35)" strokeWidth="1" strokeDasharray="28 14 4 14" />
            </SpinningRing>

            {/* track + progress arc (a wide faint stroke underneath stands in for a glow filter) */}
            <svg viewBox="0 0 220 220" className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="110" cy="110" r={RING_R} fill="none" stroke="rgb(var(--fog) / 0.08)" strokeWidth="2" />
              <motion.circle
                cx="110"
                cy="110"
                r={RING_R}
                fill="none"
                stroke="rgb(var(--accent) / 0.18)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                style={{ strokeDashoffset: dashOffset }}
              />
              <motion.circle
                cx="110"
                cy="110"
                r={RING_R}
                fill="none"
                stroke="rgb(var(--accent))"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                style={{ strokeDashoffset: dashOffset }}
              />
            </svg>

            {/* radar sweep */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-[16%] rounded-full will-change-transform"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 290deg, rgb(var(--accent) / 0.28) 360deg)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 38%, #000 40%)',
                maskImage: 'radial-gradient(circle, transparent 38%, #000 40%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            />

            {/* orbiting dots */}
            {[{ d: 3.2, r: 0 }, { d: 5, r: 180 }].map((o) => (
              <motion.div
                key={o.r}
                aria-hidden="true"
                className="absolute inset-[8%] will-change-transform"
                initial={{ rotate: o.r }}
                animate={{ rotate: o.r + 360 }}
                transition={{ duration: o.d, repeat: Infinity, ease: 'linear' }}
              >
                <span className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent))]" />
              </motion.div>
            ))}

            {/* monogram + counter, centered in the ring */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="relative w-[42%]">
                {/* lock glow: a soft blob that fades in, instead of animated filters on the strokes */}
                <motion.span
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgb(var(--accent) / 0.35), transparent 65%)' }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={locked ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <motion.svg
                  viewBox="0 0 106 72"
                  className="relative w-full overflow-visible"
                  animate={locked ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {MONOGRAM.map((d, i) => (
                    <motion.path
                      key={d}
                      d={d}
                      fill="none"
                      stroke={locked ? 'rgb(var(--accent))' : 'rgb(var(--fog))'}
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={started ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                      transition={{
                        pathLength: { duration: 0.55, ease: EASE, delay: 0.2 + i * 0.32 },
                        opacity: { duration: 0.1, delay: 0.2 + i * 0.32 },
                      }}
                      style={{ transition: 'stroke 0.25s ease' }}
                    />
                  ))}
                </motion.svg>
              </div>
              <span
                ref={counterRef}
                className={`font-mono text-[11px] tracking-[0.3em] tabular-nums pl-[0.3em] transition-colors ${locked ? 'text-accent' : 'text-muted'}`}
              >
                000%
              </span>
            </div>
          </div>

          {/* Name + status */}
          <div className="mt-8 md:mt-10 text-center">
            <div className="relative font-mono text-xl md:text-2xl font-medium tracking-[0.35em] text-fog pl-[0.35em]">
              {locked && (
                <>
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 pl-[0.35em] text-accent"
                    initial={{ x: 0, opacity: 0.9 }}
                    animate={{ x: [-4, 3, -2, 0], opacity: [0.9, 0.9, 0.6, 0] }}
                    transition={{ duration: 0.45 }}
                  >
                    NAFIZ KHAN
                  </motion.span>
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 pl-[0.35em] text-accent-2"
                    initial={{ x: 0, opacity: 0.9 }}
                    animate={{ x: [4, -3, 2, 0], opacity: [0.9, 0.9, 0.6, 0] }}
                    transition={{ duration: 0.45 }}
                  >
                    NAFIZ KHAN
                  </motion.span>
                </>
              )}
              <span className={`relative ${started ? '' : 'invisible'}`}>
                <ScrambleText text="NAFIZ KHAN" duration={1300} start={started} />
              </span>
            </div>
            <div className="mt-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.25em] text-muted h-4">
              <span className={locked ? 'text-accent' : ''}>&gt; {status}</span>
              {!locked && <span className="caret">_</span>}
            </div>
          </div>
        </div>

        {/* Footer readout */}
        <div className="relative grid grid-cols-[1fr_auto_1fr] sm:grid-cols-3 items-center gap-4 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-dim">
          <span>software.engineer</span>
          <div className="relative w-24 sm:w-full h-px bg-fog/10 overflow-hidden">
            <motion.div className="absolute inset-0 bg-accent origin-center" style={{ scaleX: barScale }} />
          </div>
          <span className="text-right">dhaka, bd</span>
        </div>
      </motion.div>
    </div>
  );
}
