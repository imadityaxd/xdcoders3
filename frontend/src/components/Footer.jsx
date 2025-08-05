import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// The main Footer component.
const Footer = () => {
  return (
    
      <div className="bg-gray-900 font-sans">
          <footer className="bg-black border-t-2 border-gray-900 text-gray-400  shadow-lg w-full mx-auto p-8 md:p-12">
            
            {/* Top Row: Logo and Links */}
            <div className="flex flex-col md:flex-row justify-between w-full gap-8 text-center md:text-left">
              
              {/* Column 1: Company Name and Tagline */}
              <div className="md:w-1/3">
                <h2 className="text-2xl font-bold text-white">XDcoders</h2>
                <p className="mt-2 text-sm">
                  We build things for the web.
                </p>
              </div>

              {/* Column 2: Resources Links */}
              <div className="flex-shrink-0">
                <h3 className="font-bold text-white mb-4">Resources</h3>
                <ul className="space-y-3">
                  <li><Link to="/docs" className="hover:text-white transition-colors duration-200">Docs</Link></li>
                  <li><a target="_blank" href="https://xdcoder.hashnode.dev/" className="hover:text-white transition-colors duration-200">Blog</a></li>
                  <li><Link to="/hackathon" className="hover:text-white transition-colors duration-200">Hackathon</Link></li>
                </ul>
              </div>

              {/* Column 3: Company Links */}
              <div className="flex-shrink-0">
                <h3 className="font-bold text-white mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link to="/about" className="hover:text-white transition-colors duration-200">About</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
                </ul>
              </div>

            </div>

            {/* Bottom Row: Copyright */}
            <div className="mt-12 pt-8 border-t border-gray-700">
               <p className="text-xs text-center">
                  2025 xdcoders - All rights reserved.
                </p>
            </div>

          </footer>
      </div>
  );
};

export default Footer;
