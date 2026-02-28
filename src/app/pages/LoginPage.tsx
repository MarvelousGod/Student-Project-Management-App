import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../context/AuthContext";
import { User, Users, Shield } from "lucide-react";
import logoImage from "../../assets/GiggpallyLogo.png";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = login(email, password, selectedRole);
    if (success) {
      // Navigate based on role
      switch (selectedRole) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "writer":
          navigate("/writer/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
      }
    } else {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logoImage} alt="Gigg-Pailly" className="h-12" />
          </div>
          <p className="text-gray-600">
            Welcome back! Please login to continue.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Login as:
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole("student")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedRole === "student"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <User className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                <span className="text-xs font-medium block">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("writer")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedRole === "writer"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Users className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                <span className="text-xs font-medium block">Writer</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("admin")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedRole === "admin"
                    ? "border-orange-600 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Shield className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                <span className="text-xs font-medium block">Admin</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
