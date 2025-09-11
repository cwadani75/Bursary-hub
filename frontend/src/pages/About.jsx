import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  Shield,
  Heart,
  BookOpen,
  GraduationCap,
  Target,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const About = () => {
  return (
    <div className="text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Hero Section with Background Image */}
      <section
        className="relative py-20 md:py-28 text-white overflow-hidden"
        style={{
          backgroundImage: "url('public/img/bursery.jpg')", // ✅ fixed path
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About BursaryHub
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Empowering students across Kenya with accessible bursary
            opportunities, bridging the gap between dreams and reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/apply">
              <button className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Apply Now
              </button>
            </Link>
            <Link to="/contact">
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700 transition-colors duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Mission */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-700 dark:text-indigo-400">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              BursaryHub is a revolutionary digital platform designed to
              streamline bursary application and management across Kenya. We
              connect deserving students with financial aid opportunities
              through a transparent, efficient, and user-friendly system.
            </p>
          </div>

          {/* Vision & Goals */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-indigo-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md">
              <Target className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-300">
                To create a Kenya where every child, regardless of background,
                can pursue education without financial barriers.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md">
              <Clock className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Our Goals</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Ensure fair and transparent bursary distribution</li>
                <li>Support over 1M students by 2030</li>
                <li>Partner with county governments & NGOs</li>
                <li>Promote digital accessibility nationwide</li>
              </ul>
            </div>
          </div>

          {/* Features */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700 dark:text-indigo-400">
              Key Features
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md">
                <Users className="h-10 w-10 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Community Impact</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connecting students, parents, and institutions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md">
                <Shield className="h-10 w-10 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Transparency</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fair and accountable bursary processes.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md">
                <Award className="h-10 w-10 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Recognition</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Empowering future leaders through education.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md">
                <Heart className="h-10 w-10 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Inclusivity</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Supporting students from all walks of life.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-indigo-600 dark:bg-indigo-700 text-white py-12 rounded-2xl shadow-lg mb-20">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold">47+</h3>
                <p>Counties Reached</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">100K+</h3>
                <p>Students Supported</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">500+</h3>
                <p>Partners & Institutions</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">10+</h3>
                <p>Years of Impact</p>
              </div>
            </div>
          </div>

          {/* Why BursaryHub Matters */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
              Why BursaryHub Matters
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our project goes beyond financial aid — we aim to build an
              inclusive ecosystem where education is accessible to all.
              Through partnerships with governments, NGOs, and private
              organizations, we ensure students get the support they need to
              succeed academically and socially.
            </p>
          </div>

          {/* Contact */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <Mail className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-400">
                info@bursaryhub.org
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-400">
                +254 700 123 456
              </p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Nairobi, Kenya
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
