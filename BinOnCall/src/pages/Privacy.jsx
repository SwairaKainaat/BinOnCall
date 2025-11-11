import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 relative"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "70%",
        backgroundColor: "white",
      }}
    >
      <div
        className="w-full max-w-4xl sm:max-w-5xl md:max-w-6xl bg-white/80 rounded-2xl p-8 sm:p-12 md:p-16 text-center backdrop-blur-sm relative"
        style={{
          boxShadow:
            "0 -15px 30px rgba(0, 0, 0, 0.2), 0 15px 30px rgba(0, 0, 0, 0.25)",
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#20c736] mb-6 sm:mb-8 uppercase tracking-wider">
          Privacy Policy
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          At <span className="text-[#20c736] font-semibold">BinOnCall</span>, your privacy is our priority. This policy explains how we collect, use, and protect your personal information when you use our services or visit our website.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We collect basic data such as your name, contact details, and pickup information solely to process requests and improve service delivery. Your information is never sold or shared with third parties without your consent.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Our platform uses encryption and secure databases to protect your data. We may use cookies to enhance your browsing experience, but you can disable them anytime through your browser settings.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          You have full rights to access, update, or delete your data upon request. For any privacy-related concerns, our support team is always available to assist you promptly.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          By using <span className="text-[#20c736] font-semibold">BinOnCall</span>, you agree to our data practices described here. We regularly review and update this policy to keep your information safe and transparent.
        </p>
      </div>
    </div>
  );
}
