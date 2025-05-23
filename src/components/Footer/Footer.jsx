import React from 'react';
import logo from '../../images/logo.jpeg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Main footer container with background, padding, and spacing
    <footer className="bg-gray-900 text-gray-200 py-8 mt-8 w-full">
      {/* Wrapper to center content and make it responsive */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row flex-wrap justify-between items-center sm:items-start gap-8">
        
        {/* Logo and brand name section */}
        <div className="flex flex-col items-center sm:items-start flex-1 min-w-[150px] text-center sm:text-left">
        <Link to="/">
             <img src={logo} alt="Logo" className="w-20 mb-2 cursor-pointer" />
        </Link>

          <p className="font-bold text-xl">SOROTO</p> {/* Company name */}
        </div>

        {/* Contact information section */}
        <div className="flex flex-col flex-1 min-w-[150px] text-center sm:text-left">
          <h4 className="text-lg font-semibold mb-2">Call Us</h4> {/* Section heading */}
          <p>+1 234 567 890</p> {/* Phone number */}
          <p>info@sorto.com</p> {/* Email address */}
          <p>Visit Us</p> {/* Placeholder or address text */}
        </div>

        {/* Navigation links: Useful Links and My Account */}
        <div className="flex flex-wrap gap-12 justify-center sm:justify-start flex-1 min-w-[300px]">
          {/* Useful Links section */}
          <div className="flex flex-col min-w-[140px]">
            <h4 className="text-lg font-semibold mb-2 text-center sm:text-left">Useful Links</h4>
            <ul className="space-y-1 text-center sm:text-left">
              <li><Link to="/terms" className="hover:underline transition duration-200">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:underline transition duration-200">Privacy Policy</Link></li>
              <li><Link to="/faq" className="hover:underline transition duration-200">FAQ</Link></li>
              <li><Link to="/contact" className="hover:underline transition duration-200">Contact Us</Link></li>
            </ul>
          </div>

          {/* My Account section */}
          <div className="flex flex-col min-w-[140px]">
            <h4 className="text-lg font-semibold mb-2 text-center sm:text-left">My Account</h4>
            <ul className="space-y-1 text-center sm:text-left">
              <li><Link to="/profile" className="hover:underline transition duration-200">Profile</Link></li>
              <li><Link to="/orders" className="hover:underline transition duration-200">My Orders</Link></li>
              <li><Link to="/settings" className="hover:underline transition duration-200">Settings</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer bottom copyright notice */}
      <div className="mt-6 text-center text-gray-400 text-sm px-4">
        &copy; 2025 Soroto. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
