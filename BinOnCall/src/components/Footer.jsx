import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Top green line */}
      <div className="footer-line"></div>

      <div className="footer-columns">
        <div className="footer-column">
          <h4>Get to Know Us</h4>
          <ul>
            <li><Link to="/career">Careers</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About BinOnCall</Link></li>
            <li><Link to="/investors">Investor Relations</Link></li>
            <li><Link to="/binservices">BinOnCall Services</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Make Money with Us</h4>
          <ul>
            <li><Link to="/sell">Sell Items</Link></li>
            <li><Link to="/affiliate">Become an Affiliate</Link></li>
            <li><Link to="/advertise">Advertise Your Products</Link></li>
            <li><Link to="/pickup">Host a Pickup Hub</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Our Services</h4>
          <ul>
            <li><Link to="/pickupscheduling">Pickup Scheduling</Link></li>
            <li><Link to="/recycling">Recycling Services</Link></li>
            <li><Link to="/bulk">Bulk Waste Collection</Link></li>
            <li><Link to="/express">Express Pickups</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Need Help?</h4>
          <ul>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/terms">Terms & Policies</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} BinOnCall. All Rights Reserved.
      </div>

      {/* Bottom green line */}
      <div className="footer-line"></div>
    </footer>
  );
};

export default Footer;
