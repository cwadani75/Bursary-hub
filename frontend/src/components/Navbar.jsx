import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
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
        >
          {isDarkMode ? (
            <SunIcon className="h-5 w-5 text-yellow-400" />
          ) : (
            <MoonIcon className="h-5 w-5 text-gray-800 dark:text-white" />
          )}
        </button>

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
  );
};

export default Navbar;
