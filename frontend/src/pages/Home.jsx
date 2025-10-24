import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Mail, Phone, MapPin, GraduationCap, Globe2, Wallet, Star, 
  Users, Clock, Shield, Award, BookOpen, Calendar, ChevronLeft, 
  ChevronRight, AlertCircle, CheckCircle, XCircle 
} from "lucide-react";

const Home = () => {
  const [currentCountyIndex, setCurrentCountyIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Update current date every second for the countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sample data for Kenyan counties with 25-day application windows
  const countiesData = [
    {
      id: 1,
      name: "Nairobi",
      subCounties: [
        { name: "Westlands", wards: ["Kangemi", "Mountain View", "Parklands"] },
        { name: "Dagoretti", wards: ["Kilimani", "Kawangware", "Uthiru"] },
        { name: "Embakasi", wards: ["Kayole", "Utawala", "Embakasi Central"] },
        { name: "Kasarani", wards: ["Kasarani", "Ruaraka", "Mathare North"] }
      ],
      applicationStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 9), // Started 9 days ago
      applicationEnd: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 9),   // Will be set to 25 days later
      contact: "0720 123 456",
      coordinator: "Ms. Wanjiku Mwangi",
      isOpen: true
    },
    {
      id: 2,
      name: "Wajir",
      subCounties: [
        { name: "Wajir East", wards: ["Bura", "Tarbaj", "Wajir Bor"] },
        { name: "Wajir West", wards: ["Griftu", "Lafey", "Elben"] },
        { name: "Wajir North", wards: ["Batalu", "Dandu", "Gurar"] },
        { name: "Wajir South", wards: ["Habaswein", "Sala", "Labasigale"] }
      ],
      applicationStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 5), // Started 5 days ago
      applicationEnd: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 5),   // Will be set to 25 days later
      contact: "0720 234 567",
      coordinator: "Mr. Abdi Mohamed",
      isOpen: true
    },
    {
      id: 3,
      name: "Mandera",
      subCounties: [
        { name: "Mandera East", wards: ["Arabia", "Khalalio", "Neboi"] },
        { name: "Mandera West", wards: ["Elwak", "Shimbir Fatuma", "Fino"] },
        { name: "Mandera North", wards: ["Rhamu", "Dandu", "Gither"] },
        { name: "Mandera South", wards: ["Lafey", "Warankara", "Kiliwehiri"] }
      ],
      applicationStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 3), // Started 3 days ago
      applicationEnd: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 3),   // Will be set to 25 days later
      contact: "0720 345 678",
      coordinator: "Ms. Halima Adan",
      isOpen: true
    },
    {
      id: 4,
      name: "Garissa",
      subCounties: [
        { name: "Garissa Township", wards: ["Garissa Central", "Iftin", "Soko Mjinga"] },
        { name: "Dadaab", wards: ["Dadaab", "Liboi", "Damajale"] },
        { name: "Fafi", wards: ["Bura", "Deftu", "Fafi"] },
        { name: "Lagdera", wards: ["Sala", "Modogashe", "Balambala"] }
      ],
      applicationStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), // Starts today
      applicationEnd: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),   // Will be set to 25 days later
      contact: "0720 456 789",
      coordinator: "Ms. Fatuma Abdi",
      isOpen: true
    },
    {
      id: 5,
      name: "Mombasa",
      subCounties: [
        { name: "Mvita", wards: ["Tudor", "Tononoka", "Mji Wa Kale"] },
        { name: "Kisauni", wards: ["Mtopanga", "Mikindani", "Mjambere"] }
      ],
      applicationStart: new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1), // Future date
      applicationEnd: new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1),   // Will be set to 25 days later
      contact: "0720 567 890",
      coordinator: "Mr. Ali Hassan",
      isOpen: false
    },
    {
      id: 6,
      name: "Kisumu",
      subCounties: [
        { name: "Kisumu Central", wards: ["Railway", "Migosi", "Kanyakwar"] },
        { name: "Kisumu East", wards: ["Kajulu", "Kolwa Central", "Manyatta"] }
      ],
      applicationStart: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15), // Future date
      applicationEnd: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15),   // Will be set to 25 days later
      contact: "0720 678 901",
      coordinator: "Ms. Achieng Omondi",
      isOpen: false
    }
  ];

  // Set application end dates to 25 days after start
  countiesData.forEach(county => {
    county.applicationEnd = new Date(county.applicationStart);
    county.applicationEnd.setDate(county.applicationStart.getDate() + 25);
  });

  // Rotate through counties
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCountyIndex((prevIndex) => 
        prevIndex === countiesData.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change county every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const currentCounty = countiesData[currentCountyIndex];

  // Check if bursary is currently open for this county
  const isBursaryOpen = currentCounty.isOpen && 
                        currentDate >= currentCounty.applicationStart && 
                        currentDate <= currentCounty.applicationEnd;

  // Calculate time remaining
  useEffect(() => {
    if (isBursaryOpen) {
      const updateCountdown = () => {
        const now = new Date();
        const distance = currentCounty.applicationEnd - now;
        
        if (distance < 0) {
          setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setTimeRemaining({ days, hours, minutes, seconds });
      };
      
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000); // Update every second
      return () => clearInterval(interval);
    }
  }, [isBursaryOpen, currentCountyIndex]);

  // Calculate days until opening or since closed
  const getDaysStatus = () => {
    if (isBursaryOpen) {
      return `Application window is open for 25 days. Time remaining: ${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s left`;
    } else if (currentDate < currentCounty.applicationStart) {
      const daysUntil = Math.ceil((currentCounty.applicationStart - currentDate) / (1000 * 60 * 60 * 24));
      return `Applications open in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`;
    } else {
      const daysSince = Math.ceil((currentDate - currentCounty.applicationEnd) / (1000 * 60 * 60 * 24));
      return `Applications closed ${daysSince} day${daysSince !== 1 ? 's' : ''} ago`;
    }
  };

  const handlePrevCounty = () => {
    setCurrentCountyIndex((prevIndex) => 
      prevIndex === 0 ? countiesData.length - 1 : prevIndex - 1
    );
  };

  const handleNextCounty = () => {
    setCurrentCountyIndex((prevIndex) => 
      prevIndex === countiesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-[550px] flex items-center justify-center px-6 bg-gradient-to-r from-indigo-900 via-gray-900 to-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="text-left">
            <span className="inline-block bg-indigo-700 text-white px-5 py-1 rounded-full text-sm mb-6 shadow">
              🎉 Introducing Bursary Hub 2.0
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Transform Your <span className="text-indigo-400">Education</span>
              <br /> With Our <span className="text-indigo-500">Bursary Solution</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
              Kenya's most trusted bursary management platform connecting students with educational funding opportunities. 
              Our streamlined digital platform ensures transparency, efficiency, and equitable access to educational resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-semibold shadow-lg transition">
                  Apply for Bursary
                </button>
              </Link>
              <Link to="/report">
                <button className="bg-gray-800 border border-indigo-500 hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold shadow-lg transition">
                  Report Issue
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="/img/graduation-cap-2.jpg" 
              alt="Graduation books"
              className="max-h-[350px] w-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Bursary Status Advertisement */}
      <section className="py-16 bg-gradient-to-br from-indigo-900 to-indigo-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              County Bursary Application Status
            </h2>
            <p className="text-indigo-200 max-w-2xl mx-auto">
              Real-time information on bursary application windows across all Kenyan counties
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-indigo-700 p-5 text-white text-center">
              <h3 className="text-2xl font-bold">Bursary Application Status</h3>
              <p className="text-indigo-100">Updated in real-time</p>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={handlePrevCounty}
                  className="p-3 rounded-full bg-indigo-100 hover:bg-indigo-200 transition shadow"
                  aria-label="Previous county"
                >
                  <ChevronLeft className="text-indigo-700" size={20} />
                </button>
                
                <div className="text-center flex-1 mx-4">
                  <h3 className="text-2xl font-bold text-gray-800">{currentCounty.name} County</h3>
                  <div className="flex items-center justify-center mt-2">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full ${isBursaryOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {isBursaryOpen ? (
                        <CheckCircle size={18} className="mr-2" />
                      ) : (
                        <XCircle size={18} className="mr-2" />
                      )}
                      <span className="font-semibold">
                        {isBursaryOpen ? 'Applications Open' : 'Applications Closed'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{getDaysStatus()}</p>
                  
                  {isBursaryOpen && (
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex justify-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-800">{timeRemaining.days}</div>
                          <div className="text-xs text-blue-600">Days</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-800">{timeRemaining.hours}</div>
                          <div className="text-xs text-blue-600">Hours</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-800">{timeRemaining.minutes}</div>
                          <div className="text-xs text-blue-600">Minutes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-800">{timeRemaining.seconds}</div>
                          <div className="text-xs text-blue-600">Seconds</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={handleNextCounty}
                  className="p-3 rounded-full bg-indigo-100 hover:bg-indigo-200 transition shadow"
                  aria-label="Next county"
                >
                  <ChevronRight className="text-indigo-700" size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
                  <h4 className="font-semibold text-indigo-800 mb-3 flex items-center">
                    <Calendar className="mr-2" size={18} />
                    Application Period
                  </h4>
                  <p className="text-gray-700">
                    {formatDate(currentCounty.applicationStart)} - {formatDate(currentCounty.applicationEnd)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">25-day application window</p>
                </div>
                
                <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
                  <h4 className="font-semibold text-indigo-800 mb-3 flex items-center">
                    <Phone className="mr-2" size={18} />
                    Contact Information
                  </h4>
                  <p className="text-gray-700">{currentCounty.contact}</p>
                  <p className="text-sm text-gray-600">Coordinator: {currentCounty.coordinator}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-4 text-center">Covered Sub-Counties & Wards</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentCounty.subCounties.map((subCounty, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h5 className="font-medium text-indigo-700 mb-2">{subCounty.name} Sub-County</h5>
                      <div className="flex flex-wrap gap-2">
                        {subCounty.wards.map((ward, wardIndex) => (
                          <span key={wardIndex} className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                            {ward}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <div className="flex mb-4 sm:mb-0">
                  {countiesData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCountyIndex(index)}
                      className={`w-3 h-3 rounded-full mx-1 ${currentCountyIndex === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
                      aria-label={`View ${countiesData[index].name} County`}
                    />
                  ))}
                </div>
                
                <div className="text-sm text-gray-600">
                  <span className="hidden sm:inline">Current time: {currentDate.toLocaleTimeString()}</span>
                  <span className="mx-2 hidden md:inline">•</span>
                  <span>{currentDate.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center bg-indigo-800/30 text-indigo-200 px-4 py-2 rounded-lg">
              <AlertCircle size={16} className="mr-2" />
              <p className="text-sm">
                {currentCounty.isOpen ? 
                  "Application window is open for exactly 25 days. Apply before the deadline." : 
                  "Application window is currently closed. Check back later for updates."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-xl transition">
            <GraduationCap className="mx-auto mb-3 text-indigo-400" size={36} />
            <h3 className="text-3xl font-bold text-indigo-400">12,500+</h3>
            <p className="text-gray-400">Students Helped</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-xl transition">
            <Globe2 className="mx-auto mb-3 text-indigo-400" size={36} />
            <h3 className="text-3xl font-bold text-indigo-400">47</h3>
            <p className="text-gray-400">Counties Covered</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-xl transition">
            <Wallet className="mx-auto mb-3 text-indigo-400" size={36} />
            <h3 className="text-3xl font-bold text-indigo-400">KSh 2.5B+</h3>
            <p className="text-gray-400">Funds Disbursed</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-xl transition">
            <Star className="mx-auto mb-3 text-indigo-400" size={36} />
            <h3 className="text-3xl font-bold text-indigo-400">94%</h3>
            <p className="text-gray-400">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-indigo-400">About Bursary Hub</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Bursary Hub is a comprehensive digital platform designed to revolutionize how educational 
              bursaries are managed and distributed across Kenya. Our mission is to bridge the gap between 
              deserving students and available funding opportunities through technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-indigo-300">Our Vision</h3>
              <p className="text-gray-300 mb-6">
                To create an equitable education system where no Kenyan student misses learning opportunities 
                due to financial constraints. We envision a future where bursary distribution is transparent, 
                efficient, and accessible to all.
              </p>
              
              <h3 className="text-2xl font-bold mb-6 text-indigo-300">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-indigo-700 p-2 rounded-full mr-4 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-200">Create Profile</h4>
                    <p className="text-gray-400">Students register and create a comprehensive profile with academic and financial details.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-700 p-2 rounded-full mr-4 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-200">Find Opportunities</h4>
                    <p className="text-gray-400">Our system matches students with relevant bursary opportunities based on their profiles.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-700 p-2 rounded-full mr-4 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-200">Apply Digitally</h4>
                    <p className="text-gray-400">Submit applications online with all required documentation in one place.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-700 p-2 rounded-full mr-4 mt-1">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-200">Track Status</h4>
                    <p className="text-gray-400">Monitor application status in real-time through our transparent tracking system.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-indigo-300">Key Features</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Shield className="text-indigo-400 mr-4 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-indigo-200">Secure Data Management</h4>
                    <p className="text-gray-400">Bank-level encryption protects all applicant data and sensitive information.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="text-indigo-400 mr-4 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-indigo-200">Quick Processing</h4>
                    <p className="text-gray-400">Reduced application processing time from weeks to just days.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="text-indigo-400 mr-4 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-indigo-200">Stakeholder Portal</h4>
                    <p className="text-gray-400">Dedicated interfaces for administrators, donors, and educational institutions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="text-indigo-400 mr-4 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-indigo-200">Merit-Based Allocation</h4>
                    <p className="text-gray-400">AI-powered scoring system ensures fair and equitable distribution of funds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 text-center bg-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-indigo-400">Why Choose Bursary Hub</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12">
          Our platform stands out through innovation, transparency, and commitment to educational equity.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-xl shadow hover:scale-105 hover:shadow-xl transition">
            <BookOpen className="mx-auto mb-3 text-indigo-400" size={36} />
            <h3 className="text-lg font-semibold mb-2 text-indigo-400">Comprehensive Access</h3>
            <p className="text-gray-400">Single platform for all bursary opportunities nationwide, saving time and effort.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow hover:scale-105 hover:shadow-xl transition">
            <Shield className="mx-auto mb-3 text-indigo-400" size={36} />
            <h3 className="text-lg font-semibold mb-2 text-indigo-400">Transparent Process</h3>
            <p className="text-gray-400">Blockchain-based tracking ensures complete transparency in fund distribution.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow hover:scale-105 hover:shadow-xl transition">
            <Clock className="mx-auto mb-3 text-indigo-400" size={36} />
            <h3 className="text-lg font-semibold mb-2 text-indigo-400">Time Efficient</h3>
            <p className="text-gray-400">Reduce application time by 70% compared to traditional paper-based methods.</p>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-indigo-400">Success Stories</h2>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            Hear from students whose educational journeys have been transformed through our platform
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-900 p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Amina Mohamed</h4>
                  <p className="text-indigo-300">Medicine Student, UON</p>
                </div>
              </div>
              <p className="text-gray-400">
                "Bursary Hub helped me secure funding for my medical degree. The transparent process 
                allowed me to focus on studies instead of worrying about fees."
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">JK</span>
                </div>
                <div>
                  <h4 className="font-semibold">John Kamau</h4>
                  <p className="text-indigo-300">Engineering Student, JKUAT</p>
                </div>
              </div>
              <p className="text-gray-400">
                "As an orphan from rural Kenya, I had limited options. Bursary Hub connected me with 
                three different sponsors who supported my entire engineering program."
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">NM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Nancy Mwende</h4>
                  <p className="text-indigo-300">Education Student, KU</p>
                </div>
              </div>
              <p className="text-gray-400">
                "The automated reminders and status updates kept me informed throughout the application 
                process. I received my bursary within 2 weeks of applying!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-2xl font-bold mb-12 text-indigo-400">Trusted By Leading Organizations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-80">
            <div className="bg-gray-800 p-6 rounded-lg h-24 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-300">Ministry of Education</span>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg h-24 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-300">Equity Group Foundation</span>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg h-24 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-300">USAID Kenya</span>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg h-24 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-300">Mastercard Foundation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-gradient-to-r from-indigo-700 to-indigo-900">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Educational Journey?</h2>
        <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
          Join over 12,500 students who have successfully secured funding through our platform. 
          Your academic dreams are within reach.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/apply">
            <button className="bg-white text-indigo-700 px-10 py-4 rounded-lg font-bold shadow-lg hover:bg-gray-200 transition">
              Apply Now
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-bold shadow-lg hover:bg-indigo-800 transition">
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">Have Questions?</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Our support team is available to assist you with the application process or any inquiries you may have.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 bg-gray-900 rounded-lg shadow">
              <MapPin className="mx-auto mb-3 text-indigo-400" size={32} />
              <p className="text-gray-300">Dadaab, Garissa County, Kenya</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg shadow">
              <Mail className="mx-auto mb-3 text-indigo-400" size={32} />
              <p className="text-gray-300">support@bursaryhub.org</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg shadow">
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