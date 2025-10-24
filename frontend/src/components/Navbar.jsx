import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import apiService from '../services/api';

const Navbar = ({ user, onLogout, isAuthenticated, setIsAuthenticated, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    apiService.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              src="/img/image.png"
              alt="BursaryHub Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-2xl font-bold text-white tracking-wide hover:text-indigo-300 transition-colors">
              BursaryHub
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 ml-10">
            <Link
              to="/"
              className="text-gray-200 hover:text-white hover:underline underline-offset-4 px-3 py-2 text-sm font-medium transition-all"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-200 hover:text-white hover:underline underline-offset-4 px-3 py-2 text-sm font-medium transition-all"
            >
              About
            </Link>
            
            {isAuthenticated && (
              <>
                <Link
                  to="/apply"
                  className="text-gray-200 hover:text-white hover:underline underline-offset-4 px-3 py-2 text-sm font-medium transition-all"
                >
                  Apply
                </Link>
                <Link
                  to="/report"
                  className="text-gray-200 hover:text-white hover:underline underline-offset-4 px-3 py-2 text-sm font-medium transition-all"
                >
                  Report
                </Link>
                <Link
              to="/contact"
              className="text-gray-200 hover:text-white hover:underline underline-offset-4 px-3 py-2 text-sm font-medium transition-all"
            >
              Contact
            </Link>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-200 hover:text-red-400 transition-colors"
                >
                  <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-200 hover:text-white border border-indigo-500 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-200 hover:text-white p-2 rounded-md transition-colors"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-900 to-purple-900 border-t border-indigo-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/apply"
                  className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Apply
                </Link>
                <Link
                  to="/report"
                  className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Report
                </Link>
                <Link
                  to="/profile"
                  className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left block text-gray-200 hover:text-red-400 px-3 py-2 rounded-md text-base font-medium transition-all"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
