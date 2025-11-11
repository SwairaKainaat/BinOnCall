import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function BinServices() {
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
          BinOnCall Services
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          <span className="text-[#20c736] font-semibold">BinOnCall</span> offers a variety of services focused on waste collection, sustainability, and community engagement. We connect local waste collectors with citizens and businesses for efficient and eco-friendly waste management.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Our platform allows users to schedule waste pickups, track collection progress, and participate in local recycling initiatives. We ensure fair compensation for our collectors while promoting cleaner neighborhoods.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Services also include educational campaigns, community clean-up events, and collaborations with municipalities to improve waste infrastructure. We aim to create an ecosystem that benefits citizens, workers, and the environment.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          By integrating technology, logistics, and sustainability principles, our services ensure efficiency, transparency, and a measurable impact. Users can easily engage, provide feedback, and see results.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Explore our <span className="font-semibold">services</span> and join the <span className="text-[#20c736] font-semibold">BinOnCall</span> movement. Together, we can make cities cleaner, greener, and more sustainable.
        </p>
      </div>
    </div>
  );
}
