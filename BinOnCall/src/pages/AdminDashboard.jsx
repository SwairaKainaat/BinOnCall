import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [pickups, setPickups] = useState([]);
  const [users, setUsers] = useState([]);
  const [collectors, setCollectors] = useState([
    { id: 1, name: "Ali Raza", area: "Lahore" },
    { id: 2, name: "Fatima Khan", area: "Islamabad" },
    { id: 3, name: "Hassan Malik", area: "Karachi" },
  ]);

  // Load data from localStorage
  useEffect(() => {
    const savedPickups =
      JSON.parse(localStorage.getItem("binoncall_pickups")) || [];
    const savedUsers = JSON.parse(localStorage.getItem("binoncall_users")) || [];
    setPickups(savedPickups);
    setUsers(savedUsers);
  }, []);

  // Assign collector to a pickup
  const assignJob = (index, collectorName) => {
    const updated = [...pickups];
    updated[index].assignedTo = collectorName;
    updated[index].status = "Assigned";
    setPickups(updated);
    localStorage.setItem("binoncall_pickups", JSON.stringify(updated));
  };

  // Change status manually
  const updateStatus = (index, status) => {
    const updated = [...pickups];
    updated[index].status = status;
    setPickups(updated);
    localStorage.setItem("binoncall_pickups", JSON.stringify(updated));
  };

  // Summary stats
  const totalPickups = pickups.length;
  const totalUsers = users.length;
  const assignedJobs = pickups.filter((p) => p.status === "Assigned").length;
  const completedJobs = pickups.filter((p) => p.status === "Completed").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
        🧹 BinOnCall Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-green-100 p-4 rounded-2xl shadow text-center">
          <p className="text-gray-600">Total Visitors / Users</p>
          <h2 className="text-2xl font-bold text-green-700">{totalUsers}</h2>
        </div>

        <div className="bg-blue-100 p-4 rounded-2xl shadow text-center">
          <p className="text-gray-600">Total Pickup Requests</p>
          <h2 className="text-2xl font-bold text-blue-700">{totalPickups}</h2>
        </div>

        <div className="bg-yellow-100 p-4 rounded-2xl shadow text-center">
          <p className="text-gray-600">Assigned Jobs</p>
          <h2 className="text-2xl font-bold text-yellow-700">{assignedJobs}</h2>
        </div>

        <div className="bg-purple-100 p-4 rounded-2xl shadow text-center">
          <p className="text-gray-600">Completed Jobs</p>
          <h2 className="text-2xl font-bold text-purple-700">
            {completedJobs}
          </h2>
        </div>
      </div>

      {/* Manage Pickups Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">🗑️ Manage Pickup Requests</h2>
        {pickups.length === 0 ? (
          <p className="text-gray-500">No pickup requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2">#</th>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">Waste Type</th>
                  <th className="border px-3 py-2">Amount</th>
                  <th className="border px-3 py-2">Location</th>
                  <th className="border px-3 py-2">Status</th>
                  <th className="border px-3 py-2">Assigned To</th>
                  <th className="border px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pickups.map((p, i) => (
                  <tr key={i}>
                    <td className="border px-3 py-2 text-center">{i + 1}</td>
                    <td className="border px-3 py-2">{p.name}</td>
                    <td className="border px-3 py-2">{p.wasteType}</td>
                    <td className="border px-3 py-2">{p.amount} kg</td>
                    <td className="border px-3 py-2">{p.locationDesc}</td>
                    <td
                      className={`border px-3 py-2 font-semibold ${
                        p.status === "Completed"
                          ? "text-green-600"
                          : p.status === "Assigned"
                          ? "text-yellow-600"
                          : p.status === "Rejected"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {p.status || "Pending"}
                    </td>

                    {/* Assign Collector */}
                    <td className="border px-3 py-2">
                      <select
                        className="border p-1 rounded w-full"
                        value={p.assignedTo || ""}
                        onChange={(e) => assignJob(i, e.target.value)}
                      >
                        <option value="">Select Collector</option>
                        {collectors.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name} — {c.area}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Status Buttons */}
                    <td className="border px-3 py-2 text-center space-x-1">
                      <button
                        className="bg-yellow-400 text-white px-2 py-1 rounded text-xs"
                        onClick={() => updateStatus(i, "Pending")}
                      >
                        Pending
                      </button>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                        onClick={() => updateStatus(i, "Completed")}
                      >
                        Complete
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                        onClick={() => updateStatus(i, "Rejected")}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
