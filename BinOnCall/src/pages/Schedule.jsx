 // Schedule.jsx
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { set as idbSet, get as idbGet, del as idbDel } from "idb-keyval";
import pickupBg from "../assets/logo.png";

// Fix leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const PAYMENT_DETAILS = {
  easypaisa: { label: "Easypaisa / JazzCash", value: "0345-0000000 (BinOnCall Waste Service)" },
  bank: { label: "Meezan Bank", value: "1234567890 – BinOnCall Pvt. Ltd." },
};

const PRICE_TABLE = {
  "General": 50,
  "Recyclables (Paper/Plastic)": 40,
  "Glass": 45,
  "Electronics": 60,
  "Medical / Hazardous": 80,
  "Construction / Debris": 30,
  "Organic / Food Waste": 35,
  "Bulk Items (Furniture)": 70,
  "Garden Waste": 40,
  "Other": 50,
};

const AMOUNT_OPTIONS = {
  "General": ["0.5","1","2","5","10","20"],
  "Recyclables (Paper/Plastic)": ["0.5","1","2","5","10"],
  "Glass": ["1","2","5","10"],
  "Electronics": ["1","2","5"],
  "Medical / Hazardous": ["1","2","5"],
  "Construction / Debris": ["5","10","20","50"],
  "Organic / Food Waste": ["1","2","5","10"],
  "Bulk Items (Furniture)": ["1","5","10","20"],
  "Garden Waste": ["1","2","5","10"],
  "Other": ["0.5","1","2","5","10"]
};

function formatCnicInput(value) {
  const digits = value.replace(/\D/g, "").slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0,5)}-${digits.slice(5)}`;
  return `${digits.slice(0,5)}-${digits.slice(5,12)}-${digits.slice(12)}`;
}

function validPakistanPhone(value) {
  const v = value.trim();
  return /^(\+92|0|92)?3\d{9}$/.test(v);
}

function validCnic(value) {
  const digits = value.replace(/\D/g, "");
  return /^\d{13}$/.test(digits);
}

/* ----------------------------
   Payment helpers (method-aware)
   ---------------------------- */

/** return digits-only string */
function digitsOnly(value) {
  if (!value) return "";
  return value.replace(/\D/g, "");
}

/**
 * Validate payment number based on selected payment method
 * - method: "Easypaisa" | "JazzCash" | "Bank Transfer"
 * - value: the user-entered string (may be formatted)
 *
 * Returns true if valid for that method.
 */
function isValidPaymentForMethod(method, value) {
  const d = digitsOnly(value);

  if (!d) return false;

  if (method === "Easypaisa" || method === "JazzCash") {
    // require Pakistan mobile starting with 03 and total 11 digits (03xxxxxxxxx)
    return /^03\d{9}$/.test(d);
  }

  if (method === "Bank Transfer") {
    // bank account numbers: 8..20 digits
    return /^\d{8,20}$/.test(d);
  }

  // fallback: allow either mobile (11 digits starting 03) or bank 8-20 digits
  return /^03\d{9}$/.test(d) || /^\d{8,20}$/.test(d);
}

/**
 * Format payment input for display:
 * - If looks like Pakistan mobile (03 or 92...), format as 03xx-xxxxxxx or +92-3xx-xxxxxxx
 * - Otherwise return digits (bank account), possibly truncated by maxLen if provided.
 */
function formatPaymentInputDisplay(raw, method) {
  if (!raw) return "";
  // keep + only if first char is +
  const plus = raw.trim().startsWith("+") ? "+" : "";
  const cleaned = (plus ? plus : "") + raw.replace(/[^\d]/g, "");
  // remove plus for digit ops
  const cleanedDigits = cleaned.replace(/\D/g, "");

  // If method is Easypaisa/JazzCash, we prefer 03xxxxxxxxx format (11 digits)
  if (method === "Easypaisa" || method === "JazzCash") {
    // handle inputs that may be 92-prefixed: convert 92... to 03...
    if (cleanedDigits.startsWith("92") && cleanedDigits.length >= 12) {
      const next = cleanedDigits.slice(2); // should be 3xxxxxxxxx
      if (next.startsWith("3") && next.length >= 11) {
        return `+92-${next.slice(0,3)}-${next.slice(3,10)}`;
      }
    }
    // if starts with 03 and length >= 11
    if (cleanedDigits.startsWith("03") && cleanedDigits.length >= 11) {
      const part1 = cleanedDigits.slice(0, 4); // 03xx
      const part2 = cleanedDigits.slice(4, 11); // 7 digits
      return `${part1}-${part2}`;
    }
    // partial formatting while typing
    if (cleanedDigits.startsWith("03")) {
      if (cleanedDigits.length <= 4) return cleanedDigits;
      return `${cleanedDigits.slice(0,4)}-${cleanedDigits.slice(4)}`;
    }
    // fallback: return digits (trimmed to 11)
    return cleanedDigits.slice(0, 11);
  }

  // Bank transfer: show digits up to 20
  if (method === "Bank Transfer") {
    return cleanedDigits.slice(0, 20);
  }

  // Default fallback: show digits only but cap at 20
  return cleanedDigits.slice(0, 20);
}

/* ----------------------------
   Auth detection helpers
   ---------------------------- */

/**
 * Attempt to get the current user from common app storage locations.
 * Returns parsed user object or null.
 *
 * NOTE: This function tries common keys used by many apps.
 * If your app stores auth in a different key, either:
 *  - set localStorage.currentUser = JSON.stringify(yourUser) after login
 *  - or set window.__CURRENT_USER__ = yourUser
 */
function getUserFromStorage() {
  try {
    // First try window global if app exposes it
    if (typeof window !== "undefined") {
      if (window.__CURRENT_USER__) return window.__CURRENT_USER__;
      if (window.__USER__) return window.__USER__;
    }

    // Common localStorage keys to check
    const keys = ["currentUser", "user", "authUser", "app_user", "me"];
    for (const k of keys) {
      const raw = localStorage.getItem(k);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed) return parsed;
        } catch (err) {
          // If it's not JSON, return the raw string (some apps store token/email)
          if (typeof raw === "string" && raw.trim()) return { id: raw.trim(), raw: true };
        }
      }
    }

    // as last resort, check for an auth token presence
    const tokenKeys = ["token", "authToken", "access_token"];
    for (const tk of tokenKeys) {
      const t = localStorage.getItem(tk);
      if (t && t.length > 10) return { tokenPresent: true };
    }
  } catch (err) {
    // ignore
  }
  return null;
}

/* ----------------------------
   Component
   ---------------------------- */

export default function Schedule() {
  // form state
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [contact, setContact] = useState("");
  const [wasteType, setWasteType] = useState("General");
  const [amount, setAmount] = useState(AMOUNT_OPTIONS["General"][0]);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Easypaisa");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);

  // auth state
  const [user, setUser] = useState(() => getUserFromStorage());
  const isLoggedIn = Boolean(user && (user.id || user.email || user.tokenPresent || user.raw));

  // location
  const [marker, setMarker] = useState(null);
  const [locationDesc, setLocationDesc] = useState("");
  const [locationError, setLocationError] = useState(null);

  const mapRef = useRef(null);
  const fileInputRef = useRef(null);

  // UI state
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [submissions, setSubmissions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("binoncall_pickups") || "[]");
    } catch {
      // If parsing fails (oversized/broken) return empty array
      return [];
    }
  });

  // map of id -> objectURL for screenshots read from IndexedDB
  const [screenshotUrls, setScreenshotUrls] = useState({});

  const pricePerKg = PRICE_TABLE[wasteType] ?? 50;

  const numericAmount = (() => {
    if (amount === "Custom") {
      const n = parseFloat(customAmount);
      return Number.isFinite(n) && n > 0 ? n : 0;
    }
    const n = parseFloat(amount);
    return Number.isFinite(n) ? n : 0;
  })();
  const computedPrice = Math.round(numericAmount * pricePerKg);

  // preview screenshot (local preview only, object URL)
  useEffect(() => {
    if (!screenshotFile) {
      setScreenshotPreview(null);
      return;
    }
    const url = URL.createObjectURL(screenshotFile);
    setScreenshotPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [screenshotFile]);

  // when wasteType changes set amount to first allowed
  useEffect(() => {
    const opts = AMOUNT_OPTIONS[wasteType] || ["1","2","5"];
    setAmount(opts[0]);
    setCustomAmount("");
  }, [wasteType]);

  // re-format/truncate payment number when payment method changes
  useEffect(() => {
    // keep raw digits but display formatted per method
    setPaymentNumber(prev => {
      const formatted = formatPaymentInputDisplay(prev, paymentMethod);
      return formatted;
    });
    // clear payment error for method change
    setErrors(prev => ({ ...prev, paymentNumber: undefined }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod]);

  // keep auth state in sync with changes in other tabs / when login sets localStorage
  useEffect(() => {
    function onStorage(e) {
      if (!e.key) return;
      // if a login-related key changed, refresh user
      const keysOfInterest = ["currentUser","user","authUser","app_user","token","access_token","authToken"];
      if (keysOfInterest.includes(e.key)) {
        setUser(getUserFromStorage());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Load screenshot blobs for current submissions from IndexedDB
  useEffect(() => {
    // load for submissions not already loaded
    submissions.forEach((s) => {
      if (!s.id) return;
      if (screenshotUrls[s.id] !== undefined) return; // already processed
      idbGet(`screenshot:${s.id}`).then((blob) => {
        if (blob) {
          const u = URL.createObjectURL(blob);
          setScreenshotUrls(prev => ({ ...prev, [s.id]: u }));
        } else {
          setScreenshotUrls(prev => ({ ...prev, [s.id]: null }));
        }
      }).catch((err) => {
        console.error("idb get error", err);
        setScreenshotUrls(prev => ({ ...prev, [s.id]: null }));
      });
    });

    // cleanup on unmount: revoke created object URLs
    return () => {
      Object.values(screenshotUrls).forEach(u => {
        if (u) URL.revokeObjectURL(u);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissions]);

  const detectLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        setMarker({ lat, lng });
        setLocationDesc(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
        setErrors(prev => ({ ...prev, location: undefined }));
        if (mapRef.current) {
          try { mapRef.current.setView([lat, lng], 15); } catch {}
        }
      },
      () => {
        setLocationError("Unable to detect location. Allow location permission and try again.");
        setErrors(prev => ({ ...prev, location: "Location not detected" }));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!cnic.trim()) e.cnic = "CNIC / ID is required";
    else if (!validCnic(cnic)) e.cnic = "Enter a valid CNIC (13 digits)";
    if (!contact.trim()) e.contact = "Contact number is required";
    else if (!validPakistanPhone(contact))
      e.contact = "Enter a valid Pakistan phone (+92... or 03...)";
    if (!marker) e.location = "Please detect your location";
    if (!locationDesc.trim()) e.locationDesc = "Please add location details (house/street/landmark)";
    if (amount === "Custom") {
      const n = parseFloat(customAmount);
      if (!Number.isFinite(n) || n <= 0) e.amount = "Enter a valid custom amount (>0)";
    } else {
      const allowed = AMOUNT_OPTIONS[wasteType] || [];
      if (!allowed.includes(amount)) e.amount = "Please select a valid amount";
    }

    // Payment validation now checks method-specific rules
    if (!paymentNumber.trim()) {
      e.paymentNumber = "Payment phone / account is required";
    } else if (!isValidPaymentForMethod(paymentMethod, paymentNumber)) {
      if (paymentMethod === "Easypaisa" || paymentMethod === "JazzCash") {
        e.paymentNumber = "For Easypaisa/JazzCash enter a valid 11-digit mobile number starting with 03 (03XXXXXXXXX).";
      } else if (paymentMethod === "Bank Transfer") {
        e.paymentNumber = "For Bank Transfer enter a valid account number (8 to 20 digits).";
      } else {
        e.paymentNumber = "Enter a valid payment phone (03XXXXXXXXX) or bank account (8–20 digits).";
      }
    }

    if (!screenshotFile && !screenshotPreview) e.screenshot = "Payment screenshot is required";

    // New: ensure user is logged in before submission
    if (!isLoggedIn) {
      e.submit = "You must be logged in to submit a pickup request. Please login or register.";
    }

    return e;
  };

  const safeSaveSubmissionsToLocalStorage = (updated) => {
    try {
      localStorage.setItem("binoncall_pickups", JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.warn("localStorage set failed, attempting trim ->", err);
      // fallback: keep recent 100 entries only
      try {
        const trimmed = updated.slice(0, 100);
        localStorage.setItem("binoncall_pickups", JSON.stringify(trimmed));
        return trimmed;
      } catch (err2) {
        console.error("Failed to save to localStorage after trim:", err2);
        // as a final fallback don't save, but return updated so UI still shows it
        return updated;
      }
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    // immediate guard: if not logged in block and show message
    if (!isLoggedIn) {
      setErrors({ submit: "You must be logged in to submit. Please login or register." });
      return;
    }

    const e = validate();
    setErrors(e);
    // If validate reports submit error due to not logged in, it will be present
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    try {
      const fileToSave = screenshotFile || (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) || null;

      const id = Date.now().toString();
      const payload = {
        id,
        name: name.trim(),
        cnic: cnic.replace(/\D/g,""),
        contact: contact.trim(),
        location: marker,
        locationDesc: locationDesc.trim(),
        wasteType,
        amount: amount === "Custom" ? customAmount : amount,
        pricePerKg,
        price: computedPrice,
        paymentMethod,
        // store raw digits for reliability
        paymentNumber: digitsOnly(paymentNumber),
        screenshotName: fileToSave ? (fileToSave.name || "screenshot") : null,
        status: "Pending",
        createdAt: new Date().toISOString(),
        // optional: record who submitted (if user object contains id/email)
        submittedBy: (user && (user.id || user.email)) ? (user.id || user.email) : undefined,
      };

      // store blob in IndexedDB (if file exists)
      if (fileToSave) {
        try {
          await idbSet(`screenshot:${id}`, fileToSave);
        } catch (idbErr) {
          console.error("Failed to save screenshot to IndexedDB:", idbErr);
          // continue — submission still accepted (image may be lost)
        }
      }

      // append submission metadata (no large screenshot data)
      setSubmissions(prev => {
        const updated = [payload, ...prev];
        const saved = safeSaveSubmissionsToLocalStorage(updated);
        return saved;
      });

      // clear form (keep marker)
      setName("");
      setCnic("");
      setContact("");
      setWasteType("General");
      setAmount(AMOUNT_OPTIONS["General"][0]);
      setCustomAmount("");
      setPaymentMethod("Easypaisa");
      setPaymentNumber("");
      setScreenshotFile(null);
      setScreenshotPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setErrors({});
      setSuccessMessage("Request submitted — we will call you to confirm collection.");
      setTimeout(() => setSuccessMessage(null), 6000);

      setTimeout(() => {
        const el = document.getElementById("submission-list");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      console.error("Submit error:", err);
      setErrors({ submit: "Submission failed — try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const removeSubmission = async (id) => {
    // remove metadata & try remove blob
    setSubmissions(prev => {
      const filtered = prev.filter((s) => s.id !== id);
      safeSaveSubmissionsToLocalStorage(filtered);
      return filtered;
    });
    try {
      await idbDel(`screenshot:${id}`);
      setScreenshotUrls(prev => {
        const copy = { ...prev };
        if (copy[id]) {
          try { URL.revokeObjectURL(copy[id]); } catch {}
        }
        delete copy[id];
        return copy;
      });
    } catch (err) {
      console.warn("Failed to delete screenshot from IDB", err);
    }
  };

  const handleCnicChange = (val) => {
    setCnic(formatCnicInput(val));
    if (errors.cnic) setErrors(prev => ({ ...prev, cnic: undefined }));
  };

  const handleContactChange = (val) => {
    setContact(val);
    if (errors.contact) setErrors(prev => ({ ...prev, contact: undefined }));
  };

  // payment change: format display + enforce length caps depending on method
  const handlePaymentChange = (val) => {
    // get digits
    const d = digitsOnly(val);

    if (paymentMethod === "Easypaisa" || paymentMethod === "JazzCash") {
      // enforce max 11 digits starting with 03
      let truncated = d.slice(0, 11); // only allow up to 11 digits
      // if user typed 923xxxxxxxxx, convert to leading 03 for validation display (optional)
      if (truncated.startsWith("92") && truncated.length >= 12) {
        truncated = truncated.slice(2, 13);
      }
      // format for display
      const displayed = formatPaymentInputDisplay(truncated, paymentMethod);
      setPaymentNumber(displayed);
    } else if (paymentMethod === "Bank Transfer") {
      // allow up to 20 digits for bank
      const truncated = d.slice(0, 20);
      const displayed = formatPaymentInputDisplay(truncated, paymentMethod);
      setPaymentNumber(displayed);
    } else {
      // fallback: cap at 20
      const truncated = d.slice(0, 20);
      const displayed = formatPaymentInputDisplay(truncated, paymentMethod);
      setPaymentNumber(displayed);
    }

    if (errors.paymentNumber) setErrors(prev => ({ ...prev, paymentNumber: undefined }));
  };

  return (
    <div className="w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${pickupBg})` }}>
      <div className="backdrop-blur-sm bg-white/30 min-h-screen">
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">

            {/* If user is not logged in show subtle banner, allow viewing but not submitting */}
            {!isLoggedIn && (
              <div className="mb-4 rounded-md bg-yellow-50 border border-yellow-100 p-3 text-yellow-800 flex items-center justify-between">
                <div>
                  <strong>Login required:</strong> You can view the form, but you must <a href="/login" className="underline">login</a> or <a href="/register" className="underline">register</a> to submit a pickup request.
                </div>
                <div className="flex gap-2">
                  <a href="/login" className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 text-sm">Login</a>
                  <a href="/register" className="px-3 py-1 rounded bg-white text-yellow-800 text-sm border">Register</a>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 rounded-md bg-green-50 border border-green-100 p-3 text-green-800">
                {successMessage}
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Form */}
              <div className="w-full lg:w-1/2">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1720] mb-2">Schedule Pickup</h2>
                <p className="text-sm text-gray-700 mb-4">
                  Click <strong>Detect my location</strong> to allow location access. 
                </p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                    <input value={name} onChange={e => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: undefined })); }}
                      className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none ${errors.name ? "border-red-500 ring-1 ring-red-200" : "border border-gray-300 focus:ring-2 focus:ring-[#20c736]"}`}
                      placeholder="Your full name" />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* CNIC */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CNIC / ID Card No *</label>
                    <input value={cnic} onChange={e => handleCnicChange(e.target.value)}
                      className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none ${errors.cnic ? "border-red-500 ring-1 ring-red-200" : "border border-gray-300 focus:ring-2 focus:ring-[#20c736]"}`}
                      placeholder="e.g., 12345-6789123-4" />
                    {errors.cnic && <p className="text-red-600 text-xs mt-1">{errors.cnic}</p>}
                  </div>

                  {/* contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Number *</label>
                    <input value={contact} onChange={e => handleContactChange(e.target.value)}
                      className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none ${errors.contact ? "border-red-500 ring-1 ring-red-200" : "border border-gray-300 focus:ring-2 focus:ring-[#20c736]"}`}
                      placeholder="+9233XXXXXXXX or 03XXXXXXXXX" />
                    {errors.contact && <p className="text-red-600 text-xs mt-1">{errors.contact}</p>}
                  </div>

                  {/* detect location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location *</label>
                    <div className="mt-2 flex items-center gap-3">
                      <button type="button" onClick={detectLocation}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#20c736] text-white text-sm">
                        Detect my location
                      </button>
                      <div className="text-sm text-gray-700">
                        {marker ? (
                          <span>Detected: <strong>{marker.lat.toFixed(5)}</strong>, <strong>{marker.lng.toFixed(5)}</strong></span>
                        ) : (
                          <span className="text-red-600">{locationError ?? "No location detected"}</span>
                        )}
                      </div>
                    </div>
                    {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location}</p>}
                    <p className="mt-2 text-xs text-gray-500">After detecting, edit the location details below if needed.</p>
                  </div>

                  {/* locationDesc editable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location Details *</label>
                    <textarea value={locationDesc} onChange={e => { setLocationDesc(e.target.value); if (errors.locationDesc) setErrors(prev => ({ ...prev, locationDesc: undefined })); }}
                      className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none ${errors.locationDesc ? "border-red-500 ring-1 ring-red-200" : "border border-gray-300 focus:ring-2 focus:ring-[#20c736]"}`}
                      rows={2} placeholder="House/Gate/Street/Landmark (editable)"></textarea>
                    {errors.locationDesc && <p className="text-red-600 text-xs mt-1">{errors.locationDesc}</p>}
                  </div>

                  {/* waste type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Waste Type *</label>
                    <select value={wasteType} onChange={e => setWasteType(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#20c736]">
                      {Object.keys(PRICE_TABLE).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                  </div>

                  {/* amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Waste Amount (kg) *</label>
                    <div className="mt-1 flex gap-2 items-center">
                      <select value={amount} onChange={e => setAmount(e.target.value)}
                        className={`block w-1/2 rounded-lg px-3 py-2 focus:outline-none ${errors.amount ? "border-red-500 ring-1 ring-red-200" : "border border-gray-300 focus:ring-2 focus:ring-[#20c736]"}`}>
                        {(AMOUNT_OPTIONS[wasteType] || ["1","2","5"]).map(opt => <option key={opt} value={opt}>{opt} kg</option>)}
                        <option value="Custom">Custom</option>
                      </select>

                      {amount === "Custom" && (
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="Enter kg"
                          value={customAmount}
                          onChange={e => setCustomAmount(e.target.value)}
                          className={`block w-1/2 rounded-lg px-3 py-2 focus:outline-none ${errors.amount ? "border-red-500 ring-1 ring-red-200" : "border border-gray-300 focus:ring-2 focus:ring-[#20c736]"}`}
                        />
                      )}
                    </div>

                    {errors.amount && <p className="text-red-600 text-xs mt-1">{errors.amount}</p>}
                    <div className="mt-2 text-sm text-gray-700">Rate: PKR {pricePerKg}/kg • Estimated total: <strong>PKR {computedPrice}</strong></div>
                  </div>

                  {/* payment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method *</label>
                    <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#20c736]">
                      <option>Easypaisa</option>
                      <option>JazzCash</option>
                      <option>Bank Transfer</option>
                    </select>
                  </div>

                  <div className="bg-gray-50 border rounded-md p-3 text-sm text-gray-700">
                    <div className="font-medium mb-1">Our Payment Details</div>
                    <div>• {PAYMENT_DETAILS.easypaisa.label}: <strong>{PAYMENT_DETAILS.easypaisa.value}</strong></div>
                    <div>• {PAYMENT_DETAILS.bank.label}: <strong>{PAYMENT_DETAILS.bank.value}</strong></div>
                    <div className="mt-2 text-xs text-gray-500">Transfer and upload the payment screenshot below. We verify before accepting.</div>
                  </div>

                  {/* payment number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment phone / account number used *</label>
                    <input
                      value={paymentNumber}
                      onChange={e => handlePaymentChange(e.target.value)}
                      className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none ${errors.paymentNumber ? "border-red-500 ring-1 ring-red-200" : "border border-gray-300 focus:ring-2 focus:ring-[#20c736]"}`}
                      placeholder={paymentMethod === "Bank Transfer" ? "Bank account number (8–20 digits)" : "03XXXXXXXXX (Easypaisa/JazzCash)"} />
                    {errors.paymentNumber && <p className="text-red-600 text-xs mt-1">{errors.paymentNumber}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      {paymentMethod === "Easypaisa" || paymentMethod === "JazzCash"
                        ? "Enter exactly 11 digits starting with 03 (we accept Pakistani mobile numbers only)."
                        : "Enter bank account number (8 to 20 digits)."}
                    </p>
                  </div>

                  {/* screenshot */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Screenshot (required) *</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        setScreenshotFile(e.target.files?.[0] ?? null);
                        if (errors.screenshot) setErrors(prev => ({ ...prev, screenshot: undefined }));
                      }}
                      className={`mt-1 block w-full text-sm ${errors.screenshot ? "border-red-500" : ""}`}
                      // disable file input if not logged in
                      disabled={!isLoggedIn}
                    />
                    {errors.screenshot && <p className="text-red-600 text-xs mt-1">{errors.screenshot}</p>}
                    {screenshotPreview && <img src={screenshotPreview} alt="preview" className="mt-2 w-32 h-20 object-cover rounded-md border" />}
                  </div>

                  {/* submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting || !isLoggedIn}
                      className={`w-full inline-flex justify-center items-center rounded-lg px-4 py-2 text-white font-semibold ${submitting || !isLoggedIn ? "bg-gray-300 cursor-not-allowed" : "bg-[#20c736] hover:bg-[#18a82c]"}`}
                    >
                      {submitting ? "Scheduling..." : "Schedule Pickup"}
                    </button>
                    {errors.submit && <p className="text-red-600 text-xs mt-2">{errors.submit}</p>}
                  </div>
                </form>
              </div>

              {/* Map */}
              <div className="w-full lg:w-1/2 h-[330px] md:h-[420px] rounded-lg overflow-hidden border border-gray-200">
                <MapContainer
                  center={marker ? [marker.lat, marker.lng] : [31.5204, 74.3587]}
                  zoom={marker ? 15 : 12}
                  scrollWheelZoom={true}
                  style={{ height: "100%", width: "100%" }}
                  whenCreated={(map) => (mapRef.current = map)}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {marker && <Marker position={[marker.lat, marker.lng]} />}
                </MapContainer>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-600">
              Note: Click <strong>Detect my location</strong> to allow location permission (we will not auto-prompt on page open).
            </div>
          </div>

          {/* submissions */}
          <div id="submission-list" className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Your Requests</h3>
            {submissions.length === 0 ? (
              <p className="text-sm text-gray-600">No pickup requests yet. Your latest submission will appear here as Pending.</p>
            ) : (
              <div className="grid gap-4">
                {submissions.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 items-start"
                  >
                    {/* Left: text/content */}
                    <div className="w-full md:w-2/3 md:pr-6 text-gray-700 space-y-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-lg text-[#0f1720]">{s.name}</div>
                          <div className="text-xs text-gray-500 mt-1">CNIC: {s.cnic}</div>
                        </div>

                        <div className="ml-auto">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              s.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                              s.status === "Accepted" ? "bg-green-100 text-green-800" :
                              "bg-red-100 text-red-800"
                            }`}
                          >
                            {s.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                        <div><strong>Contact:</strong> {s.contact}</div>
                        <div><strong>Location:</strong> {s.locationDesc || (s.location ? `${s.location.lat.toFixed(5)}, ${s.location.lng.toFixed(5)}` : "")}</div>
                        <div><strong>Waste Type:</strong> {s.wasteType}</div>
                        <div><strong>Amount:</strong> {s.amount} kg — PKR {s.price}</div>
                        <div><strong>Payment:</strong> {s.paymentMethod} — {s.paymentNumber}</div>
                        <div className="col-span-full text-sm text-gray-600">
                          <strong>Submitted:</strong> {new Date(s.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="mt-3 flex gap-3 items-center">
                        <button onClick={() => removeSubmission(s.id)} className="text-xs text-red-600 hover:underline">Remove</button>
                      </div>
                    </div>

                    {/* Right: image */}
                    <div className="w-full md:w-1/3 mt-2 md:mt-0 flex justify-center">
                      {screenshotUrls[s.id] ? (
                        <img
                          src={screenshotUrls[s.id]}
                          alt={`Payment screenshot for ${s.name}`}
                          className="rounded-lg w-56 h-40 object-cover shadow-md border"
                        />
                      ) : (
                        <div className="w-56 h-40 rounded-lg bg-gray-50 border flex items-center justify-center text-xs text-gray-500">
                          No screenshot
                        </div>
                      )}
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
}
