import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `block px-3 py-2 transition duration-200 ${
      isActive ? 'bg-black rounded-md text-white' : 'hover:text-purple-900'
    }`;

  return (
    <header className="bg-white shadow-lg px-6 md:px-[120px] py-4">
      <div className="flex items-center justify-between">
        {/* ------------------ Logo ------------------ */}
        <div className="flex items-center">
          <img src={logo} alt="MINT Logo" className="h-20 sm:h-24 md:h-[110px]" />
          <div className="leading-tight ml-2">
            <h1 className="text-[16px] sm:text-[20px] md:text-[25px] font-bold text-gray-900">Molecular Imaging</h1>
            <h1 className="text-[16px] sm:text-[20px] md:text-[25px] font-bold text-gray-900">Nano Theranostics</h1>
            <h1 className="text-[16px] sm:text-[20px] md:text-[25px] font-bold text-gray-900">Lab</h1>
          </div>
        </div>

        {/* ------------------ Hamburger (mobile) ------------------ */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* ------------------ Navigation (Desktop) ------------------ */}
        <nav className="hidden lg:flex space-x-1 text-[15px] font-medium text-gray-500">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/research" className={navLinkClass}>Research</NavLink>
          <NavLink to="/members" className={navLinkClass}>Members</NavLink>
          <div className="relative group">
            <button className="hover:text-purple-900 px-3 py-2">Publications▾</button>
            <div className="absolute hidden group-hover:block bg-white shadow-md top-10 left-0 z-10 w-52">
              <NavLink to="/publications/journals" className={navLinkClass}>Journal Articles</NavLink>
              <NavLink to="/publications/books" className={navLinkClass}>Books & Chapters</NavLink>
            </div>
          </div>
          <NavLink to="/patents" className={navLinkClass}>Patents</NavLink>
          <NavLink to="/cover-arts" className={navLinkClass}>Cover Arts</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/gallery" className={navLinkClass}>Gallery</NavLink>
          <NavLink to="/position" className={navLinkClass}>Position</NavLink>
        </nav>
      </div>

      {/* ------------------ Mobile Navigation Menu ------------------ */}
      {menuOpen && (
        <div className="lg:hidden mt-4 space-y-2 text-[15px] font-medium text-gray-700">
          <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/research" className={navLinkClass} onClick={() => setMenuOpen(false)}>Research</NavLink>
          <NavLink to="/members" className={navLinkClass} onClick={() => setMenuOpen(false)}>Members</NavLink>
          <NavLink to="/publications/journals" className={navLinkClass} onClick={() => setMenuOpen(false)}>Journal Articles</NavLink>
          <NavLink to="/publications/books" className={navLinkClass} onClick={() => setMenuOpen(false)}>Books & Chapters</NavLink>
          <NavLink to="/patents" className={navLinkClass} onClick={() => setMenuOpen(false)}>Patents</NavLink>
          <NavLink to="/cover-arts" className={navLinkClass} onClick={() => setMenuOpen(false)}>Cover Arts</NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setMenuOpen(false)}>Contact</NavLink>
          <NavLink to="/gallery" className={navLinkClass} onClick={() => setMenuOpen(false)}>Gallery</NavLink>
          <NavLink to="/position" className={navLinkClass} onClick={() => setMenuOpen(false)}>Position</NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
