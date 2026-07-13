import React, { useState } from "react";
import "../styles/Carousel.css";

export default function Carousel({ children, slidesToShow = 4, infinite = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = React.Children.count(children);
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return infinite ? maxIndex : 0;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return infinite ? 0 : maxIndex;
      }
      return prev + 1;
    });
  };

  // Determine if navigation buttons should be rendered
  const showPrevBtn = infinite || currentIndex > 0;
  const showNextBtn = infinite || currentIndex < maxIndex;

  return (
    <div className="custom-carousel-container">
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

      {showPrevBtn && (
        <button className="carousel-nav-btn prev-btn" onClick={handlePrev} aria-label="Previous Slides">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      )}
      
      {showNextBtn && (
        <button className="carousel-nav-btn next-btn" onClick={handleNext} aria-label="Next Slides">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      )}
    </div>
  );
}