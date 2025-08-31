import React, { useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { CheckCircle, AlertCircle } from 'lucide-react';
=======
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65

function Report() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    county: '',
    subCounty: '',
    ward: '',
    village: '',
    reportType: '',
    reason: '',
    description: ''
  });
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
=======
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65

  const counties = ['Nairobi', 'Garissa', 'Mombasa'];

  const subCounties = {
    Nairobi: ['Westlands', 'Kasarani', 'Langata'],
    Garissa: ['Dadaab', 'Balambala', 'Lagdera'],
    Mombasa: ['Changamwe', 'Likoni', 'Kisauni']
  };

  const wards = {
    Westlands: ['Parklands', 'Kangemi'],
    Kasarani: ['Roysambu', 'Clay City'],
    Langata: ['Karen', 'South C'],
    Dadaab: ['Hagadera', 'Ifo'],
    Balambala: ['Tetu', 'Bulla'],
    Lagdera: ['Modogashe', 'Sabena'],
    Changamwe: ['Port Reitz', 'Airport'],
    Likoni: ['Mtongwe', 'Shika Adabu'],
    Kisauni: ['Mtopanga', 'Magogoni']
  };

  const villages = {
    Parklands: ['Village A', 'Village B'],
    Kangemi: ['Village C', 'Village D'],
    Hagadera: ['Block A_5', 'Block B_2'],
    Ifo: ['Sector 1', 'Sector 2'],
    // Port Reitz: ['Mtaa 1', 'Mtaa 2'],
    Airport: ['Runway', 'Control']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset dependent fields when a parent is changed
    if (name === 'county') {
      setFormData({ ...formData, county: value, subCounty: '', ward: '', village: '' });
    } else if (name === 'subCounty') {
      setFormData({ ...formData, subCounty: value, ward: '', village: '' });
    } else if (name === 'ward') {
      setFormData({ ...formData, ward: value, village: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Check if user is authenticated
      if (!apiService.isAuthenticated()) {
        setError("Please login to submit a report");
        setLoading(false);
        return;
      }
      
      // Prepare report data
      const reportData = {
        title: formData.reason,
        description: formData.description,
        reportType: formData.reportType,
        reason: formData.reason,
        county: formData.county,
        subCounty: formData.subCounty,
        ward: formData.ward,
        village: formData.village
      };
      
      const response = await apiService.createReport(reportData);
      setSuccess("✅ Report submitted successfully!");
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      setError(error.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("✅ Report submitted successfully!");
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold text-center mb-6">Bursary Report Form</h2>

<<<<<<< HEAD
      {/* Error and Success Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          {success}
        </div>
      )}

=======
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Full Name */}
        <div>
          <label className="block font-semibold">Full Name</label>
          <input type="text" name="fullName" required onChange={handleChange}
            className="w-full mt-1 border rounded px-4 py-2" />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Email</label>
            <input type="email" name="email" onChange={handleChange}
              className="w-full mt-1 border rounded px-4 py-2" />
          </div>
          <div>
            <label className="block font-semibold">Phone Number</label>
            <input type="tel" name="phone" onChange={handleChange}
              className="w-full mt-1 border rounded px-4 py-2" />
          </div>
        </div>

        {/* Location Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">County</label>
            <select name="county" required value={formData.county}
              onChange={handleChange} className="w-full mt-1 border rounded px-4 py-2">
              <option value="">Select County</option>
              {counties.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold">Sub-County</label>
            <select name="subCounty" required value={formData.subCounty}
              onChange={handleChange} className="w-full mt-1 border rounded px-4 py-2">
              <option value="">Select Sub-County</option>
              {(subCounties[formData.county] || []).map((sc) => (
                <option key={sc} value={sc}>{sc}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Ward</label>
            <select name="ward" required value={formData.ward}
              onChange={handleChange} className="w-full mt-1 border rounded px-4 py-2">
              <option value="">Select Ward</option>
              {(wards[formData.subCounty] || []).map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold">Village</label>
            <select name="village" required value={formData.village}
              onChange={handleChange} className="w-full mt-1 border rounded px-4 py-2">
              <option value="">Select Village</option>
              {(villages[formData.ward] || []).map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Report Type & Reason */}
        <div>
          <label className="block font-semibold">Report Type</label>
          <select name="reportType" required value={formData.reportType}
            onChange={handleChange} className="w-full mt-1 border rounded px-4 py-2">
            <option value="">Select Type</option>
            <option value="Fraud">Fraud</option>
            <option value="Delay">Delayed Response</option>
            <option value="Ineligibility">Ineligibility Concern</option>
            <option value="Corruption">Corruption</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Reason / Title</label>
          <input type="text" name="reason" required onChange={handleChange}
            placeholder="e.g. Suspected misuse of funds"
            className="w-full mt-1 border rounded px-4 py-2" />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Detailed Explanation</label>
          <textarea name="description" required rows="5" onChange={handleChange}
            className="w-full mt-1 border rounded px-4 py-2"
            placeholder="Describe the issue clearly..." />
        </div>

        {/* Submit */}
<<<<<<< HEAD
        <button 
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded transition flex items-center justify-center ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            'Submit Report'
          )}
=======
        <button type="submit"
          className="w-full py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition">
          Submit Report
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
        </button>
      </form>
    </div>
  );
}

export default Report;
