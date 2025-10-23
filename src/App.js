import React from "react";


// Import your components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";

import "./styles/App.css"; // global styles

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}



export default App;
