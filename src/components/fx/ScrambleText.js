import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { prefersReducedMotion } from '../../lib/scroll';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/\\[]{}';

// Decodes text from random glyphs. Re-runs whenever `text` changes or on hover.
export default function ScrambleText({ text, className = '', duration = 700, hover = false, start = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [output, setOutput] = useState(text);
  const frame = useRef();

  const run = useCallback(() => {
    if (prefersReducedMotion()) {
      setOutput(text);
      return;
    }
    cancelAnimationFrame(frame.current);
    const begin = performance.now();
    const tick = (now) => {
      const p = Math.min((now - begin) / duration, 1);
      const settled = Math.floor(p * text.length);
      let next = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < settled || ch === ' ') next += ch;
        else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOutput(next);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => {
    if (inView && start) run();
    return () => cancelAnimationFrame(frame.current);
  }, [inView, start, run]);

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={hover ? run : undefined}
      aria-label={text}
    >
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
