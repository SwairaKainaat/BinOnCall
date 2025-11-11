import React, { useEffect, useState } from "react";
import "./part5.css";

// Star Component
const Star = ({ type }) => {
  const colors = {
    full: "#ffb400",
    half: "#ffb400",
    empty: "#ccc",
  };

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={type === "empty" ? colors.empty : colors.full}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", marginRight: 2 }}
    >
      {type === "half" ? (
        <defs>
          <clipPath id="half">
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
      ) : null}
      <path
        clipPath={type === "half" ? "url(#half)" : ""}
        d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.402 8.177L12 18.897 4.664 23.169l1.402-8.177L.132 9.21l8.2-1.192z"
      />
    </svg>
  );
};

// Reviews Data
const reviewsData = [
  { name: "Ayesha, Karachi", rating: 4.9, text: "Fast and polite service. Picked up exactly when they said." },
  { name: "Bilal, Lahore", rating: 5.0, text: "They separated recyclables and gave a fair price for bulk items." },
  { name: "Saira, Islamabad", rating: 4.4, text: "Convenient booking via Website. Would recommend." },
  { name: "Ali, Rawalpindi", rating: 4.8, text: "The team arrived on time, well-uniformed and very professional." },
  { name: "Hina, Faisalabad", rating: 4.7, text: "Great experience overall! Easy to schedule and no hidden charges." },
];

export default function Part5() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    reviewsData.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, i]);
      }, 300 * i);
    });
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} type="full" />
        ))}
        {halfStar && <Star key="half" type="half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} type="empty" />
        ))}
      </>
    );
  };

  return (
    <section id="part5" className="testimonials-section">
      <h2 className="testimonials-heading">What People Say</h2>
      <div className="testimonials-container">
        {reviewsData.map((review, index) => (
          <div
            key={index}
            className={`testimonial ${visible.includes(index) ? "visible" : ""}`}
          >
            <div className="testimonial-name">{review.name}</div>
            <div className="stars">{renderStars(review.rating)}</div>
            <div className="rating">{review.rating.toFixed(1)}★</div>
            <p className="testimonial-text">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
