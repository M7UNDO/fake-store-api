import React from "react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";


export default function Hero({heroImg, heroAlt, heading, subheading, link, cta}) {
  return (
    <section className="hero-section">
      {heroImg && heroAlt && <img className="hero-img" src={heroImg} alt={heroAlt} />}

      <div className="hero-content">
        <h1 className="hero-heading">{heading}</h1>
        <p className="hero-subheading">{subheading}</p>
      </div>

      {link && cta && <Link to={link} className="hero-cta">{cta}</Link>}
    </section>
  );
}
