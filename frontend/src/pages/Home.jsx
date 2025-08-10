import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative text-white min-h-[600px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img/students.png')" }}
      >
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to the Bursary Management System
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Empowering students with financial aid across all counties. Apply easily and track your bursary applications.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/apply">
              <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
                Apply for Bursary
              </button>
            </Link>
            <Link to="/report">
              <button className="bg-indigo-800 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition">
                Report an Issue
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-indigo-700">12,500+</h3>
            <p className="text-gray-600 mt-2">Students Helped</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-indigo-700">47</h3>
            <p className="text-gray-600 mt-2">Counties Covered</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-indigo-700">KSh 2.5B+</h3>
            <p className="text-gray-600 mt-2">Funds Disbursed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-indigo-700">94%</h3>
            <p className="text-gray-600 mt-2">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">Why Choose Us</h2>
        <p className="text-lg mb-10 text-gray-700 max-w-3xl mx-auto">
          Empowering Students Across Kenya — Our bursary program is designed to be accessible, transparent, and supportive of every student's educational journey.
        </p>
        <div className="grid gap-8 md:grid-cols-3 text-left">
          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Simple Application</h3>
            <p className="text-gray-700">Easy multi-step application process with clear guidance.</p>
          </div>
          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Transparent Process</h3>
            <p className="text-gray-700">Fair selection criteria and transparent fund disbursement.</p>
          </div>
          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Community Support</h3>
            <p className="text-gray-700">Supporting students from all backgrounds across Kenya.</p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Success Stories</h2>
          <p className="text-lg mb-12 text-gray-700">Real stories from students whose lives have been transformed through our bursary program.</p>
          <div className="grid gap-8 md:grid-cols-3 text-left">
            <div className="bg-white shadow p-6 rounded-lg">
              <p className="italic mb-4 text-gray-800">
                "The bursary program helped me complete my engineering degree. The application process was straightforward and fair."
              </p>
              <p className="font-semibold text-indigo-700">Grace Wanjiku</p>
              <p className="text-gray-600 text-sm">Nairobi County</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <p className="italic mb-4 text-gray-800">
                "Thanks to this program, I could focus on my studies without worrying about fees. Truly life-changing!"
              </p>
              <p className="font-semibold text-indigo-700">John Kiprotich</p>
              <p className="text-gray-600 text-sm">Uasin Gishu County</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <p className="italic mb-4 text-gray-800">
                "The transparent selection process gave me confidence in the system. Grateful for the opportunity."
              </p>
              <p className="font-semibold text-indigo-700">Fatuma Hassan</p>
              <p className="text-gray-600 text-sm">Mombasa County</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">Ready to Start Your Journey?</h2>
        <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">
          Join thousands of students who have already benefited from our bursary program. Your education is our priority.
        </p>
        <Link to="/apply">
          <button className="bg-indigo-700 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-800 transition font-semibold text-lg">
            Apply for Bursary
          </button>
        </Link>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="mx-auto mb-2" size={32} />
              <p className="text-lg font-medium">Dadaab, Garissa County, Kenya</p>
            </div>
            <div>
              <Mail className="mx-auto mb-2" size={32} />
              <p className="text-lg font-medium">support@bursaryhub.org</p>
            </div>
            <div>
              <Phone className="mx-auto mb-2" size={32} />
              <p className="text-lg font-medium">+254 712 345 678</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
