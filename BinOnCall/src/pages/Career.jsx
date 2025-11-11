import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Career() {
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
          Career at BinOnCall
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          At <span className="text-[#20c736] font-semibold">BinOnCall</span>, we are committed to creating meaningful opportunities that help communities thrive and protect the environment. Our platform connects sustainability-conscious individuals with local waste collectors, ensuring fair work and cleaner cities.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We welcome passionate individuals to join our team as local waste collectors, operations coordinators, or support staff. We provide flexible schedules, competitive pay, and a chance to make a tangible impact on society.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Working at <span className="text-[#20c736] font-semibold">BinOnCall</span> means being part of a mission-driven team. You will gain experience in logistics, customer service, sustainability practices, and community engagement while contributing to a cleaner future.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We value teamwork, integrity, and dedication. Our employees are empowered to innovate, learn, and grow in a supportive environment. Whether you’re looking for full-time employment, part-time engagement, or occasional work, we offer opportunities that fit your schedule and skills.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Explore our <span className="font-semibold">Careers</span> today and become a part of the <span className="text-[#20c736] font-semibold">BinOnCall</span> movement. Together, we can make our cities cleaner, greener, and more sustainable.
        </p>
      </div>
    </div>
  );
}
