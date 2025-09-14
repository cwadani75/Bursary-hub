const API_BASE_URL = 'http://localhost:5001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get JWT token from localStorage
  getToken() {
    return localStorage.getItem('jwt_token');
  }

  // Set JWT token in localStorage
  setToken(token) {
    localStorage.setItem('jwt_token', token);
  }

  // Remove JWT token from localStorage
  removeToken() {
    localStorage.removeItem('jwt_token');
  }

  // Get user data from localStorage
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Set user data in localStorage
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Remove user data from localStorage
  removeUser() {
    localStorage.removeItem('user');
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle token expiration
        if (response.status === 401) {
          this.removeToken();
          this.removeUser();
          // Don't redirect automatically, let the component handle it
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication methods
  async signup(userData) {
    const response = await this.request('/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response;
  }

  async login(credentials) {
    try {
      const response = await this.request('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (response.access_token) {
        this.setToken(response.access_token);
        this.setUser(response.user);
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async forgotPassword(email) {
    const response = await this.request('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    return response;
  }

  async logout() {
    this.removeToken();
    this.removeUser();
  }

  async getProfile() {
    const response = await this.request('/profile');
    // Return the user data directly, not the wrapped response
    return response.user || response;
  }

  // Report methods
  async createReport(reportData) {
    const response = await this.request('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
    return response;
  }

  async getMyReports() {
    const response = await this.request('/reports/my');
    return response;
  }

  async getAllReports() {
    const response = await this.request('/reports');
    return response;
  }

  async getReport(reportId) {
    const response = await this.request(`/reports/${reportId}`);
    return response;
  }

  async updateReportStatus(reportId, status) {
    const response = await this.request(`/reports/${reportId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    return response;
  }

  async deleteReport(reportId) {
    const response = await this.request(`/reports/${reportId}`, {
      method: 'DELETE',
    });
    return response;
  }

  // User management methods (admin only)
  async getAllUsers() {
    const response = await this.request('/users');
    return response;
  }

  async updateUserRole(userId, role) {
    const response = await this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
    return response;
  }

  async deleteUser(userId) {
    const response = await this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
    return response;
  }

  // Application methods
  async createApplication(applicationData) {
    // Check if applicationData is FormData (contains files)
    if (applicationData instanceof FormData) {
      const token = this.getToken();
      const url = `${this.baseURL}/applications`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type for FormData, let browser set it with boundary
          },
          body: applicationData,
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            this.removeToken();
            this.removeUser();
            throw new Error('Session expired. Please login again.');
          }
          throw new Error(data.error || 'Failed to submit application');
        }

        return data;
      } catch (error) {
        console.error('Application Error:', error);
        throw error;
      }
    } else {
      // Handle JSON data (backward compatibility)
      const response = await this.request('/applications', {
        method: 'POST',
        body: JSON.stringify(applicationData),
      });
      return response;
    }
  }

  async getMyApplications() {
    const response = await this.request('/applications/my');
    return response;
  }

  async getAllApplications() {
    const response = await this.request('/applications');
    return response;
  }

  async getApplication(applicationId) {
    const response = await this.request(`/applications/${applicationId}`);
    return response;
  }

  async updateApplicationStatus(applicationId, status) {
    const response = await this.request(`/applications/${applicationId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    return response;
  }

  async deleteApplication(applicationId) {
    const response = await this.request(`/applications/${applicationId}`, {
      method: 'DELETE',
    });
    return response;
  }

  // Contact methods
  async createContact(contactData) {
    const response = await this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
    return response;
  }

  async getAllContacts() {
    const response = await this.request('/contacts');
    return response;
  }

  async getContact(contactId) {
    const response = await this.request(`/contacts/${contactId}`);
    return response;
  }

  async updateContactStatus(contactId, status) {
    const response = await this.request(`/contacts/${contactId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
    return response;
  }

  async updateContact(contactId, contactData) {
    const response = await this.request(`/contacts/${contactId}`, {
      method: 'PUT',
      body: JSON.stringify(contactData)
    });
    return response;
  }

  async deleteContact(contactId) {
    const response = await this.request(`/contacts/${contactId}`, {
      method: 'DELETE',
    });
    return response;
  }

  // Profile picture upload
  async uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.getToken();
    const url = `${this.baseURL}/upload-profile-picture`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      return data;
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }

  // Validate current token
  async validateToken() {
    try {
      const token = this.getToken();
      if (!token) {
        return false;
      }

      const response = await this.request('/profile');
      return !!response;
    } catch (error) {
      console.error('Token validation failed:', error);
      this.removeToken();
      this.removeUser();
      return false;
    }
  }

  // Check if user is admin
  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'admin';
  }

  // Check if user is moderator or admin
  isModeratorOrAdmin() {
    const user = this.getUser();
    return user && (user.role === 'moderator' || user.role === 'admin');
  }
}

// Create and export a single instance
const apiService = new ApiService();
export default apiService;
