import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyAccount() {
  const [user, setUser] = useState(null);
  const [pickupRequests, setPickupRequests] = useState([]);
  const [assignedJobs, setAssignedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem("binoncall_currentUser"));
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);

    // Load pickup requests for regular users
    if (currentUser.role === "user") {
      const allRequests = JSON.parse(localStorage.getItem("binoncall_pickups")) || [];
      const userRequests = allRequests.filter(req => req.userEmail === currentUser.email);
      setPickupRequests(userRequests);
    }

    // Load assigned jobs for jobseekers
    if (currentUser.role === "jobseeker") {
      const allJobs = JSON.parse(localStorage.getItem("binoncall_assignedJobs")) || [];
      const jobsForUser = allJobs.filter(job => job.jobseekerEmail === currentUser.email);
      setAssignedJobs(jobsForUser);
    }

    // Scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("binoncall_currentUser");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-green-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          My Account
        </h1>

        {/* User Info */}
        <div className="space-y-4 mb-6">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact:</strong> {user.contact}</p>
          <p><strong>CNIC:</strong> {user.cnic}</p>
          <p><strong>Location:</strong> {user.location}</p>
          {user.bankAccount && <p><strong>Bank Account:</strong> {user.bankAccount}</p>}
          {user.role === "jobseeker" && user.vehicle && <p><strong>Vehicle:</strong> {user.vehicle}</p>}
          {user.role === "jobseeker" && user.availability && <p><strong>Availability:</strong> {user.availability}</p>}
          {user.role === "jobseeker" && user.skills && <p><strong>Skills:</strong> {user.skills}</p>}
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {user.idFront && (
            <div>
              <p className="text-sm text-gray-500">ID Front</p>
              <img src={user.idFront} alt="ID Front" className="w-full rounded" />
            </div>
          )}
          {user.idBack && (
            <div>
              <p className="text-sm text-gray-500">ID Back</p>
              <img src={user.idBack} alt="ID Back" className="w-full rounded" />
            </div>
          )}
          {user.profilePic && (
            <div>
              <p className="text-sm text-gray-500">Profile Picture</p>
              <img src={user.profilePic} alt="Profile" className="w-full rounded-full" />
            </div>
          )}
        </div>

        {/* Pickup Requests for Users */}
        {user.role === "user" && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">My Pickup Requests</h2>
            {pickupRequests.length > 0 ? (
              <ul className="space-y-2">
                {pickupRequests.map((req, idx) => (
                  <li key={idx} className="border p-3 rounded-lg bg-green-50">
                    <p><strong>Pickup ID:</strong> {req.id}</p>
                    <p><strong>Item:</strong> {req.item}</p>
                    <p><strong>Status:</strong> {req.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No pickup requests yet.</p>
            )}
          </div>
        )}

        {/* Assigned Jobs for Jobseekers */}
        {user.role === "jobseeker" && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Assigned Jobs</h2>
            {assignedJobs.length > 0 ? (
              <ul className="space-y-2">
                {assignedJobs.map((job, idx) => (
                  <li key={idx} className="border p-3 rounded-lg bg-green-50">
                    <p><strong>Job ID:</strong> {job.id}</p>
                    <p><strong>Pickup Location:</strong> {job.pickupLocation}</p>
                    <p><strong>Item:</strong> {job.item}</p>
                    <p><strong>Status:</strong> {job.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No jobs assigned yet.</p>
            )}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
