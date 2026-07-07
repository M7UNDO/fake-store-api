import React from "react";
import Hero from "../components/Hero";
import ClothingHero from "../assets/images/hero/alvin-MYfq3tf34p8-unsplash.jpg";
import "../styles/Home.css";

export default function Home() {
  return (
    <>
      <Hero
        heroImg={ClothingHero}
        heroAlt="Group of young adults enjoying a sunny day on a rooftop, embodying urban leisure and friendship."
        heading="Contemporary Style, Timeless Design"
        subheading="Discover a curated collection of clothing, accessories, and tech that blend minimalism with modern function."
        link="/products"
        cta="Explore Our Products"
      />

      <section className="category-section">
        <div className="section-heading">
          <h2>Categories</h2>
          <p className="section-subheading">
            Browse our selection of unique products, from contemporary fashion and sleek electronics to elegant
            jewellery and statement accessories. Whatever your style, we've got something that fits.
          </p>
        </div>

        <div className="category-container">
          <div className="category-item">
            <h3>Clothing</h3>
          </div>
          <div className="category-item">
            <h3>Accessories</h3>
          </div>
          <div className="category-item">
            <h3>Electronics</h3>
          </div>
        </div>
      </section>

      <section className="featured-products-section">
        <div className="section-heading">
          <h2>Featured Products</h2>
          <p className="section-subheading">
            Handpicked items that represent the best of what we offer, a blend of style, design, and function.
          </p>
        </div>

        <div className="featured-grid">
          <div className="featured-item item-1">Item 1</div>
          <div className="featured-item item-2">Item 2</div>
          <div className="featured-item item-3">Item 3</div>
          <div className="featured-item item-4">Item 4</div>
          <div className="featured-item item-5">Item 5</div>
        </div>
      </section>

      <section className="latest-arrivals-section">
        <div className="section-heading">
          <h2>Latest Arrivals</h2>
          <p className="section-subheading">
            Stay ahead of the curve with our newest releases. Each item is handpicked for quality, design, and
            originality, explore what's trending this season.
          </p>

          <div className="latest-arrival-container"></div>
        </div>
      </section>
    </>
  );
}
