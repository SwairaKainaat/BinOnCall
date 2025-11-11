import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Advertise() {
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
          Advertise Your Products
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Showcase your eco-friendly products or services to a growing audience of environmentally conscious users on <span className="text-[#20c736] font-semibold">BinOnCall</span>. Our advertising space connects your brand with people who care about sustainability.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Whether you sell recycling tools, cleaning supplies, or sustainable goods, our ad placement system ensures your offerings reach local communities effectively.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          You can select custom ad durations, targeted cities, and page positions to suit your marketing needs. All promotions are displayed seamlessly within our platform to maximize reach and visibility.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Partnering with <span className="text-[#20c736] font-semibold">BinOnCall</span> not only promotes your business but also supports green initiatives. Every ad campaign contributes to expanding community recycling efforts.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Start advertising today and grow your brand while empowering people to choose sustainable options every day.
        </p>
      </div>
    </div>
  );
}
