import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../styles/Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ heroImg, heroAlt, heading, subheading, link, cta }) {
  const triggerRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(
    () => {
      if (!imgRef.current) return;

      gsap.fromTo(
        imgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: triggerRef, dependencies: [heroImg] }
  );

  return (
    <section ref={triggerRef} className="hero-section">
      {heroImg && heroAlt && (
        <img ref={imgRef} className="hero-img" src={heroImg} alt={heroAlt} />
      )}

      <div className="hero-content">
        <h1 className="hero-heading">{heading}</h1>
        <p className="hero-subheading">{subheading}</p>
      </div>

      {link && cta && (
        <Link to={link} className="hero-cta">
          {cta}
        </Link>
      )}
    </section>
  );
}