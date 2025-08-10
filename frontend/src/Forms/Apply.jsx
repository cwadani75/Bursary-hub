import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  MapPin,
  GraduationCap,
  DollarSign,
  Upload,
  CheckCircle,
} from "lucide-react";

const ApplyForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    gender: "",
    dob: "",
    county: "",
    subCounty: "",
    ward: "",
    village: "",
    institution: "",
    course: "",
    yearOfStudy: "",
    feeAmount: "",
    transcript: null,
    admissionLetter: null,
    idCopy: null,
    birthCertificate: null,
    parentName: "",
    parentPhone: "",
    guardianName: "",
    guardianPhone: "",
    familyIncome: "",
    reason: "",
  });

  const counties = {
    "Nairobi": {
      subCounties: {
        "Westlands": { wards: ["Parklands", "Kangemi"] },
        "Langata": { wards: ["Karen", "Nairobi West"] },
      },
    },
    "Garissa": {
      subCounties: {
        "Dadaab": { wards: ["Hagadera", "Ifo", "Dagahaley"] },
        "Garissa Township": { wards: ["Galbet", "Waberi"] },
      },
    },
  };

  const steps = [
    { title: "Personal Details", icon: <User className="w-5 h-5" /> },
    { title: "Location", icon: <MapPin className="w-5 h-5" /> },
    { title: "Education", icon: <GraduationCap className="w-5 h-5" /> },
    { title: "Financial", icon: <DollarSign className="w-5 h-5" /> },
    { title: "Documents", icon: <Upload className="w-5 h-5" /> },
    { title: "Confirmation", icon: <CheckCircle className="w-5 h-5" /> },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 ${
                step === i ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {s.icon}
              <span className="hidden sm:inline">{s.title}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <div className="space-y-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="idNumber"
                placeholder="National ID / Birth Cert No."
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <select
                name="county"
                value={formData.county}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select County</option>
                {Object.keys(counties).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              {formData.county && (
                <select
                  name="subCounty"
                  value={formData.subCounty}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Sub-County</option>
                  {Object.keys(counties[formData.county].subCounties).map(
                    (sc) => (
                      <option key={sc}>{sc}</option>
                    )
                  )}
                </select>
              )}

              {formData.subCounty && (
                <select
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Ward</option>
                  {counties[formData.county].subCounties[
                    formData.subCounty
                  ].wards.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
              )}

              <input
                type="text"
                name="village"
                placeholder="Village"
                value={formData.village}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          )}

          {/* Step 2 - Education */}
          {step === 2 && (
            <div className="space-y-4">
              <input
                type="text"
                name="institution"
                placeholder="Institution Name"
                value={formData.institution}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="course"
                placeholder="Course Name"
                value={formData.course}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="yearOfStudy"
                placeholder="Year of Study"
                value={formData.yearOfStudy}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          )}

          {/* Step 3 - Financial */}
          {step === 3 && (
            <div className="space-y-4">
              <input
                type="number"
                name="feeAmount"
                placeholder="Total Fee Amount"
                value={formData.feeAmount}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="familyIncome"
                placeholder="Monthly Family Income"
                value={formData.familyIncome}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="reason"
                placeholder="Why do you need this bursary?"
                value={formData.reason}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          )}

          {/* Step 4 - Documents */}
          {step === 4 && (
            <div className="space-y-4">
              <input type="file" name="transcript" onChange={handleChange} />
              <input type="file" name="admissionLetter" onChange={handleChange} />
              <input type="file" name="idCopy" onChange={handleChange} />
              <input type="file" name="birthCertificate" onChange={handleChange} />
            </div>
          )}

          {/* Step 5 - Confirmation */}
          {step === 5 && (
            <div>
              <p className="mb-4">
                Please review your details before submitting. Click "Submit"
                when ready.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-4 py-2 bg-gray-300 rounded"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </button>
            )}
            {step < steps.length - 1 && (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            )}
            {step === steps.length - 1 && (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
