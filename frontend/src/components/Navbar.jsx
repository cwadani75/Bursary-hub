import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout, isAuthenticated, setIsAuthenticated, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
=======
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65

  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
<<<<<<< HEAD
    
    if (newMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    window.dispatchEvent(new Event('themeChange'));
=======
    if (newMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
<<<<<<< HEAD
    
    let initialTheme;
    if (storedTheme) {
      initialTheme = storedTheme;
    } else {
      initialTheme = prefersDark ? 'dark' : 'light';
    }
    
    const html = document.documentElement;
    if (initialTheme === 'dark') {
      html.classList.add('dark');
      setIsDarkMode(true);
    } else {
      html.classList.remove('dark');
      setIsDarkMode(false);
    }
    
    if (!storedTheme) {
      localStorage.setItem('theme', initialTheme);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isUserDropdownOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
        if (isUserDropdownOpen) {
          setIsUserDropdownOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isUserDropdownOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    ...(isAuthenticated ? [
      { name: 'Apply', href: '/apply' },
      { name: 'Report', href: '/report' },
      { name: 'Profile', href: '/profile' }
    ] : []),
    ...(isAuthenticated && user?.role === 'admin' ? [{ name: 'Admin Dashboard', href: '/admin' }] : [])
  ];

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 text-gray-700 dark:text-white shadow-md z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/img/image.png" alt="Bursary Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
            <span className="text-indigo-600 dark:text-white font-bold text-lg sm:text-xl">BursaryHub</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.href}
                  className="hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 dark:bg-indigo-300 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
      </ul>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* User Dropdown */}
                <div className="hidden md:relative user-dropdown">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    {user?.profile_picture ? (
                      <img 
                        src={`http://localhost:5001/uploads/${user.profile_picture}`} 
                        alt="Profile" 
                        className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    )}
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white text-sm leading-tight">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize leading-tight">{user?.role}</p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                {isDarkMode ? 'Dark' : 'Light'}
              </span>
        <button
          onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Toggle dark mode"
=======
    const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <nav className="h-[70px] w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between bg-white dark:bg-gray-900 text-gray-700 dark:text-white shadow-md z-20 transition-all">

      {/* Logo */}
      <a href="/" className="flex items-center gap-2">
        <img src="/img/image.png" alt="Bursary Logo" className="h-10 w-10 object-contain" />
        <span className="text-indigo-600 dark:text-white font-bold text-lg">BursaryHub</span>
      </a>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-10 text-sm font-medium">
        <li><a className="hover:text-indigo-500 dark:hover:text-indigo-300" href="/">Home</a></li>
        <li><a className="hover:text-indigo-500 dark:hover:text-indigo-300" href="/about">About</a></li>
        <li><a className="hover:text-indigo-500 dark:hover:text-indigo-300" href="/apply">Apply</a></li>
        <li><a className="hover:text-indigo-500 dark:hover:text-indigo-300" href="/report">Report</a></li>
        <li><a className="hover:text-indigo-500 dark:hover:text-indigo-300" href="/contact">Contact</a></li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
        >
          {isDarkMode ? (
            <SunIcon className="h-5 w-5 text-yellow-400" />
          ) : (
            <MoonIcon className="h-5 w-5 text-gray-800 dark:text-white" />
          )}
        </button>
<<<<<<< HEAD
            </div>

        <button
          onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
        </button>
          </div>
      </div>

      <div
          className={`mobile-menu fixed top-16 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
          <div className="p-6 space-y-6">
            {isAuthenticated ? (
              <>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex items-center gap-3">
                    {user?.profile_picture ? (
                      <img 
                        src={`http://localhost:5001/uploads/${user.profile_picture}`} 
                        alt="Profile" 
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-12 w-12 text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-base font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="space-y-3">
                    <Link 
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/settings"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                    >
                      <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-base font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
          </ul>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 px-4 text-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 px-4 text-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
          </div>
              </>
            )}
        </div>
      </div>
    </nav>

      <div className="h-16"></div>
    </>
=======

        {/* Menu Label + Hamburger */}
        <button
          onClick={toggleMobileMenu}
          className="flex items-center gap-2 text-gray-600 dark:text-white"
        >
          <span className="font-medium">Menu</span>
          <svg width="26" height="26" viewBox="0 0 30 30" fill="currentColor">
            <path d="M3 7h24M3 14h24M3 21h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-[70px] right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-5">
          <ul className="space-y-4 text-base">
            <li><a href="/" className="hover:text-indigo-500">Home</a></li>
            <li><a href="/about" className="hover:text-indigo-500">About</a></li>
            <li><a href="/apply" className="hover:text-indigo-500">Apply</a></li>
            <li><a href="/report" className="hover:text-indigo-500">Report</a></li>
            <li><a href="/contact" className="hover:text-indigo-500">Contact</a></li>
          </ul>

          {/* Extra Actions */}
          <div className="pt-4 border-t border-gray-300 dark:border-gray-700 space-y-3">
            <a href="/profile" className="block hover:text-indigo-500">Profile</a>
            <a href="/settings" className="block hover:text-indigo-500">Settings</a>
            <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Logout</button>
          </div>
        </div>
      </div>
    </nav>
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
  );
};

export default Navbar;
