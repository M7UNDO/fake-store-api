import React, { useRef } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../styles/NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  function handleBack() {
    if (window.history.state && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(".error-code", 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1.2 }
    )
    .fromTo([".error-title", ".error-message"], 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 
      "-=0.8"
    )
    .fromTo(".btn", 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 
      "-=0.6"
    );
  }, { scope: containerRef });

  return (
    <div className="not-found-container" ref={containerRef}>
      <div className="not-found-content">
        <div className="error-code-wrapper">
          <h1 className="error-code">404</h1>
        </div>

        <h2 className="error-title">Page not found</h2>

        <p className="error-message">
          The page you are looking for doesn't exist or has been permanently moved to a new address.
        </p>

        <div className="btn-container">
          <button onClick={handleBack} className="btn btn-secondary">
            Go Back
          </button>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}