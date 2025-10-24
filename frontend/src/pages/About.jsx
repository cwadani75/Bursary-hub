import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  Shield,
  Heart,
  GraduationCap,
  Target,
  Clock,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  BookOpen,
  Globe,
  BarChart3,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Quote
} from "lucide-react";

const About = () => {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className="text-gray-200 bg-gray-950 min-h-screen">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-indigo-400" />
                <span className="text-xl font-bold">Bursary<span className="text-indigo-400">Hub</span></span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/about" className="text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                <Link to="/apply" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Apply</Link>
                <Link to="/status" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Check Status</Link>
                <Link to="/faq" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">FAQ</Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6 space-x-4">
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-indigo-900/70 to-black/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('/img/bursery.jpg')] bg-cover bg-center mix-blend-overlay z-0"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center rounded-full bg-indigo-800/30 px-4 py-2 text-sm text-indigo-200 mb-6 border border-indigo-600/50">
            <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
            Transforming Education Since 2015
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            About <span className="text-indigo-400 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">BursaryHub</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-200 leading-relaxed">
            Empowering students across Kenya with accessible bursary opportunities, 
            bridging the gap between <span className="font-semibold text-white">dreams</span> and{" "}
            <span className="font-semibold text-white">reality</span> through technology and innovation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link to="/apply">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                Apply for Bursary <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/contact">
              <button className="border-2 border-indigo-400 text-indigo-300 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-400 hover:text-black transition duration-300 flex items-center gap-2">
                Contact Us <Mail size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap border-b border-gray-800 mb-12">
            <button
              className={`px-6 py-3 font-medium text-lg border-b-2 transition-all ${activeTab === "mission" ? "border-indigo-500 text-white" : "border-transparent text-gray-500 hover:text-white"}`}
              onClick={() => setActiveTab("mission")}
            >
              Our Mission
            </button>
            <button
              className={`px-6 py-3 font-medium text-lg border-b-2 transition-all ${activeTab === "vision" ? "border-indigo-500 text-white" : "border-transparent text-gray-500 hover:text-white"}`}
              onClick={() => setActiveTab("vision")}
            >
              Our Vision
            </button>
            <button
              className={`px-6 py-3 font-medium text-lg border-b-2 transition-all ${activeTab === "values" ? "border-indigo-500 text-white" : "border-transparent text-gray-500 hover:text-white"}`}
              onClick={() => setActiveTab("values")}
            >
              Our Values
            </button>
          </div>

          {activeTab === "mission" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-400">Our Mission</h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  BursaryHub is a revolutionary platform that simplifies bursary application and 
                  management across Kenya. We ensure transparency, fairness, and accessibility so 
                  that no student is denied an education due to financial constraints.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-300">Digital transformation of bursary management systems</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-300">Reduce application processing time by up to 70%</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-300">Ensure equitable distribution of educational funds</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl">
                <Target className="h-12 w-12 text-indigo-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-white">Strategic Objectives</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                    <span>Digitize 90% of county bursary processes by 2025</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                    <span>Support 500,000 students annually by 2026</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                    <span>Establish partnerships with all 47 counties</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                    <span>Reduce fund disbursement time to under 30 days</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "vision" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-400">Our Vision</h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  To create a Kenya where every student, regardless of their background, 
                  has equal access to education opportunities through transparent and 
                  efficient bursary management systems.
                </p>
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-800/30">
                  <h4 className="text-xl font-semibold mb-3 text-white">Future Initiatives</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                      <span>Expansion to vocational training programs</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                      <span>Integration with HELB and other loan systems</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                      <span>Mobile app for real-time application tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl">
                <Globe className="h-12 w-12 text-indigo-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-white">National Impact</h3>
                <p className="text-gray-300 mb-4">
                  By 2030, we aim to have facilitated over KSh 10 billion in educational funding, 
                  directly impacting more than 1 million students across all 47 counties.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-indigo-400">1M+</div>
                    <div className="text-sm text-gray-400">Students</div>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-indigo-400">47</div>
                    <div className="text-sm text-gray-400">Counties</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "values" && (
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-400">Our Values</h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Our core values guide everything we do, from platform development to student 
                  support and county partnerships.
                </p>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 text-white">Ethical Framework</h3>
                  <p className="text-gray-300">
                    We operate with the highest standards of integrity, ensuring that every bursary 
                    allocation is fair, transparent, and based on verified need rather than favoritism 
                    or corruption.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-900/30 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Shield className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Transparency</h4>
                    <p className="text-gray-300">All processes are open to scrutiny with clear audit trails</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-900/30 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Heart className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Compassion</h4>
                    <p className="text-gray-300">We prioritize the most vulnerable and marginalized students</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-900/30 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Innovation</h4>
                    <p className="text-gray-300">Continuously improving our platform to serve students better</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-900/30 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Users className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Community</h4>
                    <p className="text-gray-300">Building partnerships that strengthen educational access</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-400">How BursaryHub Works</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our platform revolutionizes the traditional bursary application process through technology, 
              making it simpler, faster, and more transparent for everyone involved.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-5">
              <div className="sticky top-24">
                <h3 className="text-2xl font-bold mb-6 text-white">Streamlined Process</h3>
                <p className="text-gray-300 mb-6">
                  From application to disbursement, our digital platform eliminates bureaucracy and 
                  reduces processing time from months to weeks.
                </p>
                <div className="bg-indigo-900/20 p-6 rounded-xl border border-indigo-800/30">
                  <h4 className="text-lg font-semibold mb-3 text-white">Key Benefits</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-indigo-400 mr-2" />
                      <span>70% faster application processing</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-indigo-400 mr-2" />
                      <span>Real-time application tracking</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-indigo-400 mr-2" />
                      <span>Mobile-friendly platform</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-indigo-400 mr-2" />
                      <span>Automated eligibility verification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-900/30 mb-4">
                    <BookOpen className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Digital Applications</h3>
                  <p className="text-gray-300">
                    Students can apply from anywhere using any device, eliminating the need for 
                    physical paperwork and long queues.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-900/30 mb-4">
                    <BarChart3 className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Smart Verification</h3>
                  <p className="text-gray-300">
                    Our system cross-references application data with national databases to 
                    verify eligibility automatically.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-900/30 mb-4">
                    <Shield className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Transparent Review</h3>
                  <p className="text-gray-300">
                    Applications are reviewed by committees with clear scoring criteria, and 
                    all decisions are documented and auditable.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-900/30 mb-4">
                    <Award className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Direct Disbursement</h3>
                  <p className="text-gray-300">
                    Approved funds are sent directly to educational institutions, ensuring 
                    they are used for their intended purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-700 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://assets.website-files.com/5e6c01bb7c9c459f8c7d673a/5e6edda7b521b9e2d85db7d0_Dots.svg')] bg-center opacity-10"></div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Impact in Numbers</h2>
            <p className="text-lg text-indigo-100 max-w-3xl mx-auto">
              Since our inception, we've made significant strides in transforming bursary management across Kenya.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-4xl font-bold mb-2">47+</div>
              <p className="text-indigo-100">Counties Reached</p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-4xl font-bold mb-2">100K+</div>
              <p className="text-indigo-100">Students Supported</p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-indigo-100">Partner Institutions</p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-4xl font-bold mb-2">10+</div>
              <p className="text-indigo-100">Years of Impact</p>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">KSh 2.5B+</div>
              <p className="text-indigo-100">Funds Disbursed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">94%</div>
              <p className="text-indigo-100">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">72%</div>
              <p className="text-indigo-100">Faster Processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-400">What People Say</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Hear from students, educational institutions, and government partners about their experience with BursaryHub.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800">
              <Quote className="h-8 w-8 text-indigo-400 mb-4 rotate-180" />
              <p className="text-gray-300 mb-6">
                "BursaryHub transformed how our county manages educational funds. We've reduced processing time by 70% and eliminated countless hours of paperwork."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-white">John Mwangi</h4>
                  <p className="text-sm text-gray-400">Bursary Officer, Nairobi County</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800">
              <Quote className="h-8 w-8 text-indigo-400 mb-4 rotate-180" />
              <p className="text-gray-300 mb-6">
                "As a principal, I've seen firsthand how BursaryHub has helped my students access education opportunities they wouldn't have known about otherwise."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-white">Dr. Grace Auma</h4>
                  <p className="text-sm text-gray-400">Principal, Moi High School</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800">
              <Quote className="h-8 w-8 text-indigo-400 mb-4 rotate-180" />
              <p className="text-gray-300 mb-6">
                "Thanks to BursaryHub, I was able to complete my university education without financial stress. The application process was simple and transparent."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-white">Susan Kariuki</h4>
                  <p className="text-sm text-gray-400">Medical Student, University of Nairobi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-800 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Education Together?</h2>
          <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto">
            Whether you're a student seeking financial aid, an institution looking to partner with us, or a donor wanting to make an impact, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/apply">
              <button className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                Apply for Bursary <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/partner">
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-800 transition duration-300 flex items-center gap-2">
                Partner With Us <Users size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-400">Get In Touch</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Have questions or want to learn more about our platform? Our team is here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/30 mb-6">
                <Mail className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Email Us</h3>
              <p className="text-gray-300">info@bursaryhub.org</p>
              <p className="text-gray-300">support@bursaryhub.org</p>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/30 mb-6">
                <Phone className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Call Us</h3>
              <p className="text-gray-300">+254 700 123 456</p>
              <p className="text-gray-300">+254 725 942 450</p>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/30 mb-6">
                <MapPin className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Visit Us</h3>
              <p className="text-gray-300">Nairobi, Kenya</p>
              <p className="text-gray-300">Garissa County Office</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 pt-12 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <GraduationCap className="h-8 w-8 text-indigo-400" />
                <span className="text-xl font-bold">Bursary<span className="text-indigo-400">Hub</span></span>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming education through efficient bursary management and distribution across Kenya.
              </p>
              <div className="flex space-x-4">
                <div className="h-10 w-10 bg-gray-800 rounded-lg"></div>
                <div className="h-10 w-10 bg-gray-800 rounded-lg"></div>
                <div className="h-10 w-10 bg-gray-800 rounded-lg"></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-indigo-400 transition">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-indigo-400 transition">About Us</Link></li>
                <li><Link to="/apply" className="text-gray-400 hover:text-indigo-400 transition">Apply for Bursary</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-indigo-400 transition">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
              <ul className="space-y-3">
                <li><Link to="/blog" className="text-gray-400 hover:text-indigo-400 transition">Blog</Link></li>
                <li><Link to="/help" className="text-gray-400 hover:text-indigo-400 transition">Help Center</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-indigo-400 transition">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-indigo-400 transition">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to get updates on new bursary opportunities</p>
              <form className="flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-3 font-medium transition">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} BursaryHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default About;