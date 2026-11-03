import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import NeuralCanvas from './NeuralCanvas';

// Fixed page backdrop (glows, grid, starfield), scroll progress bar,
// and the pointer tracking that drives `.spotlight` cards.
export default function Background() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    let frame;
    let last;
    const update = () => {
      frame = null;
      const card = last.target.closest && last.target.closest('.spotlight');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${last.clientX - r.left}px`);
      card.style.setProperty('--my', `${last.clientY - r.top}px`);
    };
    const onMove = (e) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% -8%, rgb(var(--accent) / 0.09), transparent 70%),' +
              'radial-gradient(ellipse 45% 40% at 100% 60%, rgb(var(--accent-2) / 0.06), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 grid-bg"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, #000 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, #000 20%, transparent 80%)',
          }}
        />
        <NeuralCanvas className="absolute inset-0" />
      </div>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left bg-gradient-to-r from-accent via-accent to-accent-2"
        style={{ scaleX: progress }}
      />
    </>
  );
}
