import Lenis from 'lenis';

let lenis = null;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
  });

  let frame;
  const raf = (time) => {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(frame);
    lenis.destroy();
    lenis = null;
  };
}

export function scrollToId(id) {
  const target = id === 'hero' ? 0 : document.getElementById(id);
  if (target === null) return;

  if (lenis) {
    lenis.scrollTo(target, { offset: id === 'hero' ? 0 : -72, duration: 1.4 });
    return;
  }
  const top = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = locked ? 'hidden' : '';
}

export function downloadFile(path, filename) {
  const link = document.createElement('a');
  link.href = path;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
