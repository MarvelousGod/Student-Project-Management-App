import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockWriterApplications, mockProjects, mockWriters, WriterApplication } from '../data/mockData';
import { LogOut, Users, FileText, TrendingUp, Check, X, Clock } from 'lucide-react';
import logoImage from 'figma:asset/79fc6ef2d604510a2608875490c760ec78962e5e.png';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState<WriterApplication[]>(mockWriterApplications);
  const [activeTab, setActiveTab] = useState<'applications' | 'writers' | 'projects'>('applications');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleApprove = (applicationId: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId ? { ...app, status: 'approved' as const } : app
      )
    );
  };

  const handleReject = (applicationId: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId ? { ...app, status: 'rejected' as const } : app
      )
    );
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedWriters = mockWriters.length;
  const totalProjects = mockProjects.length;
  const activeProjects = mockProjects.filter(p => p.status === 'in-progress').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logoImage} alt="Gigg-Pailly" className="h-10" />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Logged in as</div>
                <div className="font-medium text-gray-900">{user?.name}</div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Pending Applications</div>
                <div className="text-3xl font-bold text-orange-600 mt-1">
                  {pendingApplications.length}
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Approved Writers</div>
                <div className="text-3xl font-bold text-green-600 mt-1">{approvedWriters}</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Total Projects</div>
                <div className="text-3xl font-bold text-blue-600 mt-1">{totalProjects}</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Active Projects</div>
                <div className="text-3xl font-bold text-purple-600 mt-1">{activeProjects}</div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === 'applications'
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Writer Applications
                {pendingApplications.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full text-xs">
                    {pendingApplications.length}
                  </span>
                )}
                {activeTab === 'applications' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('writers')}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === 'writers'
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Approved Writers
                {activeTab === 'writers' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === 'projects'
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Projects
                {activeTab === 'projects' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                {applications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No applications found
                  </div>
                ) : (
                  applications.map((app) => (
                    <div
                      key={app.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                app.status === 'approved'
                                  ? 'bg-green-100 text-green-700'
                                  : app.status === 'rejected'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </div>
                          <div className="text-gray-600 mb-2">{app.email}</div>
                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-700">Expertise: </span>
                            <span className="text-sm text-gray-600">
                              {app.expertise.join(', ')}
                            </span>
                          </div>
                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-700">Experience: </span>
                            <span className="text-sm text-gray-600">{app.experience}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Applied on {new Date(app.appliedDate).toLocaleDateString()}
                          </div>
                        </div>
                        {app.status === 'pending' && (
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleApprove(app.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(app.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                            >
                              <X className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Writers Tab */}
            {activeTab === 'writers' && (
              <div className="grid md:grid-cols-2 gap-4">
                {mockWriters.map((writer) => (
                  <div
                    key={writer.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={writer.avatar}
                        alt={writer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {writer.name}
                        </h3>
                        <div className="text-sm text-gray-600 mb-2">{writer.email}</div>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-medium">{writer.rating}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {writer.completedProjects} projects
                          </div>
                          <div className="text-sm text-green-600 font-medium">
                            ${writer.earnings.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {writer.expertise.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                {mockProjects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {project.title}
                        </h3>
                        <div className="text-sm text-gray-600">{project.description}</div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          project.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : project.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Student: </span>
                        <span className="font-medium">{project.studentName}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Writer: </span>
                        <span className="font-medium">{project.writerName || 'Unassigned'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Deadline: </span>
                        <span className="font-medium">
                          {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Payment: </span>
                        <span className="font-medium text-green-600">
                          ${project.payment}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};