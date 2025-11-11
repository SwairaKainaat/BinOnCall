import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust path if needed

export default function Header() {
  const [open, setOpen] = useState(false); // mobile menu
  const [loginOpen, setLoginOpen] = useState(false); // dropdown
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // measure header height & update spacer
  useEffect(() => {
    function updateHeight() {
      const h = headerRef.current ? headerRef.current.offsetHeight : 0;
      setHeaderHeight(h);
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Fixed header */}
      <header
        ref={headerRef}
        className="w-full relative z-50"
        style={{ position: "fixed", top: 0, left: 0, right: 0 }}
      >
        {/* Top Green Bar */}
        <div className="h-2 w-full" style={{ backgroundColor: "#20c736" }} />

        {/* Main Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20 relative">
              {/* Left Section: Name + Logo */}
              <div className="flex items-center relative">
                <Link
                  to="/"
                  className="text-xl sm:text-2xl font-bold flex items-center"
                >
                  <span className="text-black">Bin</span>
                  <span style={{ color: "#20c736" }}>OnCall</span>
                </Link>

                {/* Logo slightly above "Call" */}
                <img
                  src={logo}
                  alt="BinOnCall Logo"
                  className="h-8 sm:h-10 w-auto object-contain absolute left-[90px] sm:left-[105px] -top-4 sm:-top-5"
                />
              </div>

              {/* Right Navigation (Desktop) */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8 relative">
                <nav>
                  <ul className="flex items-center gap-6 lg:gap-8 text-gray-700 font-medium">
                    {["Home", "Services", "Schedule", "Jobs"].map(
                      (item, i) => (
                        <li key={i}>
                          <Link
                            to={
                              item === "Home"
                                ? "/"
                                : `/${item.replace(/\s+/g, "")}`
                            }
                            className="relative inline-block py-2 px-1 group"
                          >
                            {item}
                            <span
                              className="absolute left-0 -bottom-1 w-0 h-0.5 rounded transition-all duration-300 group-hover:w-full"
                              style={{ backgroundColor: "#20c736" }}
                            ></span>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </nav>

                {/* Login Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setLoginOpen(!loginOpen)}
                    className="px-4 py-2 border rounded-lg font-medium transition text-sm lg:text-base"
                    style={{
                      borderColor: "#20c736",
                      color: "#20c736",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#20c736";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#20c736";
                    }}
                  >
                    Login / Signup
                  </button>

                  {loginOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg border border-gray-200 rounded-lg z-50">
                      <ul className="py-2 text-gray-700">
                        <li>
                          <Link
                            to="/account"
                            className="block px-4 py-2 hover:bg-gray-50"
                            onClick={() => setLoginOpen(false)}
                          >
                            My Account
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/login"
                            className="block px-4 py-2 hover:bg-gray-50"
                            onClick={() => setLoginOpen(false)}
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/signup"
                            className="block px-4 py-2 hover:bg-gray-50"
                            onClick={() => setLoginOpen(false)}
                          >
                            Signup
                          </Link>
                        </li>
                        <li>
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                            onClick={() => {
                              setLoginOpen(false);
                              // you'll replace this logout handling with real logic later
                              alert("You have logged out!");
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  aria-label="Toggle menu"
                  onClick={() => setOpen(!open)}
                  className="p-2 rounded-md inline-flex items-center justify-center text-gray-700 hover:bg-gray-100"
                >
                  {open ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            className={`md:hidden bg-white border-t border-gray-100 transition-all duration-300 ${
              open ? "block" : "hidden"
            }`}
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              <nav>
                <ul className="flex flex-col gap-3 text-gray-800 font-medium">
                  {["Home", "About", "Services", "Contact"].map((item, i) => (
                    <li key={i}>
                      <Link
                        to={
                          item === "Home"
                            ? "/"
                            : `/${item.toLowerCase().replace(/\s+/g, "")}`
                        }
                        onClick={() => setOpen(false)}
                        className="block px-2 py-2 rounded hover:bg-gray-50"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Login Dropdown */}
              <details>
                <summary className="cursor-pointer px-2 py-2 font-medium text-gray-700">
                  Login / Signup
                </summary>
                <ul className="pl-4 text-gray-700">
                  <li>
                    <Link to="/account" onClick={() => setOpen(false)}>
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" onClick={() => setOpen(false)}>
                      Signup
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setOpen(false);
                        alert("You have logged out!");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </div>

        {/* Bottom Green Bar */}
        <div className="h-2 w-full" style={{ backgroundColor: "#20c736" }} />
      </header>

      {/* Spacer to push page content below the fixed header */}
      <div style={{ height: headerHeight }} aria-hidden="true" />
    </>
  );
}
