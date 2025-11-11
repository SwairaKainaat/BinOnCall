import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Terms() {
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
          Terms & Policies
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          These <span className="text-[#20c736] font-semibold">Terms & Policies</span> outline the rules and regulations for using the BinOnCall platform and its related services. By accessing or using our services, you agree to comply with these terms in full.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          BinOnCall provides waste management and recycling solutions through a network of verified collectors. Users must ensure that information provided during registration or booking is accurate and lawful. Misuse, false claims, or fraudulent activities may result in account suspension.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We are committed to protecting your data and privacy, following all applicable environmental and digital standards. Any personal information collected is used strictly for service improvement and operational efficiency.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          BinOnCall reserves the right to modify or update these terms as needed. Users will be notified of any significant changes through the website or mobile app. Continued use after updates implies acceptance of the new terms.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Please read these policies carefully before using our platform. Your cooperation helps us maintain a secure, fair, and eco-friendly service for everyone involved.
        </p>
      </div>
    </div>
  );
}

