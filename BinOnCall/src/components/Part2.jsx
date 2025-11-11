import React from "react";
import Cards from "./Cards"; 

export default function Part2() {
  return (
    <section className="about-section" aria-labelledby="about-heading">
      <style>{cssString}</style>

      <div className="about-card">
        <div className="inner">
          {/* Left side — Cards */}
          <div className="cards-side">
            <Cards />
          </div>

          {/* Right side — Text */}
          <div className="text-side">
            <h2 id="about-heading">
              About <span className="highlight">BinOnCall</span>
            </h2>
            <p>
              <strong>BinOnCall</strong> is a quick, on-demand rubbish pickup
              service designed to make waste disposal effortless.  
              We collect trash right from your doorstep — simple, fast, and
              reliable. Whether it’s household waste, renovation leftovers, or
              occasional cleanup, our team is ready to help you with just
              <strong> one click</strong>.
            </p>

            <p className="note">
              Our goal is to make communities cleaner and more organized, one
              pickup at a time. With <span className="highlight">BinOnCall</span>, 
              you can easily schedule pickups online, track your requests, and
              enjoy a cleaner environment without any hassle.  
              It’s your waste, our responsibility — together, we create a better tomorrow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const cssString = `
:root {
  --green: #20c736;
  --text-dark: #1a1a1a;
  --muted: #555;
  --bg: #f9fff9;
}

.about-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  background: var(--bg);
  font-family: 'Inter', sans-serif;
}

.about-card {
  width: 95%;
  max-width: 1400px;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 60px 50px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.cards-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-side {
  flex: 1;
  color: var(--text-dark);
  padding: 0 15px;
}

.text-side h2 {
  font-size: 32px;
  margin-bottom: 15px;
  font-weight: 800;
}

.highlight {
  color: var(--green);
}

.text-side p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--muted);
  margin-bottom: 14px;
}

.note {
  margin-top: 14px;
  color: #333;
  font-size: 15px;
  line-height: 1.6;
  font-style: italic;
}

/* ✅ Responsive */
@media (max-width: 1000px) {
  .inner {
    flex-direction: column;
    gap: 30px;
  }
  .cards-side, .text-side {
    flex: 1 1 100%;
    text-align: center;
  }
  .about-card {
    padding: 40px 25px;
  }
}
`;
