import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getStudentProjects, mockWriters } from '../data/mockData';
import {
  LogOut,
  FileText,
  Clock,
  CheckCircle,
  Star,
  Plus,
  Search,
} from 'lucide-react';
import logoImage from 'figma:asset/79fc6ef2d604510a2608875490c760ec78962e5e.png';

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'writers' | 'new'>('projects');
  const [selectedWriter, setSelectedWriter] = useState<string | null>(null);

  // Mock student ID
  const studentProjects = getStudentProjects('s1');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeProjects = studentProjects.filter((p) => p.status === 'in-progress');
  const completedProjects = studentProjects.filter((p) => p.status === 'completed');
  const pendingProjects = studentProjects.filter((p) => p.status === 'pending');

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
                <div className="text-sm text-gray-600">Welcome</div>
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
                <div className="text-sm text-gray-600">Total Projects</div>
                <div className="text-3xl font-bold text-blue-600 mt-1">
                  {studentProjects.length}
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">In Progress</div>
                <div className="text-3xl font-bold text-orange-600 mt-1">
                  {activeProjects.length}
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
                <div className="text-sm text-gray-600">Completed</div>
                <div className="text-3xl font-bold text-green-600 mt-1">
                  {completedProjects.length}
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Pending</div>
                <div className="text-3xl font-bold text-gray-600 mt-1">
                  {pendingProjects.length}
                </div>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === 'projects' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Projects
                {activeTab === 'projects' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('writers')}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === 'writers' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Browse Writers
                {activeTab === 'writers' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`px-6 py-4 font-medium transition-colors relative flex items-center gap-2 ${
                  activeTab === 'new' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Plus className="w-4 h-4" />
                New Project
                {activeTab === 'new' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* My Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                {/* Active Projects */}
                {activeProjects.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Active Projects ({activeProjects.length})
                    </h3>
                    <div className="space-y-4">
                      {activeProjects.map((project) => (
                        <div
                          key={project.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                {project.title}
                              </h4>
                              <p className="text-gray-600 mb-3">{project.description}</p>
                              <div className="flex items-center gap-6 text-sm">
                                <div>
                                  <span className="text-gray-600">Writer: </span>
                                  <span className="font-medium">{project.writerName}</span>
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
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium whitespace-nowrap ml-4">
                              In Progress
                            </span>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">
                                Progress
                              </span>
                              <span className="text-sm font-medium text-blue-600">
                                {project.progress}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full transition-all"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed Projects */}
                {completedProjects.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Completed Projects ({completedProjects.length})
                    </h3>
                    <div className="space-y-4">
                      {completedProjects.map((project) => (
                        <div
                          key={project.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                {project.title}
                              </h4>
                              <p className="text-gray-600 mb-3">{project.description}</p>
                              <div className="flex items-center gap-6 text-sm">
                                <div>
                                  <span className="text-gray-600">Writer: </span>
                                  <span className="font-medium">{project.writerName}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Completed: </span>
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
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium whitespace-nowrap ml-4">
                              Completed
                            </span>
                          </div>
                          {project.rating && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">
                                  Your Rating:
                                </span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < project.rating!
                                          ? 'fill-yellow-500 text-yellow-500'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-1 font-semibold">{project.rating}</span>
                                </div>
                              </div>
                              {project.review && (
                                <p className="text-sm text-gray-700 mt-2 italic">
                                  "{project.review}"
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {studentProjects.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p>No projects yet. Create your first project to get started!</p>
                  </div>
                )}
              </div>
            )}

            {/* Browse Writers Tab */}
            {activeTab === 'writers' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Available Writers
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {mockWriters.map((writer) => (
                    <div
                      key={writer.id}
                      className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                        selectedWriter === writer.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 bg-white'
                      }`}
                      onClick={() => setSelectedWriter(writer.id)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={writer.avatar}
                          alt={writer.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {writer.name}
                          </h4>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              <span className="font-medium">{writer.rating}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {writer.completedProjects} projects
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{writer.bio}</p>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          Expertise:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {writer.expertise.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Project Tab */}
            {activeTab === 'new' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Create New Project
                </h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Research Paper on Climate Change"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Area *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select a subject</option>
                      <option value="cs">Computer Science</option>
                      <option value="math">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="business">Business</option>
                      <option value="literature">Literature</option>
                      <option value="history">History</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={5}
                      placeholder="Provide detailed requirements for your project..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deadline *
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget (USD) *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 150"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      After submitting, writers will be able to apply for your project. You
                      can review their profiles and select the best match.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Create Project
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};