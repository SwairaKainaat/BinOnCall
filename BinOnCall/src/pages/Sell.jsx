import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Sell() {
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
          Sell Items
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          <span className="text-[#20c736] font-semibold">BinOnCall</span> offers an easy and transparent platform for individuals and businesses to sell reusable or recyclable items. Whether you have old electronics, plastic, or metal scrap, our service ensures your materials are collected responsibly while you earn cash in return.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Listing your items is simple. Just schedule a pickup, describe your materials, and one of our verified collectors will arrive at your doorstep to evaluate and collect them. Our pricing system ensures fair rates based on material type, weight, and current market value.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          By selling through <span className="text-[#20c736] font-semibold">BinOnCall</span>, you not only earn but also contribute to a circular economy—reducing landfill waste and supporting recycling industries across your community.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Our sellers enjoy the convenience of doorstep service, digital payments, and trusted collection partners. You can track your sale status, payment progress, and pickup records directly from your BinOnCall account.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Join our network of eco-conscious sellers and turn your waste into value today. Together, we can make recycling rewarding, simple, and sustainable.
        </p>
      </div>
    </div>
  );
}
