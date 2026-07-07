import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import "../styles/NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  function handleBack() {
    if (window.history.state && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  // Animation configuration for staggered content fade-ins
  const fadeUpVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: "easeOut"}},
  };

  const containerVariants = {
    hidden: {},
    visible: {transition: {staggerChildren: 0.15}},
  };

  return (
    <div className="not-found-container">
      <div className="bg-graphics-layer">
        <motion.div
          animate={{y: [0, -40, 0]}}
          transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
          className="orb orb-top-left"
        />
        <motion.div
          animate={{x: [0, -20, 0]}}
          transition={{duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1}}
          className="orb orb-bottom-right"
        />
      </div>

      {/* Main Structural Wrapper */}
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="not-found-content">
        {/* Animated 404 Visual Anchor */}
        <motion.div variants={fadeUpVariants} className="error-code-wrapper">
          <h1 className="error-code">404</h1>
          {/* Scanning light bar animation overlay */}
          <motion.div
            animate={{top: ["0%", "100%", "0%"]}}
            transition={{duration: 4, repeat: Infinity, ease: "linear"}}
            className="scanner-line"
          />
        </motion.div>

        {/* Text Area */}
        <motion.h2 variants={fadeUpVariants} className="error-title">
          Page not found
        </motion.h2>

        <motion.p variants={fadeUpVariants} className="error-message">
          The page you are looking for doesn't exist or has been permanently moved to a new address.
        </motion.p>

        {/* Mobile-first Navigation Layout */}
        <motion.div variants={fadeUpVariants} className="btn-container">
          <button onClick={handleBack} className="btn btn-secondary">
            ← Go Back
          </button>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
