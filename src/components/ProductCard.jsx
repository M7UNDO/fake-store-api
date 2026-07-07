import React from "react";
import "../styles/ProductCard.css";
import { Link } from "react-router-dom";

export default function ProductCard({src, alt, title, category, price, link}) {
  return (
    <figure className="product-card">
      <div className="image-holder">
        <img className="product-image" src={src} alt={alt} />
        <Link to={`/products/${link}`} className="product-link-overlay"></Link>
      </div>

      <div className="product-card-info">
        <div className="product-title">{title}</div>
        <div className="product-category">{category}</div>
        <div className="product-price">{price}</div>
      </div>
    </figure>
  );
}
