import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId, lockScroll } from "../lib/scroll";
import { EASE } from "./fx/Reveal";
import Magnetic from "./fx/Magnetic";
import ThemeToggle from "./fx/ThemeToggle";

const navLinks = [
  { to: "about", label: "About" },
  { to: "experience", label: "Experience" },
  { to: "projects", label: "Projects" },
  { to: "skills", label: "Skills" },
  { to: "certificates", label: "Certificates" },
];

export default function Navbar({ ready }) {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...navLinks.map((l) => l.to), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    lockScroll(navOpen);
  }, [navOpen]);

  const go = (id) => {
    setNavOpen(false);
    // let the menu close (and scroll unlock) before scrolling
    setTimeout(() => scrollToId(id), navOpen ? 350 : 0);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-[60] pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: hidden && !navOpen ? -100 : 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: ready && !scrolled ? 0.9 : 0 }}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink-950 via-ink-950/80 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav className="relative container-x flex items-center justify-between h-20 pointer-events-auto">
          <button onClick={() => go("hero")} className="group flex items-center gap-3" aria-label="Back to top">
            <span className="relative w-9 h-9 rounded-lg border hairline bg-ink-800/80 flex items-center justify-center font-mono text-xs text-accent overflow-hidden">
              <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-8">NK</span>
              <span className="absolute z-10 translate-y-8 transition-transform duration-500 group-hover:translate-y-0">{"</>"}</span>
            </span>
            <span className="hidden sm:flex flex-col items-start leading-none">
              <span className="text-sm font-medium text-fog">Nafiz Khan</span>
              <span className="font-mono text-[10px] text-dim mt-1 tracking-wider">software.engineer</span>
            </span>
          </button>

          <div
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500 ${
              scrolled ? "glass hairline shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]" : "border-transparent"
            }`}
          >
            {navLinks.map((link, i) => (
              <button
                key={link.to}
                onClick={() => go(link.to)}
                className={`relative px-4 py-2 rounded-full text-[13px] transition-colors duration-300 ${
                  active === link.to ? "text-on-accent" : "text-muted hover:text-fog"
                }`}
              >
                {active === link.to && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className={`font-mono text-[10px] ${active === link.to ? "text-on-accent/60" : "text-dim"}`}>0{i + 1}</span>
                  {link.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Magnetic className="hidden md:inline-block">
              <button
                onClick={() => go("contact")}
                className={`group relative overflow-hidden flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-colors duration-300 ${
                  active === "contact" ? "border-accent text-accent" : "hairline text-fog hover:border-accent/60"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                Let's talk
              </button>
            </Magnetic>

            <button
              onClick={() => setNavOpen((o) => !o)}
              className="md:hidden relative w-11 h-11 rounded-full border hairline glass flex flex-col items-center justify-center gap-[5px]"
              aria-label="Toggle menu"
              aria-expanded={navOpen}
            >
              <motion.span className="block h-px w-5 bg-fog" animate={navOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }} />
              <motion.span className="block h-px w-5 bg-fog" animate={navOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {navOpen && (
          <motion.div
            className="fixed inset-0 z-[55] bg-ink-950/95 backdrop-blur-xl md:hidden flex flex-col justify-center px-6"
            initial={{ clipPath: "circle(0% at 92% 40px)" }}
            animate={{ clipPath: "circle(150% at 92% 40px)" }}
            exit={{ clipPath: "circle(0% at 92% 40px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {[{ to: "hero", label: "Home" }, ...navLinks, { to: "contact", label: "Contact" }].map((link, i) => (
                <li key={link.to} className="overflow-hidden">
                  <motion.button
                    onClick={() => go(link.to)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                    className={`flex items-baseline gap-4 text-5xl font-semibold tracking-tightest ${
                      active === link.to ? "text-accent" : "text-fog"
                    }`}
                  >
                    <span className="font-mono text-xs text-dim">0{i}</span>
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
