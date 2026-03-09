import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo2.png';

// ------------------- CONFIGURATION -------------------
const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Research', path: '/research' },
  { name: 'Members', path: '/members' },
  { 
    name: 'Publications', 
    children: [
      { name: 'Journal Articles', path: '/publications/journals' },
      { name: 'Books & Chapters', path: '/publications/books' },
    ]
  },
  { name: 'Patents', path: '/patents' },
  { name: 'Cover Arts', path: '/cover-arts' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
  { name: 'Position', path: '/position' },
];

// Constants for layout spacing (Logo width approx + Padding left/right)
// You can tweak this buffer if you want the switch to happen slightly earlier
const LAYOUT_BUFFER = 300; 

// ------------------- STYLES -------------------
const getNavLinkClass = ({ isActive }) =>
  `block px-3 py-2 transition duration-200 whitespace-nowrap ${
    isActive ? 'bg-black rounded-md text-white' : 'hover:text-purple-900'
  }`;

const getDropdownLinkClass = ({ isActive }) =>
  `block w-full text-left px-4 py-2 transition duration-200 text-sm ${
    isActive ? 'bg-black text-white' : 'hover:text-purple-900'
  }`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // "isCompact" is true when we don't have enough space for the full menu
  const [isCompact, setIsCompact] = useState(false);
  
  // We use this Ref to measure how wide the navigation WANTS to be
  const navMeasurerRef = useRef(null);
  const [requiredNavWidth, setRequiredNavWidth] = useState(0);

  // 1. MEASURE: Calculate the real width of the navigation items once on mount
  useLayoutEffect(() => {
    if (navMeasurerRef.current) {
      // Get the exact width of the text/buttons + spacing
      const width = navMeasurerRef.current.offsetWidth;
      setRequiredNavWidth(width);
    }
  }, []); // Run once on mount

  // 2. CHECK: Every time the window resizes, check if we have room
  useEffect(() => {
    const handleResize = () => {
      // Available space = Window Width
      // Required space = Nav Width + Logo/Padding Buffer
      if (window.innerWidth < (requiredNavWidth + LAYOUT_BUFFER)) {
        setIsCompact(true);
      } else {
        setIsCompact(false);
        setMenuOpen(false); // Close mobile menu if we switch back to desktop
      }
    };

    // Run initially
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [requiredNavWidth]);

  return (
    <header className="bg-gradient-to-b from-gray-100 via-neutral-50 to-neutral-50 shadow-lg relative z-50">
      
      {/* 
        INVISIBLE SENTINEL 
        This is never seen by the user. It exists solely so we can measure 
        how wide the menu is (including fonts, padding, etc).
      */}
      <div 
        ref={navMeasurerRef} 
        className="fixed opacity-0 pointer-events-none -z-50 flex items-center space-x-1 text-[15px] font-medium"
        aria-hidden="true"
      >
        {NAV_ITEMS.map((item) => (
          <div key={item.name} className="px-3 py-2">{item.name}</div>
        ))}
      </div>

      {/* ACTUAL HEADER CONTENT */}
      {/* Dynamic padding: px-6 usually, but extra padding (px-12) if we have lots of space */}
      <div className={`flex items-center justify-between py-0 transition-all duration-300 ${isCompact ? 'px-6' : 'px-6 lg:px-[60px]'}`}>
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center group py-2  px-10 flex-shrink-0">
          <img 
            src={logo} 
            alt="Logo" 
            width="110" 
            
            height="110"
            className="h-16 sm:h-20 md:h-[90px] w-auto object-contain" 
          />
          <div className="leading-tight ml-3">
            <h1 className="text-[16px] sm:text-[18px] md:text-[22px] font-bold text-gray-900 transition-colors whitespace-nowrap">
              Bright-NanoGhost Group
            </h1>
          </div>
        </NavLink>

        {/* LOGIC: Show Hamburger if "isCompact" is true */}
        {isCompact ? (
          <button
            className="p-2 -mr-2 text-gray-800 hover:text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        ) : (
          /* LOGIC: Show Full Nav if "isCompact" is false */
          <nav className="flex items-center space-x-1 text-[15px] font-medium text-gray-500">
            {NAV_ITEMS.map((item) => (
              item.children ? (
                <div key={item.name} className="relative group h-full flex items-center">
                  <button className="flex items-center px-3 py-2 hover:text-purple-900 focus:outline-none whitespace-nowrap">
                    <span>{item.name}</span>
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute left-0 top-full pt-4 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-20">
                    <div className="bg-white rounded-md shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden py-1">
                      {item.children.map((subItem) => (
                        <NavLink key={subItem.path} to={subItem.path} className={getDropdownLinkClass}>
                          {subItem.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink key={item.path} to={item.path} className={getNavLinkClass}>
                  {item.name}
                </NavLink>
              )
            ))}
          </nav>
        )}
      </div>

      {/* Mobile Menu Dropdown (Only renders if we are in compact mode) */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCompact && menuOpen ? 'max-h-[80vh] opacity-100 mt-4 pb-4 overflow-y-auto' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col space-y-1 text-[15px] font-medium text-gray-700 px-6">
          {NAV_ITEMS.map((item) => (
            item.children ? (
              <div key={item.name} className="flex flex-col">
                <span className="px-3 py-1 text-xs uppercase text-gray-400 font-bold mt-2">{item.name}</span>
                {item.children.map(subItem => (
                   <NavLink 
                     key={subItem.path} 
                     to={subItem.path} 
                     className={({ isActive }) => `${getNavLinkClass({ isActive })} pl-6`}
                     onClick={() => setMenuOpen(false)}
                   >
                    {subItem.name}
                   </NavLink>
                ))}
              </div>
            ) : (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={getNavLinkClass} 
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            )
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;