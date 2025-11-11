import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Affiliate() {
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
          Become an Affiliate
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Partner with <span className="text-[#20c736] font-semibold">BinOnCall</span> and earn by promoting eco-friendly waste management. Our affiliate program lets you spread awareness, refer users, and grow your income while contributing to a cleaner planet.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          As an affiliate, you receive a unique referral link to share across social media, blogs, or community groups. Every successful referral earns you commission, making it both impactful and rewarding.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We provide marketing materials, live dashboards, and instant updates to track your performance. You don’t need to invest anything—just your passion for sustainability and community improvement.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Affiliates play a key role in connecting households, collectors, and recyclers. Through your efforts, we can expand our impact and help cities manage waste responsibly.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Join our affiliate program today and grow with <span className="text-[#20c736] font-semibold">BinOnCall</span>—where every referral leads to a cleaner tomorrow.
        </p>
      </div>
    </div>
  );
}