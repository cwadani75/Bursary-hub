import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import {
  Users,
  FileText,
  LogOut,
  Menu,
  X,
  Home,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  TrendingUp,
  UserCheck,
  Mail,
  Calendar,
  MapPin,
  DollarSign,
  GraduationCap,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  UserPlus
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    totalApplications: 0,
    pendingApplications: 0,
    totalContacts: 0
  });
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [expandedApplication, setExpandedApplication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
    loadDashboardData();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const user = apiService.getUser();
      if (!user || user.role !== 'admin') {
        navigate('/login');
        return;
      }
    } catch (error) {
      navigate('/login');
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load users
      const usersResponse = await apiService.getAllUsers();
      console.log('Users loaded:', usersResponse);
      setUsers(usersResponse.users || []);

      // Load reports
      const reportsResponse = await apiService.getAllReports();
      console.log('Reports loaded:', reportsResponse);
      setReports(reportsResponse.reports || []);

      // Load applications
      const applicationsResponse = await apiService.getAllApplications();
      console.log('Applications loaded:', applicationsResponse);
      setApplications(applicationsResponse.applications || []);

      // Load contacts
      const contactsResponse = await apiService.getAllContacts();
      console.log('Contacts loaded:', contactsResponse);
      setContacts(contactsResponse.contacts || []);

      // Calculate stats
      const totalUsers = usersResponse.users?.length || 0;
      const totalReports = reportsResponse.reports?.length || 0;
      const pendingReports = reportsResponse.reports?.filter(r => r.status === 'pending').length || 0;
      const resolvedReports = reportsResponse.reports?.filter(r => r.status === 'resolved').length || 0;
      const totalApplications = applicationsResponse.applications?.length || 0;
      const pendingApplications = applicationsResponse.applications?.filter(a => a.status === 'pending').length || 0;
      const totalContacts = contactsResponse.contacts?.length || 0;

      setStats({
        totalUsers,
        totalReports,
        pendingReports,
        resolvedReports,
        totalApplications,
        pendingApplications,
        totalContacts
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    apiService.logout();
    navigate('/login');
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await apiService.updateUserRole(userId, newRole);
      await loadDashboardData(); // Reload data
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiService.deleteUser(userId);
        await loadDashboardData(); // Reload data
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleUpdateReportStatus = async (reportId, newStatus) => {
    try {
      await apiService.updateReportStatus(reportId, newStatus);
      await loadDashboardData(); // Reload data
    } catch (error) {
      console.error('Error updating report status:', error);
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await apiService.deleteReport(reportId);
        await loadDashboardData(); // Reload data
      } catch (error) {
        console.error('Error deleting report:', error);
      }
    }
  };

  const handleUpdateApplicationStatus = async (applicationId, newStatus) => {
    try {
      await apiService.updateApplicationStatus(applicationId, newStatus);
      await loadDashboardData(); // Reload data
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await apiService.deleteApplication(applicationId);
        await loadDashboardData(); // Reload data
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        await apiService.deleteContact(contactId);
        await loadDashboardData(); // Reload data
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'reports', label: 'Manage Reports', icon: FileText },
    { id: 'contacts', label: 'Contact Messages', icon: FileText }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative text-center mb-8">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">Dashboard Overview</h2>
          <p className="text-indigo-100 text-xl max-w-3xl mx-auto leading-relaxed">Comprehensive insights into your bursary management system performance and user activity</p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          <div className="group bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">{stats.totalUsers}</div>
            <div className="text-indigo-100 text-sm font-medium">Total Users</div>
          </div>
          <div className="group bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">{stats.totalApplications}</div>
            <div className="text-indigo-100 text-sm font-medium">Applications</div>
          </div>
          <div className="group bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">{stats.pendingApplications}</div>
            <div className="text-indigo-100 text-sm font-medium">Pending Apps</div>
          </div>
          <div className="group bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">{stats.totalReports}</div>
            <div className="text-indigo-100 text-sm font-medium">Reports</div>
          </div>
          <div className="group bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">{stats.pendingReports}</div>
            <div className="text-indigo-100 text-sm font-medium">Pending Reports</div>
          </div>
          <div className="group bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">{stats.resolvedReports}</div>
            <div className="text-indigo-100 text-sm font-medium">Resolved</div>
          </div>
          <div className="group bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">{stats.totalContacts}</div>
            <div className="text-indigo-100 text-sm font-medium">Messages</div>
          </div>
        </div>
      </div>

      {/* Modern Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Total Users</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">{stats.totalUsers}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Total Reports</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">{stats.totalReports}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Pending Reports</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 dark:from-yellow-400 dark:to-yellow-600 bg-clip-text text-transparent">{stats.pendingReports}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Resolved Reports</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">{stats.resolvedReports}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Modern Recent Activity */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        <div className="p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Recent Activity</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Latest reports and system updates</p>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-400">Live Updates</span>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            {reports.slice(0, 5).map((report, index) => (
              <div key={report.id} className="group flex items-center justify-between p-6 bg-gray-50/50 dark:bg-gray-700/30 rounded-2xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 border border-transparent hover:border-gray-200/50 dark:hover:border-gray-600/50 hover:shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {report.title}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <UserCheck className="w-4 h-4 mr-1" />
                        {report.reporter_name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(report.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1.5 text-sm font-medium rounded-xl ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    report.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                    {report.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-8">
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">Manage Users</h2>
            <p className="text-indigo-100 text-lg">View and manage all registered users in the system</p>
          </div>
          <button className="group px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl hover:bg-white/30 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105">
            <UserPlus className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold text-lg">Add User</span>
          </button>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
            <thead className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-800/50">
              <tr>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-300 group">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{user.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                      className="text-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-4 py-2 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700"
                    >
                      <option value="student">Student</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-xl hover:bg-red-100/50 dark:hover:bg-red-900/30"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-8">
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">Manage Reports</h2>
            <p className="text-indigo-100 text-lg">Review and manage all submitted reports ({reports.length} reports loaded)</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={loadDashboardData}
              className="group px-6 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl hover:bg-white/30 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <RefreshCw className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-lg">Refresh</span>
            </button>
            <button className="group px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl hover:bg-white/30 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105">
              <FileText className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-lg">View All Reports</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              <tr>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Report</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Reporter</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-12 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                      <span className="ml-3 text-gray-600 dark:text-gray-400">Loading reports...</span>
                    </div>
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-12 text-center text-gray-500 dark:text-gray-400">
                    No reports found
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{report.title}</div>
                        <div className="text-gray-600 dark:text-gray-400 max-w-xs truncate">{report.description}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <Shield className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{report.reporter_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <select
                        value={report.status}
                        onChange={(e) => handleUpdateReportStatus(report.id, e.target.value)}
                        className="text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-gray-600 dark:text-gray-400">
                      {new Date(report.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-4 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Bursary Applications</h2>
            <p className="text-indigo-100">Review and manage all bursary applications</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <div className="text-indigo-100 text-sm">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.pendingApplications}</div>
              <div className="text-indigo-100 text-sm">Pending</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Institution</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Fee Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {applications.map((application) => (
                <React.Fragment key={application.id}>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <Shield className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {application.first_name} {application.last_name}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{application.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{application.institution}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{application.course}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      KES {application.fee_amount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={application.status}
                        onChange={(e) => handleUpdateApplicationStatus(application.id, e.target.value)}
                        className="text-xs border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600 dark:text-gray-400">
                      {new Date(application.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setExpandedApplication(expandedApplication === application.id ? null : application.id)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 px-3 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300"
                        >
                          {expandedApplication === application.id ? 'Hide' : 'View'} Details
                        </button>
                        <button
                          onClick={() => handleDeleteApplication(application.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Application Details */}
                  {expandedApplication === application.id && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {/* Personal Details */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm border-b border-gray-200 dark:border-gray-600 pb-2">
                              Personal Details
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Full Name:</span> {application.first_name} {application.last_name}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Email:</span> {application.email}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Phone:</span> {application.phone}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">ID Number:</span> {application.id_number}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Gender:</span> {application.gender}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Date of Birth:</span> {application.dob}</div>
                            </div>
                          </div>

                          {/* Location Details */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm border-b border-gray-200 dark:border-gray-600 pb-2">
                              Location
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">County:</span> {application.county}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Sub-County:</span> {application.sub_county}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Ward:</span> {application.ward}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Village:</span> {application.village}</div>
                            </div>
                          </div>

                          {/* Education Details */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm border-b border-gray-200 dark:border-gray-600 pb-2">
                              Education
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Institution:</span> {application.institution}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Course:</span> {application.course}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Year of Study:</span> {application.year_of_study}</div>
                            </div>
                          </div>

                          {/* Financial Details */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm border-b border-gray-200 dark:border-gray-600 pb-2">
                              Financial Information
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Fee Amount:</span> KES {application.fee_amount?.toLocaleString()}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Family Income:</span> KES {application.family_income?.toLocaleString()}</div>
                              <div><span className="font-medium text-gray-600 dark:text-gray-400">Reason:</span> {application.reason}</div>
                            </div>
                          </div>


                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Contact Messages</h2>
            <p className="text-indigo-100">View and manage all contact form submissions</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <div className="text-indigo-100 text-sm">Total Messages</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {contact.full_name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{contact.email}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">{contact.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{contact.subject}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                      {contact.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600 dark:text-gray-400">
                    {new Date(contact.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium">
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'applications':
        return renderApplications();
      case 'users':
        return renderUsers();
      case 'reports':
        return renderReports();
      case 'contacts':
        return renderContacts();
      default:
        return renderOverview();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Enhanced Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-in-out 
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 shadow-xl">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>
                <p className="text-indigo-100 text-xs">Bursary Management</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-1.5">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`
                      w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg
                      transition-all duration-200 ease-out
                      ${activeTab === item.id
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200 shadow-sm border border-indigo-100 dark:border-indigo-800'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-300'
                      }
                    `}
                  >
                    <Icon
                      className={`
                        w-5 h-5 mr-3 flex-shrink-0
                        ${activeTab === item.id
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-500 dark:text-gray-500'
                        }
                      `}
                    />
                    <span>{item.label}</span>
                    {activeTab === item.id && (
                      <span className="ml-auto w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className={`
                mt-3 w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium
                rounded-lg transition-all duration-200
                text-red-600 hover:bg-red-50 hover:text-red-700 
                dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300
              `}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-gray-600 dark:text-gray-400">
                Welcome, <span className="font-medium text-gray-900 dark:text-white">Admin</span>
              </div>
              <div className="h-9 w-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {renderContent()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;