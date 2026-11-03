import React, { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Background from "./components/fx/Background";
import Cursor from "./components/fx/Cursor";
import Preloader from "./components/fx/Preloader";
import { initSmoothScroll, lockScroll } from "./lib/scroll";
import { ThemeProvider } from "./contexts/ThemeContext";

// Show the boot intro once per browser session.
const shouldShowIntro = () => {
  try {
    return !sessionStorage.getItem("intro-seen");
  } catch {
    return true;
  }
};

function App() {
  const [booting, setBooting] = useState(shouldShowIntro);

  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    lockScroll(booting);
    if (!booting) {
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        // storage unavailable; intro will just replay next time
      }
    }
  }, [booting]);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {booting && <Preloader key="preloader" onDone={() => setBooting(false)} />}
        </AnimatePresence>
        <Background />
        <Cursor />
        <Navbar ready={!booting} />
        <main>
          <Hero ready={!booting} />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
