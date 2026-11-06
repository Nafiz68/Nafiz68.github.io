import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/scroll';

const LINK = 150;
const REACH = 200;
const BUCKETS = 4;

// Reads theme colors (as "r g b" triplets) from the CSS variables.
const readPalette = () => {
  const css = getComputedStyle(document.documentElement);
  const rgb = (name) => css.getPropertyValue(name).trim().split(/\s+/).join(',');
  const light = document.documentElement.classList.contains('light');
  return { fog: rgb('--fog'), muted: rgb('--muted'), accent: rgb('--accent'), boost: light ? 1.5 : 1 };
};

// Site-wide backdrop: twinkling stars plus a drifting node graph that reaches for the pointer.
// Fixed to the viewport; scrolling shifts both layers at different speeds for depth.
export default function NeuralCanvas({ className = '', paused = false }) {
  const canvasRef = useRef(null);
  // Read inside the loop so toggling it doesn't restart the effect (and reshuffle nodes).
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduced = prefersReducedMotion();
    const pointer = { x: -9999, y: -9999 };
    let palette = readPalette();
    let nodes = [];
    let stars = [];
    let width = 0;
    let height = 0;
    let frame;
    let running = true;
    let t = 0;
    let lastScroll = window.scrollY;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const nodeCount = Math.round(Math.min(85, Math.max(28, area / 19000)));
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: Math.random() * 1.3 + 0.6,
        hot: Math.random() < 0.12,
        phase: Math.random() * Math.PI * 2,
      }));
      const starCount = Math.round(Math.min(160, area / 9000));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        s: Math.random() < 0.85 ? 1 : 1.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.6,
        depth: 0.04 + Math.random() * 0.1,
      }));
    };

    const wrap = (p, pad) => {
      if (p.x < -pad) p.x = width + pad;
      else if (p.x > width + pad) p.x = -pad;
      if (p.y < -pad) p.y = height + pad;
      else if (p.y > height + pad) p.y = -pad;
    };

    const draw = () => {
      // Hidden behind the intro: skip the work but keep the loop alive.
      if (pausedRef.current && !reduced) {
        lastScroll = window.scrollY;
        if (running) frame = requestAnimationFrame(draw);
        return;
      }
      t += 0.016;
      const { fog, muted, accent, boost } = palette;
      ctx.clearRect(0, 0, width, height);

      // Scroll parallax
      const scrollY = window.scrollY;
      const dy = scrollY - lastScroll;
      lastScroll = scrollY;

      // Stars, grouped by twinkle level so each group is one fill
      const starBuckets = Array.from({ length: BUCKETS }, () => []);
      for (const s of stars) {
        s.y -= dy * s.depth;
        wrap(s, 2);
        const level = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
        starBuckets[Math.min(BUCKETS - 1, Math.floor(level * BUCKETS))].push(s);
      }
      for (let k = 0; k < BUCKETS; k++) {
        if (!starBuckets[k].length) continue;
        const a = (0.25 + 0.35 * ((k + 0.5) / BUCKETS)) * boost * 0.55;
        ctx.fillStyle = `rgba(${fog},${a})`;
        ctx.beginPath();
        for (const s of starBuckets[k]) ctx.rect(s.x, s.y, s.s, s.s);
        ctx.fill();
      }

      // Nodes
      for (const n of nodes) {
        n.y -= dy * 0.22;
        if (!reduced) {
          const px = pointer.x - n.x;
          const py = pointer.y - n.y;
          const d2 = px * px + py * py;
          if (d2 < REACH * REACH && d2 > 1) {
            const d = Math.sqrt(d2);
            n.vx += (px / d) * 0.01;
            n.vy += (py / d) * 0.01;
          }
          n.vx *= 0.985;
          n.vy *= 0.985;
          if (Math.abs(n.vx) + Math.abs(n.vy) < 0.1) {
            n.vx += (Math.random() - 0.5) * 0.05;
            n.vy += (Math.random() - 0.5) * 0.05;
          }
          n.x += n.vx;
          n.y += n.vy;
        }
        wrap(n, 20);
      }

      // Links, batched into a few alpha buckets so we stroke ~8 paths instead of hundreds
      const plain = Array.from({ length: BUCKETS }, () => []);
      const hot = Array.from({ length: BUCKETS }, () => []);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < LINK * LINK) {
            const k = Math.min(BUCKETS - 1, Math.floor((Math.sqrt(d2) / LINK) * BUCKETS));
            (a.hot || b.hot ? hot : plain)[k].push(a.x, a.y, b.x, b.y);
          }
        }
      }
      ctx.lineWidth = 0.6;
      for (let k = 0; k < BUCKETS; k++) {
        const alpha = (1 - (k + 0.5) / BUCKETS) * 0.22 * boost;
        [[plain[k], muted, alpha], [hot[k], accent, alpha * 1.5]].forEach(([segs, color, a]) => {
          if (!segs.length) return;
          ctx.strokeStyle = `rgba(${color},${a})`;
          ctx.beginPath();
          for (let s = 0; s < segs.length; s += 4) {
            ctx.moveTo(segs[s], segs[s + 1]);
            ctx.lineTo(segs[s + 2], segs[s + 3]);
          }
          ctx.stroke();
        });
      }

      // Pointer tendrils
      if (pointer.x > -999) {
        ctx.lineWidth = 0.7;
        for (const n of nodes) {
          const d = Math.hypot(pointer.x - n.x, pointer.y - n.y);
          if (d < REACH) {
            ctx.strokeStyle = `rgba(${accent},${(1 - d / REACH) * 0.5 * boost})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      // Node dots
      ctx.fillStyle = `rgba(${fog},${0.5 * boost})`;
      ctx.beginPath();
      for (const n of nodes) {
        if (n.hot) continue;
        ctx.moveTo(n.x + n.r, n.y);
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      }
      ctx.fill();
      for (const n of nodes) {
        if (!n.hot) continue;
        const glow = 0.55 + Math.sin(t * 2 + n.phase) * 0.45;
        ctx.fillStyle = `rgba(${accent},${0.14 * glow})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${accent},${0.65 + 0.35 * glow})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastScroll = window.scrollY;
      frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      if (reduced) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    resize();
    if (reduced) {
      running = false;
      draw();
    } else {
      frame = requestAnimationFrame(draw);
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      document.addEventListener('visibilitychange', onVisibility);
    }
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      themeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
