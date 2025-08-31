<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './Forms/Contact';
import Apply from './Forms/Apply';
import Report from './Forms/Report';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import apiService from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = async () => {
      try {
        const token = apiService.getToken();
        const userData = apiService.getUser();
        
        if (token && userData) {
          // Validate the token with the server
          const isValid = await apiService.validateToken();
          if (isValid) {
            setIsAuthenticated(true);
            setUser(userData);
          } else {
            // Token is invalid, clear everything
            apiService.removeToken();
            apiService.removeUser();
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          // No token or user data, clear everything
          apiService.removeToken();
          apiService.removeUser();
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear any invalid data
        apiService.removeToken();
        apiService.removeUser();
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    apiService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Only show navbar and footer for non-admin pages */}
      {!isAuthenticated || user?.role !== 'admin' ? (
        <>
          <Navbar 
            user={user} 
            onLogout={handleLogout} 
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            setUser={setUser}
          />

          <main className="min-h-screen">
            <Routes>
              {/* Public routes - redirect to login if not authenticated */}
              <Route 
                path="/" 
                element={
                  isAuthenticated ? 
                    <Home /> : 
                    <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/about" 
                element={
                  isAuthenticated ? 
                    <About /> : 
                    <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/contact" 
                element={
                  isAuthenticated ? 
                    <Contact /> : 
                    <Navigate to="/login" replace />
                } 
              />
              
              {/* Authentication routes */}
              <Route 
                path="/login" 
                element={
                  isAuthenticated ? 
                    <Navigate to="/" replace /> : 
                    <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                } 
              />
              <Route 
                path="/signup" 
                element={
                  isAuthenticated ? 
                    <Navigate to="/" replace /> : 
                    <Signup />
                } 
              />
              <Route 
                path="/forgot-password" 
                element={
                  isAuthenticated ? 
                    <Navigate to="/" replace /> : 
                    <ForgotPassword />
                } 
              />
              <Route
                path="/admin/login"
                element={
                  isAuthenticated ?
                    <Navigate to="/admin" replace /> :
                    <AdminLogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                }
              />
              
              {/* Protected routes */}
              <Route
                path="/apply"
                element={
                  isAuthenticated ?
                    <Apply /> :
                    <Navigate to="/login" replace />
                }
              />
              <Route
                path="/report"
                element={
                  isAuthenticated ?
                    <Report /> :
                    <Navigate to="/login" replace />
                }
              />
              <Route
                path="/profile"
                element={
                  isAuthenticated ?
                    <Profile /> :
                    <Navigate to="/login" replace />
                }
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>

          <Footer />
        </>
      ) : (
        /* Admin pages - no navbar/footer, full screen dashboard */
        <Routes>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      )}
    </div>
=======
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
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
  );
}

export default App;
