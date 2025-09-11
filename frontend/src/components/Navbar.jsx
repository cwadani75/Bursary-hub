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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-900 shadow-lg border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo + Links */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <img
                src="/img/image.png"
                alt="Bursary Management System"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">BursaryHub</span>
            </Link>

            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/apply"
                    className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Apply
                  </Link>
                  <Link
                    to="/report"
                    className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Report
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-white hover:text-indigo-200 transition-colors"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">{user?.name || 'User'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors"
                >
                  <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-indigo-200 p-2 rounded-md transition-colors"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-900 border-t border-blue-800">
              <Link
                to="/"
                className="text-white hover:text-indigo-200 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-indigo-200 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-indigo-200 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/apply"
                    className="text-white hover:text-indigo-200 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Apply
                  </Link>
                  <Link
                    to="/report"
                    className="text-white hover:text-indigo-200 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Report
                  </Link>
                  <Link
                    to="/profile"
                    className="text-white hover:text-indigo-200 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-white hover:text-red-400 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;