import React from "react";
// import { Element } from "react-scroll";

// Import your components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import { ThemeProvider } from "./contexts/ThemeContext";

import "./styles/App.css"; // global styles

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
      </div>
    </ThemeProvider>
  );
}



export default App;
