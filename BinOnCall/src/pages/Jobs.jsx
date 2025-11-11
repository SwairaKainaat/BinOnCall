// Jobs.jsx
import React, { useEffect, useState } from "react";
import { get as idbGet, del as idbDel } from "idb-keyval";

/*
  Jobs.jsx
  - Reads job list from localStorage 'binoncall_pickups'
  - Loads screenshot blob from idb-keyval key `screenshot:<id>` and creates object URL
  - Allows claiming/unclaiming/completing jobs (updates metadata in localStorage)
*/

function safeReadJobsFromLocalStorage() {
  try {
    const raw = localStorage.getItem("binoncall_pickups");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    console.warn("Failed to parse binoncall_pickups", err);
    return [];
  }
}

function safeWriteJobsToLocalStorage(jobs) {
  try {
    localStorage.setItem("binoncall_pickups", JSON.stringify(jobs));
    return true;
  } catch (err) {
    console.error("Failed to save jobs to localStorage", err);
    // attempt a trimmed fallback (keep newest 100)
    try {
      const trimmed = jobs.slice(0, 100);
      localStorage.setItem("binoncall_pickups", JSON.stringify(trimmed));
      return true;
    } catch (err2) {
      console.error("Failed to save trimmed jobs", err2);
      return false;
    }
  }
}

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [screenshotUrls, setScreenshotUrls] = useState({}); // id -> objectURL|null
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | unassigned | assigned | pending | accepted | completed
  const [collectorName, setCollectorName] = useState(""); // used when claiming

  // load jobs on mount
  useEffect(() => {
    setLoading(true);
    const j = safeReadJobsFromLocalStorage();
    setJobs(j);
    setLoading(false);
  }, []);

  // whenever jobs change, load any missing screenshot blobs from idb
  useEffect(() => {
    let isActive = true;
    async function loadScreens() {
      const toLoad = jobs.filter(s => s && s.id && screenshotUrls[s.id] === undefined);
      if (toLoad.length === 0) return;
      for (const s of toLoad) {
        const key = `screenshot:${s.id}`;
        try {
          const blob = await idbGet(key);
          if (!isActive) return;
          if (blob instanceof Blob) {
            const url = URL.createObjectURL(blob);
            setScreenshotUrls(prev => ({ ...prev, [s.id]: url }));
          } else {
            setScreenshotUrls(prev => ({ ...prev, [s.id]: null }));
          }
        } catch (err) {
          console.warn("idb get error for", key, err);
          if (!isActive) return;
          setScreenshotUrls(prev => ({ ...prev, [s.id]: null }));
        }
      }
    }
    loadScreens();
    return () => { isActive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs]);

  // helper to update a job locally and persist
  const updateJob = (id, patch) => {
    setJobs(prev => {
      const updated = prev.map(j => (j.id === id ? { ...j, ...patch } : j));
      safeWriteJobsToLocalStorage(updated);
      return updated;
    });
  };

  // claim job as a collectorName
  const claimJob = (id, name) => {
    if (!name || name.trim().length === 0) {
      alert("Enter your name to claim a job."); // quick feedback; you can replace with UI later
      return;
    }
    updateJob(id, { assignedTo: name.trim(), status: "Accepted" });
  };

  // unassign (admin/dev)
  const unassignJob = (id) => {
    updateJob(id, { assignedTo: null, status: "Pending" });
  };

  // mark completed
  const completeJob = (id) => {
    updateJob(id, { status: "Completed" });
  };

  // reject job
  const rejectJob = (id) => {
    updateJob(id, { status: "Rejected" });
  };

  // remove job (also remove screenshot blob in IndexedDB)
  const removeJob = async (id) => {
    const keep = jobs.filter(j => j.id !== id);
    setJobs(keep);
    safeWriteJobsToLocalStorage(keep);

    // cleanup idb screenshot
    try {
      await idbDel(`screenshot:${id}`);
      setScreenshotUrls(prev => {
        const c = { ...prev };
        if (c[id]) URL.revokeObjectURL(c[id]);
        delete c[id];
        return c;
      });
    } catch (err) {
      console.warn("Failed to remove screenshot from IDB", err);
    }
  };

  // filtered list
  const filtered = jobs.filter(j => {
    if (!j) return false;
    if (filter === "all") return true;
    if (filter === "unassigned") return !j.assignedTo;
    if (filter === "assigned") return !!j.assignedTo;
    if (filter === "pending") return j.status === "Pending";
    if (filter === "accepted") return j.status === "Accepted";
    if (filter === "completed") return j.status === "Completed";
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Jobs / Collector Requests</h1>

      <div className="flex gap-3 items-center mb-4">
        <label className="text-sm">Filter:</label>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border rounded px-2 py-1">
          <option value="all">All</option>
          <option value="unassigned">Unassigned</option>
          <option value="assigned">Assigned</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="completed">Completed</option>
        </select>

        <div className="ml-auto flex items-center gap-2">
          <input
            placeholder="Your collector name (for claim)"
            value={collectorName}
            onChange={e => setCollectorName(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={() => {
              // quick refresh (re-read localStorage)
              const j = safeReadJobsFromLocalStorage();
              setJobs(j);
            }}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-sm text-gray-600">No jobs matching the filter.</div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((s) => (
            <div key={s.id} className="bg-white rounded-lg shadow p-4 flex gap-4 items-start">
              {/* left: text content */}
              <div style={{ flex: 1 }}>
                <div className="flex items-start gap-3">
                  <div>
                    <div className="font-semibold text-lg">{s.name}</div>
                    <div className="text-xs text-gray-500">CNIC: {s.cnic}</div>
                  </div>

                  <div className="ml-auto text-right">
                    <div>
                      <span
                        className={
                          "px-2 py-1 rounded-full text-xs font-semibold " +
                          (s.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                           s.status === "Accepted" ? "bg-green-100 text-green-800" :
                           s.status === "Completed" ? "bg-blue-100 text-blue-800" :
                           "bg-red-100 text-red-800")
                        }
                      >
                        {s.status || "Pending"}
                      </span>
                    </div>
                    <div className="text-xs mt-1 text-gray-600">{s.assignedTo ? `Assigned: ${s.assignedTo}` : "Unassigned"}</div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                  <div><strong>Contact:</strong> {s.contact}</div>
                  <div><strong>Location:</strong> {s.locationDesc || (s.location ? `${s.location.lat?.toFixed?.(5)}, ${s.location.lng?.toFixed?.(5)}` : "")}</div>
                  <div><strong>Waste:</strong> {s.wasteType}</div>
                  <div><strong>Amount:</strong> {s.amount} kg — PKR {s.price}</div>
                  <div><strong>Payment:</strong> {s.paymentMethod} — {s.paymentNumber}</div>
                  <div className="col-span-full text-xs text-gray-500">Submitted: {s.createdAt ? new Date(s.createdAt).toLocaleString() : "-"}</div>
                </div>

                <div className="mt-3 flex gap-2 items-center">
                  {/* Claim button */}
                  <button
                    onClick={() => claimJob(s.id, collectorName || "Unknown Collector")}
                    className="px-3 py-1 rounded bg-green-600 text-white text-xs"
                    title="Claim this job (assign to yourself)"
                  >
                    Claim
                  </button>

                  {/* Unassign */}
                  <button onClick={() => unassignJob(s.id)} className="px-3 py-1 rounded bg-gray-100 text-xs">
                    Unassign
                  </button>

                  {/* Complete */}
                  <button onClick={() => completeJob(s.id)} className="px-3 py-1 rounded bg-blue-100 text-xs">
                    Mark Completed
                  </button>

                  {/* Reject */}
                  <button onClick={() => rejectJob(s.id)} className="px-3 py-1 rounded bg-red-100 text-xs">
                    Reject
                  </button>

                  {/* Remove (dev) */}
                  <button onClick={() => { if (confirm("Remove job permanently?")) removeJob(s.id); }} className="px-3 py-1 rounded bg-red-600 text-white text-xs">
                    Remove
                  </button>
                </div>
              </div>

              {/* right: screenshot image */}
              <div style={{ width: 220, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {screenshotUrls[s.id] ? (
                  <img src={screenshotUrls[s.id]} alt={`screenshot-${s.id}`} style={{ width: 200, height: 140, objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb" }} />
                ) : (
                  <div style={{ width: 200, height: 140, borderRadius: 8, border: "1px dashed #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: 12 }}>
                    No screenshot
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
