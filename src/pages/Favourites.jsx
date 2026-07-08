import React, { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import FavouritesHero from "../assets/images/hero/kate-laine-PLH1lwjWvVg-unsplash.jpg"; // reuse product aesthetic
import "../styles/Products.css"; // Reuse product skeleton classes safely

export default function Favourites() {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div className="product-page">
      <Hero
        heroImg={FavouritesHero}
        heroAlt="Minimalist showcase space setup"
        heading="Your Curated Wishlist"
        subheading="Review and finalize items chosen for distinct quality, architectural aesthetic, and timeless composition."
      />
      <section className="product-section">
        <div className="search-status-header">
          <div className="status-text-pane">
            <h1 className="search-term-category">Saved Pieces</h1>
            <span className="results-counter">({favourites.length})</span>
          </div>
        </div>

        {favourites.length === 0 ? (
          <div style={{ textAlign: "center", padding: "8rem 2rem", fontSize: "1.6rem", color: "#767676" }}>
            <i className="fa-regular fa-heart" style={{ fontSize: "4rem", marginBottom: "2rem", color: "#111" }}></i>
            <p>Your wishlist is currently empty. Start exploring to save your favorites.</p>
          </div>
        ) : (
          <div className="product-grid">
            {favourites.map((product) => (
              <ProductCard
                key={product.id}
                src={product.image}
                alt={product.description}
                title={product.title}
                category={product.category}
                price={`R ${product.price}`}
                link={product.id}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}