import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Investors() {
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
          Investor Relations
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          At <span className="text-[#20c736] font-semibold">BinOnCall</span>, we maintain open communication with our investors and stakeholders. We believe transparency and strong governance are key to building trust and long-term growth.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Our platform is designed for scalability, with innovative solutions in waste collection and sustainability that attract investors who share our vision for cleaner cities.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We provide regular updates, performance reports, and opportunities to engage with our mission-driven team. Our focus on technology and community impact ensures sustainable returns for all stakeholders.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Investors are invited to explore partnerships, funding opportunities, and collaborative initiatives that drive environmental and social impact while fostering business growth.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Join our investor network and contribute to the <span className="text-[#20c736] font-semibold">BinOnCall</span> vision. Together, we can achieve sustainable success and cleaner cities.
        </p>
      </div>
    </div>
  );
}
