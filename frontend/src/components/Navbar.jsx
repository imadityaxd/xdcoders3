import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-indigo-400 font-semibold'
      : 'text-white hover:text-indigo-400';

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <NavLink to="/" className="text-2xl font-bold text-white">
            XDCoders
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/docs" className={linkClass}>Docs</NavLink>
            <NavLink to="/blog" className={linkClass}>Blog</NavLink>
            <NavLink to="/hackathon" className={linkClass}>Hackathons</NavLink>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col mt-2 space-y-2 pb-4">
            <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/docs" className={linkClass} onClick={() => setMenuOpen(false)}>Docs</NavLink>
            <NavLink to="/blog" className={linkClass} onClick={() => setMenuOpen(false)}>Blog</NavLink>
            <NavLink to="/hackathon" className={linkClass} onClick={() => setMenuOpen(false)}>Hackathons</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
