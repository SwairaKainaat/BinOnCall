import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function FAQs() {
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
          FAQs
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Here you’ll find answers to common questions about <span className="text-[#20c736] font-semibold">BinOnCall</span> services, pickups, and policies. We want to make your experience smooth and transparent.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          <strong>How do I book a pickup?</strong> You can easily schedule one through our app or website by selecting your preferred date and time.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          <strong>Do you charge any fees?</strong> Standard pickups are free in most areas. Bulk or express pickups may have minimal charges depending on your location.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          <strong>What happens to collected waste?</strong> All items are sorted and sent to certified recycling facilities. Reusable items are redirected for community benefit.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Can’t find your answer? Reach out through our <span className="text-[#20c736] font-semibold">Contact Support</span> page for help.
        </p>
      </div>
    </div>
  );
}