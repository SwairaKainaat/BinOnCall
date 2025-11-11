import React, { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Blog() {
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
          BinOnCall Blog
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Welcome to the <span className="text-[#20c736] font-semibold">BinOnCall Blog</span>, your source for insights on sustainability, waste management, and community initiatives. We share stories from our local waste collectors, highlight environmental challenges, and offer tips to make your city cleaner and greener.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Our blog features practical guides, success stories, and news about innovative solutions in recycling and waste collection. Whether you’re a sustainability enthusiast or just curious, there’s something here for everyone interested in making a positive impact.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          We aim to inspire communities to take action. By connecting local stories with broader environmental topics, our blog provides both knowledge and motivation to contribute to a cleaner future.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify mb-4">
          Join the conversation, share your experiences, and learn from others. Together, through informed action and collaboration, we can build a more sustainable world for ourselves and future generations.
        </p>

        <p className="text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed text-justify">
          Explore our <span className="font-semibold">latest posts</span> today and become part of the <span className="text-[#20c736] font-semibold">BinOnCall</span> movement. Let’s create cleaner, healthier cities together.
        </p>
      </div>
    </div>
  );
}
