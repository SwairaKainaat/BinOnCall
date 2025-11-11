import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Express() {
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
          Express Pickups
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Need urgent waste removal? Our <span className="text-[#20c736] font-semibold">Express Pickup</span> service ensures same-day or next-day collection for your home or office. Quick, reliable, and efficient—because your time matters.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          With express pickup, you can request immediate service through the BinOnCall app or website. Our nearest available collector will be dispatched to your location instantly.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Ideal for event cleanup, last-minute disposals, or unexpected waste accumulation, this service brings convenience and peace of mind when you need it most.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We maintain fast response times without compromising quality or safety. Each express job follows strict environmental and recycling standards.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Book your <span className="text-[#20c736] font-semibold">Express Pickup</span> today and experience waste collection on your schedule.
        </p>
      </div>
    </div>
  );
}