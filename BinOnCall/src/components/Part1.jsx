import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

export default function Part1() {
  return (
    <section className="bg-[#f9fff9] box-border overflow-hidden w-full">
      <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-6 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        
        {/* Left content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#222] mb-3 leading-snug">
            Keep <span className="text-[#20c736]">Pakistan</span> Clean & Green
          </h1>
          <p className="text-[#555] text-base sm:text-lg mb-4">
            BinOnCall helps you schedule household waste pickups in just one click.
            Let’s build a cleaner, healthier Pakistan together.
          </p>

          <Link
            to="/Schedule"
            className="inline-block bg-[#20c736] text-white px-6 py-3 rounded-lg text-base sm:text-lg font-medium transition-all duration-300 hover:bg-[#18a82c]"
          >
            Schedule a Pickup
          </Link>
        </div>

        {/* Right image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
          <img
            src={heroImg}
            alt="Clean Pakistan"
            className="w-[90%] sm:w-[80%] md:w-[90%] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
