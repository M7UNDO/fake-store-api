import React, { useState } from "react";
import "../styles/Carousel.css";

export default function Carousel({ children, slidesToShow = 4 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = React.Children.count(children);
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="custom-carousel-container">
      {/* Track Track Container Viewport Window */}
      <div className="carousel-window">
        <div 
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`
          }}
        >
          {React.Children.map(children, (child) => (
            <div 
              className="carousel-slide-item"
              style={{ flex: `0 0 ${100 / slidesToShow}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Understated Control Toggles */}
      {currentIndex > 0 && (
        <button className="carousel-nav-btn prev-btn" onClick={handlePrev} aria-label="Previous Slides">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      )}
      
      {currentIndex < maxIndex && (
        <button className="carousel-nav-btn next-btn" onClick={handleNext} aria-label="Next Slides">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      )}
    </div>
  );
}