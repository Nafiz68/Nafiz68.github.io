import React, { useState } from 'react';

export default function Certificates() {
  const [lightboxImg, setLightboxImg] = useState(null);

  const certificates = [
    {
      title: "AI Foundation",
      issuer: "AI Certs",
      date: "2025",
      image: "/images/certificates/AF.jpg",
      description: "Covered core AI concepts, machine learning algorithms, ethical implications, and business alignment."
    },
    {
      title: "Intro to Machine Learning",
      issuer: "Kaggle",
      date: "2025",
      image: "/images/certificates/Intro to Machine Learning.png",
      description: "Learned practical implementation of data frames, feature selection, and supervised learning algorithms."
    },
    {
      title: "Intermediate ChatGPT",
      issuer: "DataCamp",
      date: "2025",
      image: "/images/certificates/ChatGPT.jpg",
      description: "Focused on advanced prompt engineering methodologies, GPT architectures, and workflow configurations."
    },
    {
      title: "Learn Blockchain & Crypto",
      issuer: "Udemy",
      date: "2025",
      image: "/images/certificates/Blockchain.jpg",
      description: "Gained foundational knowledge in distributed ledgers, blockchain validation, and smart contracts."
    },
    {
      title: "Intro to Microsoft 365 Copilot",
      issuer: "Microsoft Learn",
      date: "2025",
      image: "/images/certificates/MS365.jpg",
      description: "Learned automated integration of AI agents within Microsoft productivity environments."
    },
    {
      title: "Intermediate SQL",
      issuer: "DataCamp",
      date: "2024",
      image: "/images/certificates/SQL.jpg",
      description: "Mastered subqueries, aggregate grouping, data correlation, and complex relational schema joins."
    }
  ];

  return (
    <section id="certificates" className="py-12 md:py-16 border-t border-surface-variant/30 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative">
      
      {/* Header */}
      <div className="text-center mb-10 md:mb-12">
        <div className="inline-block bg-primary-fixed text-on-primary-fixed dark:bg-primary-fixed-dim/20 dark:text-inverse-primary font-label-sm text-label-sm px-3 py-1 rounded w-max tracking-wider mb-4">
          CREDENTIALS
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-2">Certifications</h2>
        <p className="font-body-md text-body-md text-secondary dark:text-surface-container-highest">
          Technical validations and professional training courses completed
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {certificates.map((cert, idx) => (
          <div 
            key={idx} 
            className="flex flex-col bg-white dark:bg-[#191c1e] rounded-xl overflow-hidden border border-outline-variant/30 transition-all duration-300 hover:scale-[1.02] soft-shadow group"
          >
            {/* Certificate Image Frame */}
            <div 
              onClick={() => setLightboxImg(cert)}
              className="aspect-video w-full overflow-hidden bg-surface-container dark:bg-inverse-surface relative cursor-pointer border-b border-outline-variant/10"
            >
              <img 
                alt={`${cert.title} Certificate`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src={cert.image}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback svg placeholder */}
              <div className="hidden absolute inset-0 flex-col items-center justify-center bg-surface-container dark:bg-inverse-surface text-secondary dark:text-surface-container-highest gap-2">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="font-label-sm text-label-sm">View Certificate</span>
              </div>
              
              {/* Hover Zoom Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-label-md text-label-md flex items-center gap-1.5 bg-black/55 px-4 py-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                  </svg>
                  Preview
                </span>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <p className="font-label-sm text-label-sm text-primary dark:text-inverse-primary uppercase tracking-widest mb-1.5">
                  {cert.issuer}
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold mb-3 leading-snug">
                  {cert.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-container-highest text-sm mb-6 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30 mt-auto">
                <span className="font-label-sm text-label-sm text-secondary dark:text-surface-container-highest">
                  Issued: {cert.date}
                </span>
                <button 
                  onClick={() => setLightboxImg(cert)}
                  className="text-primary dark:text-inverse-primary hover:underline font-label-md text-label-md cursor-pointer focus:outline-none"
                >
                  View Credential
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6 transition-all duration-300 animate-fadeIn"
          onClick={() => setLightboxImg(null)}
        >
          {/* Close Floating Button */}
          <button 
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors bg-white/10 p-3 rounded-full focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Image */}
          <div className="max-w-4xl max-h-[75vh] rounded-lg overflow-hidden soft-shadow" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxImg.image} 
              alt={lightboxImg.title} 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback */}
            <div className="hidden w-[600px] h-[400px] flex-col items-center justify-center bg-[#191c1e] text-white p-12 text-center gap-4">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <h4 className="font-headline-md text-headline-md font-bold">{lightboxImg.title}</h4>
              <p className="text-surface-container-highest">Issued by {lightboxImg.issuer} in {lightboxImg.date}</p>
            </div>
          </div>
          
          {/* Image Caption details */}
          <div className="mt-6 text-center max-w-xl" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-headline-md text-headline-md text-white font-bold mb-2">{lightboxImg.title}</h4>
            <p className="font-label-sm text-label-sm text-primary dark:text-inverse-primary uppercase tracking-widest mb-2">Issued by {lightboxImg.issuer}</p>
            <p className="font-body-md text-body-md text-surface-container-highest text-sm leading-relaxed">{lightboxImg.description}</p>
          </div>
        </div>
      )}

    </section>
  );
}