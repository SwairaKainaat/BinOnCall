import React, { useState } from "react";
import "./Part6.css";

const faqData = [
  {
    question: "How do I schedule a garbage pickup?",
    answer:
      "You can schedule a pickup via our website form or WhatsApp. Choose a date and time convenient for you.",
  },
  {
    question: "What items can I give for pickup?",
    answer:
      "We collect household waste, recyclables, and bulk items. Hazardous materials are not accepted.",
  },
  {
    question: "Do you charge for pickup?",
    answer:
      "We charge a small fee for all pickups. Bulk items or express pickups may have a slightly higher fee.",
  },
  {
    question: "How do I know when the team will arrive?",
    answer:
      "You will receive a confirmation via SMS or WhatsApp with an estimated pickup window.",
  },
  {
    question: "Is my waste disposed of responsibly?",
    answer:
      "Yes, all waste is taken to authorized disposal or recycling partners following environmental guidelines.",
  },
];

export default function Part6() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="part6" className="faq-section">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span className="faq-toggle">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
