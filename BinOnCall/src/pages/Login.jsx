import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = [];

    if (!formData.email) tempErrors.push("Email is required");
    if (!formData.password) tempErrors.push("Password is required");

    if (tempErrors.length > 0) {
      setErrors(tempErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem("binoncall_users")) || [];
    const user = users.find(
      (u) => u.email === formData.email.trim().toLowerCase()
    );

    if (!user) {
      setErrors(["Account does not exist. Please signup first."]);
      setSuccessMessage("");
      return;
    }

    if (user.password !== formData.password) {
      setErrors(["Incorrect password."]);
      setSuccessMessage("");
      return;
    }

    setErrors([]);
    setSuccessMessage(`Login successful! Welcome ${user.name}`);
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Optional: navigate to a dashboard or homepage
    // navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Login
        </h1>

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            <ul className="list-disc list-inside">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 font-medium">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
}
