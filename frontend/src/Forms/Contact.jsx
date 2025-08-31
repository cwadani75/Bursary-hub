import React, { useState } from 'react';
<<<<<<< HEAD
import apiService from '../services/api';
import { CheckCircle, AlertCircle } from 'lucide-react';
=======
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
=======
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await apiService.createContact(formData);
      setSuccess('Your message has been sent successfully!');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setError(error.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md my-10 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">Contact Us</h2>
      
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
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">Full Name</label>
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Message Submitted:', formData);
    alert('Your message has been sent!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Full Name</label>
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
<<<<<<< HEAD
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
=======
            className="w-full mt-1 p-2 border rounded-md"
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
            placeholder="Enter your full name"
          />
        </div>

        <div>
<<<<<<< HEAD
          <label className="block font-medium text-gray-700 dark:text-gray-300">Email Address</label>
=======
          <label className="block font-medium text-gray-700">Email Address</label>
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
<<<<<<< HEAD
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
=======
            className="w-full mt-1 p-2 border rounded-md"
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
            placeholder="example@email.com"
          />
        </div>

        <div>
<<<<<<< HEAD
          <label className="block font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
=======
          <label className="block font-medium text-gray-700">Phone Number</label>
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
<<<<<<< HEAD
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
=======
            className="w-full mt-1 p-2 border rounded-md"
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
            placeholder="+254712345678"
          />
        </div>

        <div>
<<<<<<< HEAD
          <label className="block font-medium text-gray-700 dark:text-gray-300">Subject</label>
=======
          <label className="block font-medium text-gray-700">Subject</label>
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
<<<<<<< HEAD
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            placeholder="What is this about?"
=======
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Write the subject of your message"
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
          />
        </div>

        <div>
<<<<<<< HEAD
          <label className="block font-medium text-gray-700 dark:text-gray-300">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            placeholder="Please describe your inquiry or concern..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium flex items-center justify-center ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600'
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
=======
          <label className="block font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Write your message here..."
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </div>
>>>>>>> 8ed9babf99ff1647a1bdde429ef8f15cc86c9a65
      </form>
    </div>
  );
};

export default Contact;
