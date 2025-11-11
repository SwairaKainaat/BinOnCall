import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Contact() {
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
          Contact Support
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Need help? The <span className="text-[#20c736] font-semibold">BinOnCall</span> support team is here to assist you. Whether you have questions about pickups, payments, or policies, we’re just a message away.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          You can reach us via email, chat, or phone. Our representatives are available 7 days a week to provide quick and reliable responses.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We value your feedback—it helps us improve our services and make waste management simpler for everyone.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          For faster solutions, please include your pickup ID or account email when contacting us.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Contact us anytime at <span className="text-[#20c736] font-semibold">support@binoncall.com</span>. We’re always happy to help you keep your surroundings clean and green.
        </p>
      </div>
    </div>
  );
}