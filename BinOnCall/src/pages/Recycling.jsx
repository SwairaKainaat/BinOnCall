import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Recycling() {
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
          Recycling Services
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          At <span className="text-[#20c736] font-semibold">BinOnCall</span>, we make recycling easy and rewarding. Our recycling services collect and process materials like paper, plastic, glass, and metal, ensuring they are repurposed instead of ending up in landfills.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We partner with certified recycling centers that follow environmentally responsible methods. Every pickup is carefully sorted and directed toward reuse or industrial recycling.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Our service benefits households, offices, and industries by offering convenient and reliable recycling options. You can even track your environmental contribution through your BinOnCall account.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          By choosing our recycling service, you reduce carbon emissions, conserve resources, and help maintain a cleaner environment for future generations.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Let’s recycle together—because every bottle, can, and carton matters.
        </p>
      </div>
    </div>
  );
}