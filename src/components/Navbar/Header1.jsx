import React, { useState, useEffect, useRef } from 'react';
import logo from '../../images/logo.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userSlice';

const Header1 = () => {
  // State to toggle mobile menu visibility
  const [menuOpen, setMenuOpen] = useState(false);
  
  // State to track which dropdown is open (currency, language, or none)
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser); // Get current user from Redux store

  // Refs to handle click outside for dropdowns
  const currencyRef = useRef(null);
  const languageRef = useRef(null);

  // Logout handler
  const handleLogout = () => {
    dispatch(userActions.logOut()); // Dispatch logout action
    navigate('/'); // Redirect to home
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        currencyRef.current && !currencyRef.current.contains(event.target) &&
        languageRef.current && !languageRef.current.contains(event.target)
      ) {
        setOpenDropdown(null); // Close all dropdowns
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-300 shadow-md py-4 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center px-4 md:px-6">
        
        {/* Logo section (left side) */}
        <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <div className="flex flex-col whitespace-nowrap">
              <h2 className="text-2xl font-bold text-blue-700">Sroto</h2>
              <h6 className="text-xs text-gray-600 mt-1">"Where Fashion Meets You."</h6>
            </div>
          </div>

          {/* Mobile menu toggle button */}
          <button
            className="md:hidden text-blue-700 text-2xl p-4 rounded-md hover:bg-blue-100 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Right section: Dropdowns and Auth links */}
        <div
          className={`w-full md:w-auto mt-4 md:mt-0 flex flex-col md:flex-row md:items-center md:justify-end md:gap-6 ml-auto
            ${menuOpen ? 'flex' : 'hidden'} md:flex`}
        >

          {/* Currency selector dropdown */}
          <div className="relative w-full md:w-auto" ref={currencyRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === 'currency' ? null : 'currency')
              }
              className="w-full md:w-auto text-gray-700 cursor-pointer bg-transparent border-none px-2 py-1 text-base text-left md:text-center"
            >
              Currency ▾
            </button>
            {openDropdown === 'currency' && (
              <ul className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg w-32 z-20">
                <li className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer">USD</li>
                <li className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer">EUR</li>
                <li className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer">INR</li>
              </ul>
            )}
          </div>

          {/* Language selector dropdown */}
          <div className="relative w-full md:w-auto" ref={languageRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === 'language' ? null : 'language')
              }
              className="w-full md:w-auto text-gray-700 cursor-pointer bg-transparent border-none px-2 py-1 text-base text-left md:text-center"
            >
              Language ▾
            </button>
            {openDropdown === 'language' && (
              <ul className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg w-32 z-20">
                <li className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer">English</li>
                <li className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer">German</li>
                <li className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer">Spanish</li>
              </ul>
            )}
          </div>

          {/* Sign In/Sign Up or Welcome + Logout */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4 md:mt-0 w-auto">
            {user ? (
              // If user is logged in, show welcome message and logout button
              <span className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full shadow text-gray-900 font-medium">
                Welcome! {user.name}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 transition text-white rounded-full px-3 py-1 text-sm font-semibold"
                >
                  LogOut
                </button>
              </span>
            ) : (
              // If user is not logged in, show Sign In and Sign Up links
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
    </nav>
  );
};

export default Header1;
