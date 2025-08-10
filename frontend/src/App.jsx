import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Apply from './Forms/Apply';
import Report from './Forms/Report';
import Contact from './Forms/Contact';
import ThemeToggle from './components/ThemeToggle'; // ✅ import

function App() {
  return (
    <>
      {/* Place theme toggle wherever you want */}
      <ThemeToggle />

      <Navbar />

      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/report" element={<Report />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Example block to test dark mode */}
        <div className="bg-white text-black dark:bg-gray-900 dark:text-white p-6">
          <h1>Hello Duniaaaa</h1>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
