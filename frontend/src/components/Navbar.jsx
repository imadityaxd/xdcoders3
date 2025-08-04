import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo or Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">XDCoders</Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/docs" className="text-gray-700 hover:text-blue-600 font-medium">Docs</Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium">Blog</Link>
            <Link to="/hackathon" className="text-gray-700 hover:text-blue-600 font-medium">Hackathons</Link>
          </div>

          {/* Mobile Menu Button (optional, basic) */}
          <div className="md:hidden">
            {/* You can enhance this with hamburger menu */}
            <button className="text-blue-600 focus:outline-none">☰</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
