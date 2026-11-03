import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from './Reveal';

const LINES = [
  'initializing runtime',
  'loading neural modules',
  'compiling projects',
  'linking experience',
  'establishing connection',
];

// Boot-sequence intro: terminal lines + counter, then the panel wipes upward.
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const total = 1500;
    const begin = performance.now();
    let frame;
    const tick = (now) => {
      const p = Math.min((now - begin) / total, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 2.4)) * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setExiting(true), 250);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const shown = Math.min(LINES.length, Math.floor(count / (100 / LINES.length)) + 1);

  return (
    <motion.div
      className="fixed inset-0 z-[150] bg-ink-950 flex flex-col justify-between p-6 md:p-12 overflow-hidden"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      animate={exiting ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => exiting && onDone()}
    >
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="relative flex justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
        <span>nafiz.khan / portfolio</span>
        <span>v4.0 / {new Date().getFullYear()}</span>
      </div>

      <div className="relative font-mono text-xs md:text-sm text-muted space-y-1.5">
        {LINES.slice(0, shown).map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex gap-3"
          >
            <span className="text-accent">&gt;</span>
            <span>{line}</span>
            <span className="text-dim">{'.'.repeat(Math.max(2, 26 - line.length))}</span>
            <span className={i < shown - 1 || count === 100 ? 'text-accent' : 'text-warn'}>
              {i < shown - 1 || count === 100 ? 'ok' : 'run'}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="relative flex items-end justify-between gap-6">
        <div className="text-[22vw] md:text-[14vw] leading-[0.8] font-semibold tracking-tightest text-fog tabular-nums">
          {String(count).padStart(3, '0')}
          <span className="text-accent">%</span>
        </div>
        <div className="hidden md:block w-1/3 h-px bg-fog/10 mb-6 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${count}%` }} />
        </div>
      </div>
    </motion.div>
  );
}
