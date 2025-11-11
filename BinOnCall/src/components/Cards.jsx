import React from "react";
import "./Cards.css";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const Cards = () => {
  const images = [img1, img2, img3, img4];

  return (
    <div className="card-container">
      {images.map((img, i) => (
        <div className={`card card${i + 1}`} key={i}>
          <img src={img} alt={`Card ${i + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Cards;
