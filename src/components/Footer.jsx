import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to The Pavilion updates.");
  };

  return (
    <footer className="global-footer-element">
      <div className="footer-top-grid">
        {/* Brand & Newsletter Column */}
        <div className="footer-column brand-editorial-col">
          <div className="footer-brand-logo">The Pavilion</div>
          <p className="brand-philosophy">
            A curated destination for architectural garments, minimal staples, and contemporary tech options 
            engineered for modern life.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
            <label htmlFor="footer-email" className="newsletter-label">Subscribe to the Journal</label>
            <div className="input-group-row">
              <input 
                id="footer-email"
                type="email" 
                placeholder="Enter your email address" 
                required 
                className="newsletter-field"
              />
              <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                <i className="fa-solid fa-arrow-right-long"></i>
              </button>
            </div>
          </form>
        </div>

        {/* Categories Column */}
        <div className="footer-column">
          <h4>Collections</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => navigate("/products?category=men's clothing")}>Men's Apparel</button></li>
            <li><button onClick={() => navigate("/products?category=women's clothing")}>Women's Apparel</button></li>
            <li><button onClick={() => navigate("/products?category=jewelery")}>Accessories & Jewelry</button></li>
            <li><button onClick={() => navigate("/products?category=electronics")}>Sleek Electronics</button></li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column">
          <h4>Company</h4>
          <ul className="footer-links-list">
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact & Support</Link></li>
            <li><Link to="/Favourites">My Wishlist</Link></li>
          </ul>
        </div>

        {/* Social Connections Column */}
        <div className="footer-column">
          <h4>Connect</h4>
          <p className="connect-context-text">Follow our seasonal lookbooks and release journals.</p>
          <div className="social-icon-row">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram Profile">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X Profile">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="mailto:support@thepavilion.com" aria-label="Email Correspondence">
              <i className="fa-regular fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-strip">
        <p>&copy; {new Date().getFullYear()} The Pavilion. All Architecture and Design Reserved.</p>
        <div className="legal-links-fallback">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}