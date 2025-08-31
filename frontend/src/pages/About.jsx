import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Shield, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About BursaryHub</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Empowering students across Kenya with accessible bursary opportunities
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Mission Statement */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-700 dark:text-indigo-400">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              BursaryHub is a digital platform designed to streamline the bursary application and management process across counties in Kenya. 
              We aim to provide fair, fast, and transparent access to financial aid for all deserving students.
            </p>
          </div>

          {/* Vision and Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To ensure equal access to education by making bursary applications simple, accessible, and transparent to every student in need.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Our Goal</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Empower every student with the financial support they need to pursue their academic goals and build a better future.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Ready to Start Your Journey?
            </h3>
            <Link to="/apply">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Apply for Bursary
              </button>
            </Link>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Student-Focused</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Designed with students in mind, making the application process simple and accessible.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Fair Selection</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Transparent criteria and fair selection process for all applicants.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Secure Platform</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your data is protected with industry-standard security measures.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Community Support</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Supporting students from all backgrounds across Kenya.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
              Our Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">12,500+</div>
                <div className="text-gray-600 dark:text-gray-400">Students Helped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">47</div>
                <div className="text-gray-600 dark:text-gray-400">Counties Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">KSh 2.5B+</div>
                <div className="text-gray-600 dark:text-gray-400">Funds Disbursed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">94%</div>
                <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Need Help or Have Questions?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-300">
                  Contact Us
                </button>
              </Link>
              <Link to="/report">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-300">
                  Report an Issue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
