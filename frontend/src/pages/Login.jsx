import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from 'lucide-react';
import apiService from '../services/api';

const Login = ({ setIsAuthenticated, setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination or default to home
  const from = location.state?.from?.pathname || '/';

  // Clear any existing authentication state on component mount
  useEffect(() => {
    // Reset auth state when coming to login page
    setIsAuthenticated(false);
    setUser(null);
    
    // Clear any stored tokens
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }, [setIsAuthenticated, setUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting login with:', { email: formData.email });
      
      const response = await apiService.login(formData);
      console.log('Login successful:', response);
      
      if (response && response.user) {
        // Update authentication state
        setIsAuthenticated(true);
        setUser(response.user);
        
        // Store authentication data securely
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        // Redirect based on user role or previous location
        if (response.user.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different error types
      if (error.response) {
        // Server responded with error status
        switch (error.response.status) {
          case 401:
            setError('Invalid email or password. Please try again.');
            break;
          case 400:
            setError('Invalid request. Please check your input.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError(error.response.data?.message || 'Login failed. Please try again.');
        }
      } else if (error.request) {
        // Network error
        setError('Network error. Please check your connection and try again.');
      } else {
        // Other errors
        setError(error.message || 'Login failed. Please try again.');
      }
      
      // Clear form on error for security
      setFormData({
        email: formData.email, // Keep email for convenience
        password: '',
      });
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials for testing (remove in production)
  const fillDemoCredentials = (role = 'user') => {
    if (role === 'admin') {
      setFormData({
        email: 'admin@demo.com',
        password: 'demo123',
      });
    } else {
      setFormData({
        email: 'user@demo.com',
        password: 'demo123',
      });
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img 
            src="/img/image.png" 
            alt="BursaryHub Logo" 
            className="h-12 w-12"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link 
            to="/signup" 
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-6 sm:py-8 px-4 sm:px-6 shadow sm:rounded-lg">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 py-2 sm:px-4 sm:py-3 rounded-md text-sm sm:text-base">
                <div className="flex justify-between items-center">
                  <span>{error}</span>
                  <button 
                    type="button" 
                    onClick={() => setError('')}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 text-sm sm:text-base"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 text-sm sm:text-base"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  to="/forgot-password" 
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Demo credentials for testing - Remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Demo Credentials:</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('user')}
                  className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded"
                >
                  User Demo
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('admin')}
                  className="text-xs px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded"
                >
                  Admin Demo
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Admin Access
                </span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <Link
                to="/admin/login"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;