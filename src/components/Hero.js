import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-scroll';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const roles = useMemo(() => [
    'Software Engineer',
    'Full-Stack Developer',
    'Problem Solver',
    'AI & Automation Specialist',
    'LLM Researcher',
  ], []);

  useEffect(() => {
    const handleType = () => {
      const currentRole = roles[loopNum % roles.length];
      const updatedText = isDeleting
        ? currentRole.substring(0, text.length - 1)
        : currentRole.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
        setTypingSpeed(50);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'CV_Nafiz_Khan_BSc_CSE.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="min-h-[82vh] relative flex flex-col md:flex-row items-center gap-8 md:gap-10 pt-24 md:pt-28 pb-12 md:pb-14 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary-fixed dark:bg-primary-fixed/20 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-tertiary-fixed dark:bg-tertiary-fixed/20 rounded-full mix-blend-multiply filter blur-[60px] md:blur-[100px] opacity-40 pointer-events-none"></div>
      
      {/* Hero content */}
      <div className="flex-1 space-y-5 relative z-10 order-2 md:order-1">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface dark:text-white leading-tight tracking-tight">
          Hi, I'm <span className="text-primary dark:text-inverse-primary">Nafiz Khan</span> <br/>
          Building Digital <br/><span className="text-primary dark:text-inverse-primary">Experiences</span> <br/>with Precision.
        </h1>
        
        <div className="font-headline-md text-headline-md text-secondary dark:text-surface-container-highest min-h-[40px]">
          Aspiring <span className="text-primary dark:text-inverse-primary font-bold">{text}</span>
          <span className="text-primary dark:text-inverse-primary animate-pulse">|</span>
        </div>

        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-surface-container-highest max-w-xl leading-relaxed">
          Passionate Computer Science student at BRAC University specializing in full-stack development, 
          machine learning, and competitive programming. Building innovative solutions that bridge 
          technology and real-world impact.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            to="projects"
            smooth={true}
            offset={-80}
            duration={500}
            className="bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-primary/20 text-center active:scale-95"
          >
            View Projects
          </Link>
          <button
            onClick={handleDownloadCV}
            className="bg-surface-container-lowest dark:bg-[#191c1e] text-on-surface dark:text-white border border-outline-variant px-8 py-4 rounded-lg font-label-md text-label-md hover:border-primary dark:hover:border-inverse-primary hover:text-primary dark:hover:text-inverse-primary transition-all duration-300 active:scale-95"
          >
            Read Resume
          </button>
        </div>
      </div>

      {/* Profile Image container */}
      <div className="flex-1 flex justify-center md:justify-end relative z-10 w-full order-1 md:order-2">
        <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden soft-shadow group border border-outline-variant/30">
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
          <img 
            alt="Nafiz Khan" 
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
            src="/images/profile-photo.jpg"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600";
            }}
          />
        </div>
      </div>
    </section>
  );
}
