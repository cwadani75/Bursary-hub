import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center text-center px-6">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block bg-indigo-700 text-white px-4 py-1 rounded-full text-sm mb-6">
            Introducing Bursary Hub 2.0
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Transform Your <span className="text-indigo-400">Education</span> 
            <br /> With Our <span className="text-indigo-500">Bursary Solution</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Streamline your applications, boost transparency, and support
            education across Kenya with our modern bursary management system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply">
              <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold shadow-lg transition">
                Apply for Bursary
              </button>
            </Link>
            <Link to="/report">
              <button className="bg-gray-800 border border-indigo-500 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold shadow-lg transition">
                Report Issue
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-indigo-400">12,500+</h3>
            <p className="text-gray-400">Students Helped</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-indigo-400">47</h3>
            <p className="text-gray-400">Counties Covered</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-indigo-400">KSh 2.5B+</h3>
            <p className="text-gray-400">Funds Disbursed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-indigo-400">94%</h3>
            <p className="text-gray-400">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-400">Why Choose Us</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          Our bursary platform is designed to be accessible, transparent, and
          supportive of every student’s educational journey.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-indigo-400">
              Simple Application
            </h3>
            <p className="text-gray-400">Easy multi-step application process.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-indigo-400">
              Transparent Process
            </h3>
            <p className="text-gray-400">Fair and clear disbursement process.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-indigo-400">
              Community Support
            </h3>
            <p className="text-gray-400">
              Empowering students across Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-indigo-700">
        <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-lg text-gray-100 mb-6 max-w-2xl mx-auto">
          Join thousands of students already benefiting from our bursary
          program. Your education is our priority.
        </p>
        <Link to="/apply">
          <button className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-gray-200 transition">
            Apply Now
          </button>
        </Link>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-indigo-400 mb-8">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <MapPin className="mx-auto mb-3 text-indigo-400" size={32} />
              <p className="text-gray-300">Dadaab, Garissa County, Kenya</p>
            </div>
            <div>
              <Mail className="mx-auto mb-3 text-indigo-400" size={32} />
              <p className="text-gray-300">support@bursaryhub.org</p>
            </div>
            <div>
              <Phone className="mx-auto mb-3 text-indigo-400" size={32} />
              <p className="text-gray-300">+254 725 942 450</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
