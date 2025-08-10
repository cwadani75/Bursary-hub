import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">About BursaryHub</h1>
          <p className="text-lg text-gray-700">
            BursaryHub is a digital platform designed to streamline the bursary application and management process across counties in Kenya. 
            We aim to provide fair, fast, and transparent access to financial aid for all deserving students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">🎯 Our Mission</h2>
            <p className="text-gray-700">
              To ensure equal access to education by making bursary applications simple, accessible, and transparent to every student in need.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">🌍 Our Vision</h2>
            <p className="text-gray-700">
              Empower every student with the financial support they need to pursue their academic goals and build a better future.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-green-600 mb-4">📅 Application Status</h3>
          <p className="text-gray-600 mb-2">
            The bursary application process is currently <span className="text-green-700 font-semibold">open</span> for submissions.
          </p>
          <p className="text-gray-600 mb-2">
            Last review cycle was completed on <span className="font-semibold">31st July</span>.
          </p>
          <p className="text-gray-600 mb-4">
            Approved applicants will be notified via email and SMS before the end of the month.
          </p>
          <Link to="/apply">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition">
              Apply for Bursary
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-4 shadow rounded">
            <h4 className="text-3xl font-bold text-indigo-600">5,000+</h4>
            <p className="text-gray-600 mt-1">Students Helped</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h4 className="text-3xl font-bold text-indigo-600">15+</h4>
            <p className="text-gray-600 mt-1">Counties Covered</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h4 className="text-3xl font-bold text-indigo-600">95%</h4>
            <p className="text-gray-600 mt-1">Approval Rate</p>
          </div>
        </div>

        <div className="text-center pt-8">
          <Link to="/report">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg transition">
              View Reports
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
