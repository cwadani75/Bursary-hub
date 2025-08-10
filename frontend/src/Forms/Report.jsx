import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("✅ Report submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold text-center mb-6">Bursary Report Form</h2>

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
        <button type="submit"
          className="w-full py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition">
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default Report;
