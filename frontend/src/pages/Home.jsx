import React from 'react';
import Blogc from '../components/Blogc';
import BlogSection from '../components/BlogSection';
import Pdfc from '../components/Pdfc';
import DocsSection from '../components/DocsSection';

// =================================================================
// HERO COMPONENT FOR XCODERS
// This component is designed for a Vite + React project with Tailwind CSS.
// It features a self-contained hero section with a static background image, 
// an overlay for text readability, animated text, and call-to-action buttons.
// =================================================================
const Hero = () => {
  // The URL for the background image.
  // **FIX:** The image is now loaded from the 'public' folder in your Vite project.
  // This is more reliable than an external URL, which can be blocked by browsers.
  // Make sure you have saved the image as 'anime-coding-bg.jpg' in your 'public' directory.
  const backgroundImageUrl = '/coding-bg.jpg';

  return (
    <>
      {/* =================================================================
      INLINE STYLES & ANIMATIONS
      This style block is included directly for simplicity. In a larger app,
      you might move these keyframes to your main index.css file.
      ================================================================== */}
      <style>{`
        /* A subtle shadow effect for the main heading to make it pop. */
        .text-shadow-lg {
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        /* Animation: Fade in from top */
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Animation: Fade in from bottom */
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Utility class to apply the fade-in-down animation. */
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }

        /* Utility class to apply the fade-in-up animation. */
        /* It starts as invisible (opacity: 0) and the animation makes it visible. */
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      {/* =================================================================
      HERO SECTION START
      This is the main container for the entire hero section.
      It's positioned relatively to act as a container for the
      absolutely positioned background and overlay.
      ================================================================== */}
      <div className="relative text-white font-sans overflow-hidden bg-gray-900">
      
        {/* Background Image Container */}
        {/* This div is positioned absolutely to fill its parent. It holds the background image. */}
        {/* The 'scale-105' gives a slight zoom effect which can be used for parallax or hover effects. */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out transform scale-105"
          style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
        ></div>

        {/* Dark Overlay */}
        {/* This adds a semi-transparent black layer over the background image. */}
        {/* This improves the readability of the text on top. */}
        <div className="absolute inset-0 w-full h-full bg-black opacity-60"></div>

        {/* =================================================================
        CONTENT CONTAINER
        This container holds all the visible text and buttons.
        It's also positioned relatively to sit on top of the background and overlay.
        Flexbox is used to center the content both vertically and horizontally.
        ================================================================== */}
        <div className="relative container mx-auto px-6 lg:px-8 flex flex-col justify-center items-center min-h-screen text-center">
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 text-shadow-lg animate-fade-in-down">
            XDCoders
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Your hub for study materials, hackathons, and the future of tech.
          </p>

          {/* Call to Action Buttons */}
          {/* A container for the buttons, using flexbox for alignment. */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" 
            style={{ animationDelay: '1s' }}
          >
            {/* Primary Button */}
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-indigo-300"
            >
              Explore Study Notes
            </button>
            {/* Secondary (Ghost) Button */}
            <button
              className="bg-transparent hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out border-2 border-gray-500 hover:border-gray-400"
            >
              Find Hackathons
            </button>
          </div>
        </div>
        {/* End of Content Container */}

      </div>
      {/* HERO SECTION END */}
      {/*BLOG SECTION STARTS */}
      {/* <Blogc/> */}
      <BlogSection/>
      {/* <Pdfc/> */}
      <DocsSection/>
    </>
  );
};

export default Hero;
