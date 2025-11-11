import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [role, setRole] = useState("user"); // user or jobseeker
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState({});
  const [errors, setErrors] = useState([]);
  const [confirmation, setConfirmation] = useState("");
  const [saveGoogle, setSaveGoogle] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [e.target.name]: file.name });
      setPreview({ ...preview, [e.target.name]: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = [];

    // --- Validation rules ---
    if (!formData.name || formData.name.length < 3 || formData.name.length > 50)
      tempErrors.push("Full Name must be 3-50 characters long");

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
      tempErrors.push("Enter a valid email address");

    if (!formData.password || formData.password.length < 6 || formData.password.length > 20)
      tempErrors.push("Password must be 6-20 characters long");
    if (formData.password && !/\d/.test(formData.password))
      tempErrors.push("Password must contain at least 1 number");

    if (formData.password !== formData.confirmPassword)
      tempErrors.push("Passwords do not match");

    if (!formData.contact || !/^[0-9]{11}$/.test(formData.contact))
      tempErrors.push("Contact must be exactly 11 digits");

    if (!formData.cnic || !/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic))
      tempErrors.push("CNIC must be in format 12345-1234567-1");

    if (!formData.location || formData.location.length < 2 || formData.location.length > 50)
      tempErrors.push("Location must be 2-50 characters");

    if (!formData.idFront) tempErrors.push("ID Card Front is required");
    if (!formData.idBack) tempErrors.push("ID Card Back is required");

    if (role === "jobseeker") {
      if (!formData.profilePic) tempErrors.push("Profile picture is required");
      if (!formData.vehicle) tempErrors.push("Vehicle selection is required");
      if (!formData.availability) tempErrors.push("Availability is required");
      if (!formData.skills || formData.skills.length < 10)
        tempErrors.push("Experience / Skills must be at least 10 characters");
      if (!formData.bankAccount || !/^[0-9]{9,18}$/.test(formData.bankAccount))
        tempErrors.push("Bank account must be 9-18 digits");
    }

    if (tempErrors.length > 0) {
      setErrors(tempErrors);
      setConfirmation("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // --- Save to localStorage ---
    const users = JSON.parse(localStorage.getItem("binoncall_users")) || [];

    const emailLower = formData.email.trim().toLowerCase();

    // Check for duplicate email
    const existing = users.find((u) => u.email === emailLower);
    if (existing) {
      setErrors(["This email is already registered. Please login."]);
      setConfirmation("");
      return;
    }

    const updated = [...users, { ...formData, email: emailLower, role, saveGoogle }];
    localStorage.setItem("binoncall_users", JSON.stringify(updated));

    // Show confirmation
    setErrors([]);
    setConfirmation(
      `Signup successful! Welcome ${formData.name} (${emailLower}) as ${role}.`
    );
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Clear form
    setFormData({});
    setPreview({});
    setSaveGoogle(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Create an Account
        </h1>

        {/* Role Toggle */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setRole("user")}
            className={`px-4 py-2 rounded-lg font-medium ${
              role === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            User Signup
          </button>
          <button
            onClick={() => setRole("jobseeker")}
            className={`px-4 py-2 rounded-lg font-medium ${
              role === "jobseeker" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Job Seeker Signup
          </button>
        </div>

        {/* Display Errors */}
        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            <ul className="list-disc list-inside">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Confirmation */}
        {confirmation && (
          <div className="bg-green-100 text-green-800 p-3 rounded mb-4 flex justify-between items-center">
            <span>{confirmation}</span>
            <button
              onClick={() => setConfirmation("")}
              className="text-green-700 font-bold px-2"
            >
              X
            </button>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              placeholder="example@gmail.com"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Password / Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                placeholder="Re-enter password"
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact || ""}
              placeholder="03XXXXXXXXX"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* CNIC */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">CNIC / ID Number</label>
            <input
              type="text"
              name="cnic"
              value={formData.cnic || ""}
              placeholder="37201-1234567-8"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">Current Location</label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              placeholder="Enter your city or allow location access"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Upload ID Front/Back */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium">ID Card Front</label>
              <input
                type="file"
                name="idFront"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              {preview.idFront && <img src={preview.idFront} alt="Front" className="mt-2 w-24 rounded" />}
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">ID Card Back</label>
              <input
                type="file"
                name="idBack"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              {preview.idBack && <img src={preview.idBack} alt="Back" className="mt-2 w-24 rounded" />}
            </div>
          </div>

          {/* Job Seeker Fields */}
          {role === "jobseeker" && (
            <>
              <div>
                <label className="block text-gray-600 text-sm font-medium">Profile Picture</label>
                <input
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
                {preview.profilePic && <img src={preview.profilePic} alt="Profile" className="mt-2 w-24 rounded-full" />}
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium">Vehicle Type</label>
                <select
                  name="vehicle"
                  value={formData.vehicle || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                >
                  <option value="">Select Vehicle</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Rickshaw">Rickshaw</option>
                  <option value="Pickup Van">Pickup Van</option>
                  <option value="Truck">Truck</option>
                  <option value="None">None</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium">Availability</label>
                <select
                  name="availability"
                  value={formData.availability || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                >
                  <option value="">Select Availability</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Occasional">Occasional</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium">Experience / Skills</label>
                <textarea
                  name="skills"
                  value={formData.skills || ""}
                  placeholder="Describe your experience or skills"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium">Bank Account Number</label>
                <input
                  type="text"
                  name="bankAccount"
                  value={formData.bankAccount || ""}
                  placeholder="Enter your bank account for payment"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
            </>
          )}

          {/* Save to Google */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="saveGoogle"
              checked={saveGoogle}
              onChange={(e) => setSaveGoogle(e.target.checked)}
            />
            <label className="text-gray-600 text-sm font-medium">Save information for Google login</label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
