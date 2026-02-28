import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockWriters, getWriterProjects } from "../data/mockData";
import {
  LogOut,
  DollarSign,
  Star,
  FileText,
  TrendingUp,
  Edit,
  Mail,
  Briefcase,
} from "lucide-react";
import logoImage from "../../assets/GiggpallyLogo.png";

export const WriterDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "projects" | "earnings"
  >("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Mock writer data (in real app, this would come from user ID)
  const writerData = mockWriters[0];
  const writerProjects = getWriterProjects(writerData.id);
  const completedProjects = writerProjects.filter(
    (p) => p.status === "completed",
  );

  const [profileData, setProfileData] = useState({
    bio: writerData.bio,
    expertise: writerData.expertise,
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    // In real app, this would save to backend
  };

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
                <div className="text-sm text-gray-600">Welcome back</div>
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
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Total Earnings</div>
                <div className="text-3xl font-bold mt-1">
                  ${writerData.earnings.toLocaleString()}
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Completed Projects</div>
                <div className="text-3xl font-bold text-blue-600 mt-1">
                  {writerData.completedProjects}
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
                <div className="text-sm text-gray-600">Average Rating</div>
                <div className="text-3xl font-bold text-yellow-600 mt-1">
                  {writerData.rating}
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Active Projects</div>
                <div className="text-3xl font-bold text-purple-600 mt-1">
                  {
                    writerProjects.filter((p) => p.status === "in-progress")
                      .length
                  }
                </div>
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
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === "overview"
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Overview
                {activeTab === "overview" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === "profile"
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Profile
                {activeTab === "profile" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === "projects"
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Projects
                {activeTab === "projects" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("earnings")}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === "earnings"
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Earnings
                {activeTab === "earnings" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {writerProjects.slice(0, 3).map((project) => (
                      <div
                        key={project.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {project.title}
                            </h4>
                            <div className="text-sm text-gray-600 mb-2">
                              Student: {project.studentName}
                            </div>
                            <div className="flex items-center gap-4">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  project.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {project.status}
                              </span>
                              {project.rating && (
                                <div className="flex items-center gap-1 text-sm">
                                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                  <span className="font-medium">
                                    {project.rating}
                                  </span>
                                </div>
                              )}
                              <span className="text-sm text-green-600 font-medium">
                                ${project.payment}
                              </span>
                            </div>
                          </div>
                          {project.status === "in-progress" && (
                            <div className="ml-4">
                              <div className="text-sm text-gray-600 mb-1">
                                Progress
                              </div>
                              <div className="w-32">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-blue-600 rounded-full"
                                    style={{ width: `${project.progress}%` }}
                                  />
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                  {project.progress}%
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="max-w-3xl">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={writerData.avatar}
                      alt={writerData.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {writerData.name}
                      </h3>
                      <div className="flex items-center gap-1 text-yellow-500 mt-1">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-semibold">
                          {writerData.rating}
                        </span>
                        <span className="text-gray-600 ml-1">
                          ({writerData.completedProjects} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5" />
                    <span>{writerData.email}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Briefcase className="w-5 h-5" />
                    <span>
                      Joined{" "}
                      {new Date(writerData.joinedDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Bio</h4>
                    {isEditingProfile ? (
                      <textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bio: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-700">{profileData.bio}</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Areas of Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {profileData.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      * Your profile is visible to students when they browse
                      writers
                    </p>
                  </div>

                  {isEditingProfile && (
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingProfile(false);
                          setProfileData({
                            bio: writerData.bio,
                            expertise: writerData.expertise,
                          });
                        }}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
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
                          <p className="text-gray-600 mb-3">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <span className="text-gray-600">Student: </span>
                              <span className="font-medium">
                                {project.studentName}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Completed: </span>
                              <span className="font-medium">
                                {new Date(
                                  project.deadline,
                                ).toLocaleDateString()}
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
                      </div>
                      {project.rating && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900">
                              Client Rating:
                            </span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < project.rating!
                                      ? "fill-yellow-500 text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-1 font-semibold">
                                {project.rating}
                              </span>
                            </div>
                          </div>
                          {project.review && (
                            <p className="text-gray-700 italic">
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

            {/* Earnings Tab */}
            {activeTab === "earnings" && (
              <div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-xl text-white mb-8">
                  <div className="text-sm opacity-90 mb-2">
                    Total Earnings (USD)
                  </div>
                  <div className="text-5xl font-bold mb-4">
                    ${writerData.earnings.toLocaleString()}
                  </div>
                  <div className="text-sm opacity-90">
                    From {writerData.completedProjects} completed projects
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Earnings Breakdown
                </h3>
                <div className="space-y-3">
                  {completedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between border border-gray-200 rounded-lg p-4"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {project.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(project.deadline).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">
                          +${project.payment}
                        </div>
                        {project.rating && (
                          <div className="flex items-center gap-1 justify-end">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm">{project.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
