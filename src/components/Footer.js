import React, { useEffect, useState } from 'react';
import { scrollToId } from '../lib/scroll';
import Magnetic from './fx/Magnetic';

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nafiz-khan-34b7a6309' },
  { name: 'GitHub', url: 'https://github.com/Nafiz68' },
  { name: 'Facebook', url: 'https://www.facebook.com/share/1B5896cUtx/' },
  { name: 'Instagram', url: 'https://www.instagram.com/swapped_nil?igsh=bWFhNHUxbGdsbjZr' },
  { name: 'Scholar', url: 'https://scholar.google.com/citations?user=PSQeWhkAAAAJ&hl=en' }
];

const navLinks = [
  { to: 'about', label: 'About' },
  { to: 'experience', label: 'Experience' },
  { to: 'projects', label: 'Projects' },
  { to: 'skills', label: 'Skills' },
  { to: 'certificates', label: 'Certificates' },
  { to: 'contact', label: 'Contact' },
];

function useDhakaTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit' });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const time = useDhakaTime();

  return (
    <footer className="relative border-t hairline overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 100%, rgb(var(--accent) / 0.1), transparent 70%)' }}
      />

      <div className="container-x relative pt-12 md:pt-16 pb-6">
        {/* CTA + columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim mb-4">{'// have an idea?'}</div>
            <a href="mailto:nafizk368@gmail.com" className="group inline-flex flex-col">
              <span className="text-[clamp(1.6rem,4.4vw,3.2rem)] font-semibold tracking-tight leading-none text-fog">
                Let's work <span className="font-serif italic font-normal text-accent">together.</span>
              </span>
              <span className="mt-4 flex items-center gap-3 font-mono text-sm text-muted group-hover:text-accent transition-colors">
                nafizk368@gmail.com
                <span className="w-7 h-7 rounded-full border hairline flex items-center justify-center transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-accent/60">→</span>
              </span>
              <span className="mt-2 h-px w-0 bg-accent group-hover:w-full transition-all duration-700" />
            </a>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim mb-4">Navigate</div>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <button onClick={() => scrollToId(link.to)} className="text-sm text-muted hover:text-fog transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim mb-4">Socials</div>
              <ul className="space-y-2.5">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-fog transition-colors"
                    >
                      {link.name}
                      <span className="text-[10px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim mb-4">Status</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-fog">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                  Available for work
                </div>
                <div className="text-muted">Dhaka, Bangladesh</div>
                <div className="font-mono text-xs text-muted tabular-nums">{time} GMT+6</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 pt-5 border-t hairline flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[11px] text-dim">
          <span>&copy; {currentYear} Nafiz Khan. Godspeed!</span>
          <span className="hidden md:inline">Designed & engineered in Dhaka</span>
          <Magnetic>
            <button onClick={() => scrollToId('hero')} className="group flex items-center gap-2 text-muted hover:text-accent transition-colors">
              Back to top
              <span className="w-8 h-8 rounded-full border hairline flex items-center justify-center group-hover:border-accent/60 transition-all duration-500 group-hover:-translate-y-0.5">↑</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
