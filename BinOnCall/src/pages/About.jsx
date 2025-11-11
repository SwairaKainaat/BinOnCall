import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function About() {
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
          About BinOnCall
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          <span className="text-[#20c736] font-semibold">BinOnCall</span> is a platform dedicated to connecting sustainability-conscious individuals with local waste collectors. Our mission is to improve waste management practices, empower local communities, and promote a cleaner environment for everyone.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We believe that every city can be cleaner and greener with coordinated effort. Our technology and platform facilitate communication, fair compensation, and efficiency in local waste collection systems.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          At BinOnCall, we value transparency, sustainability, and community engagement. Our team works tirelessly to innovate and expand services that benefit both individuals and the environment.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We aim to empower citizens and waste collectors alike, creating opportunities that generate impact. By leveraging technology, we bring communities closer to solutions for environmental challenges.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Learn more about our story, mission, and impact. Join the <span className="text-[#20c736] font-semibold">BinOnCall</span> community today to be part of a movement toward cleaner and greener cities.
        </p>
      </div>
    </div>
  );
}
