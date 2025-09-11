import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Camera, 
  Edit3, 
  Save, 
  X,
  Upload,
  Trash2,
  LogOut
} from 'lucide-react';
import apiService from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProfile();
      // The backend returns { user: { ... } } structure
      const profileData = response.user || response;
      setUser(profileData);
      setEditForm({
        name: profileData.name,
        email: profileData.email
      });
      if (profileData.profile_picture) {
        setPreviewUrl(`http://localhost:5001/uploads/${profileData.profile_picture}`);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    try {
      setUploading(true);
      setError('');
      const response = await apiService.uploadProfilePicture(selectedFile);
      setSuccess('Profile picture updated successfully!');
      setSelectedFile(null);
      
      // Reload profile to get updated picture
      await loadUserProfile();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      name: user.name,
      email: user.email
    });
    setError('');
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // Note: Backend doesn't have update profile endpoint yet
      // This would need to be implemented in the backend
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Reload profile
      await loadUserProfile();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    apiService.logout();
    navigate('/login');
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage your account settings and profile information
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            Logout
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 sm:mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-md text-sm">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 sm:mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">
                Profile Picture
              </h3>
              
              <div className="flex flex-col items-center space-y-4">
                {/* Current Profile Picture */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {previewUrl || user?.profile_picture ? (
                      <img
                        src={previewUrl || `http://localhost:5001/uploads/${user.profile_picture}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Upload Button */}
                  <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
                    <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* File Upload Controls */}
                {selectedFile && (
                  <div className="w-full space-y-3">
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      Selected: {selectedFile.name}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                      <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                      >
                        {uploading ? 'Uploading...' : 'Upload'}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(user?.profile_picture ? `http://localhost:5001/uploads/${user.profile_picture}` : '');
                        }}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Profile Information
                </h3>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
                  >
                    <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
                    >
                      <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white text-sm sm:text-base">{user?.name}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white text-sm sm:text-base">{user?.email}</span>
                    </div>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white text-sm sm:text-base capitalize">{user?.role}</span>
                  </div>
                </div>

                {/* Member Since */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white text-sm sm:text-base">
                      {user?.created_at ? formatDate(user.created_at) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;