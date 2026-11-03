import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Dot + lagging ring. Ring grows over interactive elements; `data-cursor="Label"` shows a label.
// Position runs through motion values (no React renders); only hover state changes re-render.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({ hovering: false, label: '', visible: false, pressed: false });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    let lastTarget = null;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (e.target === lastTarget) return;
      lastTarget = e.target;
      const target = e.target.closest ? e.target.closest('a, button, [data-cursor], input, textarea, label') : null;
      const isText = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
      const hovering = Boolean(target) && !isText;
      const label = (target && target.dataset && target.dataset.cursor) || '';
      setState((s) =>
        s.hovering === hovering && s.label === label && s.visible ? s : { ...s, hovering, label, visible: true }
      );
    };
    const leave = () => setState((s) => ({ ...s, visible: false }));
    const down = () => setState((s) => ({ ...s, pressed: true }));
    const up = () => setState((s) => ({ ...s, pressed: false }));

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [x, y]);

  if (!enabled) return null;

  const { hovering, label, visible, pressed } = state;
  const size = label ? 84 : hovering ? 52 : 30;
  const ring = label
    ? 'bg-accent border-transparent'
    : hovering
      ? 'bg-accent/10 border-accent/70'
      : 'bg-transparent border-fog/30';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div className="absolute top-0 left-0 will-change-transform" style={{ x: rx, y: ry }}>
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center transition-[width,height,background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${ring}`}
          style={{ width: size, height: size, transform: `translate(-50%, -50%) scale(${pressed ? 0.85 : 1})` }}
        >
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.18em] text-on-accent font-medium transition-opacity duration-200 ${label ? 'opacity-100' : 'opacity-0'}`}
          >
            {label}
          </span>
        </div>
      </motion.div>
      <motion.div className="absolute top-0 left-0 will-change-transform" style={{ x, y }}>
        <div
          className="-translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-accent transition-opacity"
          style={{ opacity: label ? 0 : 1 }}
        />
      </motion.div>
    </div>
  );
}
