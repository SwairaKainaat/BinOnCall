// HowItWorks.jsx
import React, { useEffect, useRef } from "react";

export default function HowItWorks({}) {
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".how-card"));
    cards.forEach((card, i) => {
      const baseDelay = parseInt(card.getAttribute("data-delay"), 10) || i * 120;
      const id = setTimeout(() => card.classList.add("visible"), baseDelay + 400);
      timeoutsRef.current.push(id);
    });

    // cleanup: remove class and clear timeouts
    return () => {
      const cardsCleanup = Array.from(document.querySelectorAll(".how-card"));
      cardsCleanup.forEach((card) => card.classList.remove("visible"));
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <section className="story-section" aria-labelledby="story-heading">
      <div className="story-container">
        {/* NEW TOP HEADING */}
        <h2
          id="story-heading"
          style={{ margin: "0 0 18px", fontSize: "1.6rem", fontWeight: 700 }}
        >
          How it works
        </h2>

        <div className="story-text" aria-hidden="false">
          <p className="line">A bottle tossed aside, a street left silent, a city waiting to breathe again...</p>
          <p className="tagline">
            We don’t just collect waste — we <span>respond when you need us.</span>
          </p>
        </div>

        {/* How it works timeline */}
        <div className="how-grid" id="how-grid">
          <article className="how-card" data-delay="0">
            <div className="how-step-icon" aria-hidden="true">
              1
            </div>
            <div className="how-step-body">
              <h4>Schedule a pickup</h4>
              <p>Use the website form or call us — choose date &amp; time that suits you.</p>
            </div>
          </article>

          <article className="how-card" data-delay="150">
            <div className="how-step-icon" aria-hidden="true">
              2
            </div>
            <div className="how-step-body">
              <h4>We confirm</h4>
              <p>You'll receive a confirmation via SMS/WhatsApp with pickup window.</p>
            </div>
          </article>

          <article className="how-card" data-delay="300">
            <div className="how-step-icon" aria-hidden="true">
              3
            </div>
            <div className="how-step-body">
              <h4>We arrive</h4>
              <p>Uniformed BinOnCall team reaches your doorstep and loads the waste.</p>
            </div>
          </article>

          <article className="how-card" data-delay="450">
            <div className="how-step-icon" aria-hidden="true">
              4
            </div>
            <div className="how-step-body">
              <h4>Responsible disposal</h4>
              <p>Waste is taken to authorised disposal or recycling partners.</p>
            </div>
          </article>
        </div>

        <div style={{ height: 18 }} />
        <br />
        <p className="small-note" style={{ marginTop: 18 }}>
          Tip: For faster pickup, select "Express" at checkout or share your location on the
          schedule page.
        </p>
      </div>

      {/* Inline CSS (keeps everything exactly like your original) */}
      <style>{`
        :root{
          --green: #20c736;
          --dark: #0f1720;
          --muted: #6b7280;
          --bg1: linear-gradient(135deg, #f9fff9 0%, #e9f7ee 100%);
          --card-bg: rgba(255,255,255,0.8);
          --glass: rgba(255,255,255,0.6);
          --max-width: 1100px;
        }

        .story-section {
          background: var(--bg1);
          color: var(--dark);
          padding: 60px 5%;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.5s ease-in-out;
        }

        .story-container{
          max-width: var(--max-width);
          margin: 0 auto;
        }

        .story-text {
          margin: 0 auto 30px;
          max-width: 900px;
        }

        .story-text .line {
          font-size: 1.45rem;
          margin: 8px 0;
          opacity: 0;
          transform: translateY(22px);
          animation: fadeInUp 1.2s ease forwards;
        }
        .story-text .line:nth-of-type(2){ animation-delay: .9s; }

        .story-text .tagline {
          margin-top: 22px;
          font-size: 1.75rem;
          font-weight: 600;
          letter-spacing: 0.3px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 1.25s ease forwards;
          animation-delay: 1.9s;
        }
        .story-text .tagline span{ color: var(--green); }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* How it works card */
        .how-grid{
          display: grid;
          /* auto-fit with minmax gives 1 -> 2 -> more columns responsively */
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-top: 36px;
          align-items: stretch;
        }

        .how-card{
          background: var(--card-bg);
          backdrop-filter: blur(6px);
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 8px 22px rgba(16,24,40,0.06);
          display: flex;
          gap: 16px;
          align-items: center;
          min-height: 120px;
        }

        .how-step-icon{
          min-width: 68px;
          min-height: 68px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-weight:700;
          background: linear-gradient(180deg, rgba(32,199,54,0.12), rgba(32,199,54,0.06));
          color: var(--green);
          font-size: 1.25rem;
          flex-shrink:0;
        }

        .how-step-body h4{
          margin: 0 0 6px 0;
          font-size: 1.05rem;
        }
        .how-step-body p{
          margin: 0;
          font-size: 0.95rem;
          color: var(--muted);
        }

        /* For wider screens, transform each card into stacked style */
        @media(min-width: 880px){
          .how-card{
            flex-direction: column;
            padding: 24px;
            text-align: center;
            min-height: 160px;
          }
          .how-step-icon{
            margin-bottom: 10px;
          }
          .how-step-body p{ font-size:0.92rem; }
        }

        /* CTA */
        .cta-row{
          margin-top: 26px;
          display:flex;
          gap:12px;
          justify-content:center;
          align-items:center;
          flex-wrap:wrap;
        }
        .btn-primary{
          background: var(--green);
          color: white;
          padding: 12px 20px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          box-shadow: 0 8px 20px rgba(32,199,54,0.12);
        }
        .btn-secondary{
          background: transparent;
          border: none;
          color: var(--dark);
          font-weight: 600;
          text-decoration: underline;
          cursor: pointer;
        }

        .small-note{
          margin-top:14px;
          color:var(--muted);
          font-size:0.9rem;
        }

        /* animation delay for timeline items */
        .how-card { opacity:0; transform: translateY(14px); transition: all .6s cubic-bezier(.2,.9,.2,1); }
        .how-card.visible{ opacity:1; transform: translateY(0); }

        /* responsive tweaks */
        @media(max-width:520px){
          .story-section { padding: 36px 4%; }
          .story-text .line{ font-size:1.15rem; }
          .story-text .tagline{ font-size:1.25rem; }
          .how-step-icon{ min-width:56px; min-height:56px; font-size:1rem; }
          .how-card { gap: 12px; padding: 14px; }
        }
      `}</style>
    </section>
  );
}
