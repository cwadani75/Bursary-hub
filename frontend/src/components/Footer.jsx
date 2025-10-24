import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-indigo-300 mb-4">BursaryHub</h3>
            <p className="text-gray-200 mb-6 max-w-md leading-relaxed">
              Empowering students across Kenya with accessible bursary opportunities.
              Our platform connects students with financial aid to support their educational journey.
            </p>
            {/* Socials */}
            <div className="flex space-x-5">
              <a href="#" className="bg-indigo-700 hover:bg-indigo-600 p-2 rounded-full transition">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M22 12c0-5.523-4.477-10-10-10S2 
                    6.477 2 12c0 4.991 3.657 9.128 
                    8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 
                    1.492-3.89 3.777-3.89 1.094 0 
                    2.238.195 2.238.195v2.46h-1.26c-1.243 
                    0-1.63.771-1.63 1.562V12h2.773l-.443 
                    2.89h-2.33v6.988C18.343 21.128 
                    22 16.991 22 12z"
                  />
                </svg>
              </a>
              <a href="#" className="bg-indigo-700 hover:bg-indigo-600 p-2 rounded-full transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 
                  11.675-6.253 11.675-11.675 
                  0-.178 0-.355-.012-.53A8.348 
                  8.348 0 0022 5.92a8.19 8.19 0 
                  01-2.357.646 4.118 4.118 0 
                  001.804-2.27 8.224 8.224 0 
                  01-2.605.996 4.107 4.107 0 
                  00-6.993 3.743 11.65 11.65 0 
                  01-8.457-4.287 4.106 4.106 0 
                  001.27 5.477A4.072 4.072 0 
                  012.8 9.713v.052a4.105 4.105 
                  0 003.292 4.022 4.095 4.095 
                  0 01-1.853.07 4.108 4.108 0 
                  003.834 2.85A8.233 8.233 0 
                  012 18.407a11.616 11.616 0 
                  006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="bg-indigo-700 hover:bg-indigo-600 p-2 rounded-full transition">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12.315 2c2.43 0 
                    2.784.013 3.808.06 1.064.049 
                    1.791.218 2.427.465a4.902 4.902 
                    0 011.772 1.153 4.902 4.902 
                    0 011.153 1.772c.247.636.416 
                    1.363.465 2.427.048 1.067.06 
                    1.407.06 4.123v.08c0 2.643-.012 
                    2.987-.06 4.043-.049 1.064-.218 
                    1.791-.465 2.427a4.902 4.902 
                    0 01-1.153 1.772 4.902 4.902 
                    0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 
                    0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 
                    4.902 0 01-1.772-1.153 4.902 
                    4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 
                    0 011.153-1.772A4.902 4.902 0 
                    015.45 2.525c.636-.247 
                    1.363-.416 2.427-.465C8.901 
                    2.013 9.256 2 11.685 2h.63zM12 
                    6.865a5.135 5.135 0 110 
                    10.27 5.135 5.135 0 
                    010-10.27z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-indigo-500 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center text-gray-200 hover:text-white transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2 text-indigo-300" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center text-gray-200 hover:text-white transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2 text-indigo-300" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/apply" className="flex items-center text-gray-200 hover:text-white transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2 text-indigo-300" /> Apply for Bursary
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center text-gray-200 hover:text-white transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2 text-indigo-300" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-indigo-500 pb-2">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-indigo-300 mt-0.5" />
                <span className="text-gray-200">Kenya, Garissa County, Dadaab</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-indigo-300" />
                <span className="text-gray-200">support@bursaryhub.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-indigo-300" />
                <span className="text-gray-200">+254 757 42 4125</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-indigo-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} BursaryHub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
