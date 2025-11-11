import React from "react";
import { Leaf, Recycle, Truck, Sparkles } from "lucide-react";
import "./Services.css";

export default function Services() {
  const services = [
    {
      icon: <Recycle size={40} color="#00b140" />,
      title: "Waste Collection",
      description:
        "We provide efficient household and commercial waste collection on time, keeping your surroundings clean and fresh.",
    },
    {
      icon: <Truck size={40} color="#00b140" />,
      title: "Express Pickup",
      description:
        "Need urgent pickup? Our express service ensures your waste is collected within hours of your request.",
    },
    {
      icon: <Leaf size={40} color="#00b140" />,
      title: "Eco Recycling",
      description:
        "We ensure your recyclable waste is processed responsibly to protect the environment and promote sustainability.",
    },
    {
      icon: <Sparkles size={40} color="#00b140" />,
      title: "Street Cleaning",
      description:
        "Our dedicated cleaning teams keep public areas tidy, hygienic, and visually appealing for the community.",
    },
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-header">
        <h2>Our Services</h2>
        <p>Professional, Reliable, and Eco-Friendly Waste Solutions</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <div className="services-description">
        <p>
          At <strong>BinOnCall</strong>, we go beyond just collecting waste — we
          are redefining cleanliness and environmental care in every community
          we serve. Our goal is to make waste management seamless, responsible,
          and accessible to everyone. With a dedicated team of professionals and
          eco-friendly practices, we ensure that every pickup, from small
          households to large businesses, is handled efficiently and
          sustainably. We understand the challenges of urban waste and aim to
          simplify the process by providing digital booking, timely pickup, and
          transparent recycling. Our fleet of green trucks and trained staff
          work around the clock to keep neighborhoods clean, healthy, and free
          of waste. By choosing BinOnCall, you’re not just opting for a service —
          you’re joining a movement for a cleaner, greener, and smarter future.
        </p>
      </div>
    </section>
  );
} 
