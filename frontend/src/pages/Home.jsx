import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Hero Section */}
      <section
        className="relative text-white min-h-[600px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img/students.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome to the Bursary Management System
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 max-w-3xl mx-auto">
            Empowering students with financial aid across all counties. Apply easily and track your bursary applications.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <Link to="/apply">
              <button className="w-full sm:w-auto bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors duration-200">
                Apply for Bursary
              </button>
            </Link>
            <Link to="/report">
              <button className="w-full sm:w-auto bg-indigo-800 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200">
                Report an Issue
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-400">12,500+</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">Students Helped</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-400">47</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">Counties Covered</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-400">KSh 2.5B+</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">Funds Disbursed</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-400">94%</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-700 dark:text-indigo-400">Why Choose Us</h2>
        <p className="text-base sm:text-lg mb-8 sm:mb-10 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Empowering Students Across Kenya — Our bursary program is designed to be accessible, transparent, and supportive of every student's educational journey.
        </p>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 text-left">
          <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-400">Simple Application</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Easy multi-step application process with clear guidance.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-400">Transparent Process</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Fair selection criteria and transparent fund disbursement.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-400">Community Support</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Supporting students from all backgrounds across Kenya.</p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-700 dark:text-indigo-400">Success Stories</h2>
          <p className="text-base sm:text-lg mb-8 sm:mb-12 text-gray-700 dark:text-gray-300">Real stories from students whose lives have been transformed through our bursary program.</p>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3 text-left">
            <div className="bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="italic mb-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                "The bursary program helped me complete my engineering degree. The application process was straightforward and fair."
              </p>
              <p className="font-semibold text-indigo-700 dark:text-indigo-400">Grace Wanjiku</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Nairobi County</p>
            </div>
            <div className="bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="italic mb-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                "Thanks to this program, I could focus on my studies without worrying about fees. Truly life-changing!"
              </p>
              <p className="font-semibold text-indigo-700 dark:text-indigo-400">John Kiprotich</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Uasin Gishu County</p>
            </div>
            <div className="bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="italic mb-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                "The transparent selection process gave me confidence in the system. Grateful for the opportunity."
              </p>
              <p className="font-semibold text-indigo-700 dark:text-indigo-400">Fatuma Hassan</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Mombasa County</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-700 dark:text-indigo-400">Ready to Start Your Journey?</h2>
        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Join thousands of students who have already benefited from our bursary program. Your education is our priority.
        </p>
        <Link to="/apply">
          <button className="bg-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:bg-indigo-800 transition-colors duration-200 font-semibold text-base sm:text-lg">
            Apply for Bursary
          </button>
        </Link>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 sm:mb-8 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <MapPin className="mx-auto mb-2 text-indigo-600 dark:text-indigo-400" size={32} />
              <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">Dadaab, Garissa County, Kenya</p>
            </div>
            <div>
              <Mail className="mx-auto mb-2 text-indigo-600 dark:text-indigo-400" size={32} />
              <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">support@bursaryhub.org</p>
            </div>
            <div>
              <Phone className="mx-auto mb-2 text-indigo-600 dark:text-indigo-400" size={32} />
              <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">+254 712 345 678</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
