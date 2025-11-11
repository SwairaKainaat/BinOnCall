import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Bulk() {
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
          Bulk Waste Collection
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          For large items and heavy loads, <span className="text-[#20c736] font-semibold">BinOnCall</span> offers specialized bulk waste collection. Whether it’s furniture, appliances, or renovation debris, we ensure safe and responsible disposal.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Our professional teams handle logistics from pickup to delivery at approved waste processing centers. We focus on recycling as much as possible before final disposal.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Scheduling bulk waste collection is quick and flexible. Just book a slot, specify your items, and our crew will handle the rest with efficiency and care.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          This service helps communities manage large-scale waste while preventing illegal dumping and pollution.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Choose <span className="text-[#20c736] font-semibold">BinOnCall</span> for hassle-free bulk waste removal that’s safe, sustainable, and affordable.
        </p>
      </div>
    </div>
  );
}
