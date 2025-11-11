import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Pickup() {
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
          Host a Pickup Hub
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Become a central point in your community by hosting a <span className="text-[#20c736] font-semibold">BinOnCall Pickup Hub</span>. Our hubs serve as convenient collection points for recyclables and reusable materials.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Local shops, schools, and organizations can register as hubs to help streamline pickup logistics and support neighborhood recycling drives. We provide all the necessary guidance and digital tools.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Hosting a hub increases community engagement, brings more foot traffic to your location, and shows your commitment to sustainability. You’ll also earn rewards based on the volume of material collected through your hub.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Each hub receives branding materials, regular support, and data insights to track progress and impact. Together, we can simplify waste management and make recycling accessible to everyone.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Join the <span className="text-[#20c736] font-semibold">BinOnCall</span> network today and empower your community by becoming an official pickup hub.
        </p>
      </div>
    </div>
  );
}