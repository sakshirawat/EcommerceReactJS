import React, { useState, useRef, useEffect } from 'react';
import logo from '../../images/logo.jpeg'; // Your logo image path
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userSlice';

const Header1 = () => {
  // State to toggle mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);
  // State to track which dropdown (currency/language) is open; null means none open
  const [openDropdown, setOpenDropdown] = useState(null);

  // Navigation hook from react-router-dom for programmatic navigation
  const navigate = useNavigate();
  // Redux dispatch to trigger actions
  const dispatch = useDispatch();
  // Get current user from Redux store
  const user = useSelector(state => state.user.currentUser);

  // Refs for currency and language dropdown containers to detect outside clicks
  const currencyRef = useRef(null);
  const languageRef = useRef(null);

  // Effect to close dropdown menus when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        currencyRef.current && !currencyRef.current.contains(event.target) &&
        languageRef.current && !languageRef.current.contains(event.target)
      ) {
        // Close any open dropdown if click is outside dropdown elements
        setOpenDropdown(null);
      }
    };
    // Attach listener to detect clicks anywhere on document
    document.addEventListener('mousedown', handleClickOutside);
    // Clean up event listener on unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout handler - dispatch logout action and navigate to home page
  const handleLogout = () => {
    dispatch(userActions.logOut());
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-300 shadow-md py-8 w-full">
      <div className="w-full mx-4 px-4 flex items-center justify-between">
        
        {/* Logo & Brand Name section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="logo" className="h-10 w-13" />
          <div className="flex flex-col whitespace-nowrap">
            <h2 className="text-4xl font-bold text-blue-700">Sroto</h2>
            <h6 className="text-m text-gray-600 font-bold mt-1">"Where Fashion Meets You."</h6>
          </div>
        </div>

        {/* Mobile menu toggle button, visible only on small screens */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}  // Toggle menu open/close on click
          className="md:hidden text-blue-700 text-3xl p-2 rounded-md hover:bg-blue-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Menu Section */}
        {/* 
            This container is hidden on small screens unless menuOpen is true.
            On medium and larger screens, it's always visible and flexbox aligned right.
        */}
        <div className={`w-full ${menuOpen ? 'block' : 'hidden'} md:flex md:items-center md:justify-end md:mr-12`}>
          <div className="flex flex-col md:flex-row md:items-center md:gap-6 px-4 md:px-0 py-4 md:py-0">

            {/* Currency Dropdown */}
            <div className="relative" ref={currencyRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'currency' ? null : 'currency')}
                className="text-gray-700 px-2 py-1 text-base"
              >
                Currency ▾
              </button>
              {openDropdown === 'currency' && (
                <ul className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg w-32 z-20">
                  <li className="px-3 py-1 hover:bg-gray-100 cursor-pointer">USD</li>
                  <li className="px-3 py-1 hover:bg-gray-100 cursor-pointer">EUR</li>
                  <li className="px-3 py-1 hover:bg-gray-100 cursor-pointer">INR</li>
                </ul>
              )}
            </div>

            {/* Language Dropdown */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'language' ? null : 'language')}
                className="text-gray-700 px-2 py-1 text-base"
              >
                Language ▾
              </button>
              {openDropdown === 'language' && (
                <ul className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg w-32 z-20">
                  <li className="px-3 py-1 hover:bg-gray-100 cursor-pointer">English</li>
                  <li className="px-3 py-1 hover:bg-gray-100 cursor-pointer">German</li>
                  <li className="px-3 py-1 hover:bg-gray-100 cursor-pointer">Spanish</li>
                </ul>
              )}
            </div>

            {/* Authentication Buttons */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4 md:mt-0">
              {user ? (
                // If logged in, show welcome message and logout button
                <span className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full shadow text-gray-900 font-medium">
                  Welcome! {user.name}
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1 text-sm font-semibold"
                  >
                    LogOut
                  </button>
                </span>
              ) : (
                // If not logged in, show Sign In and Sign Up buttons
                <>
                  <Link
                    to="/signin"
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded-full text-sm font-medium no-underline"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded-full text-sm font-medium no-underline"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header1;
