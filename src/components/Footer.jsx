import React from 'react'
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">The Pavillion</div>
          </div>
          <div className="footer-products">
            <h4>Connect</h4>

          </div>
          <div className="footer-social">
            <h4>Connect</h4>

          </div>
          <div className="footer-social">
            <h4>Connect</h4>

          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()}. Fake Store. All Rights Reserved</p>
        </div>
        
    </footer>
  )
}
