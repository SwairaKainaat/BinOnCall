import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function PickupScheduling() {
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
          Pickup Scheduling
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Schedule your waste pickups effortlessly with <span className="text-[#20c736] font-semibold">BinOnCall</span>. Our user-friendly interface allows you to set a convenient date and time for collectors to visit your location.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Once scheduled, you’ll receive instant confirmation and real-time updates about your collector’s arrival. We ensure timely service through our verified and trained waste collection partners.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          You can manage, reschedule, or cancel pickups anytime from your dashboard. Our flexible slots accommodate households, offices, and industries, ensuring minimal disruption to your routine.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          With <span className="text-[#20c736] font-semibold">BinOnCall</span>, every pickup is tracked digitally for transparency and efficiency. We value your time and strive to make waste collection smooth and reliable.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Book your pickup today and experience eco-friendly waste management made easy and on time.
        </p>
      </div>
    </div>
  );
}