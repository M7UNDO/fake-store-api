import React, { useContext } from "react";
import "../styles/ProductCard.css";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";

export default function ProductCard({ src, alt, title, category, price, link }) {
  const { addToCart, cartItems } = useContext(CartContext);
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);

  const cartItem = cartItems.find((item) => item.id === link);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const favourited = isFavourite(link);

  const handleAddToBag = (e) => {
    e.preventDefault();
    addToCart({
      id: link,
      title,
      category,
      price: parseFloat(price.replace(/[^0-9.]/g, "")),
      image: src,
      description: alt
    });
  };

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite({
      id: link,
      title,
      category,
      price: parseFloat(price.replace(/[^0-9.]/g, "")),
      image: src,
      description: alt
    });
  };

  return (
    <figure className="product-card">
      <div className="image-holder">
        <img className="product-image" src={src} alt={alt} />
        <Link to={`/products/${link}`} className="product-link-overlay"></Link>
        <button 
          className={`wishlist-overlay-btn ${favourited ? "active" : ""}`} 
          onClick={handleFavouriteClick}
          aria-label="Toggle Favourite"
        >
          <svg viewBox="0 0 24 24" fill={favourited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="product-card-info">
        <div className="product-title">{title}</div>
        <div className="product-category">{category}</div>
        <div className="product-price">{price}</div>
        <button className="card-add-to-bag-btn" onClick={handleAddToBag}>
          {currentQuantity > 0 ? `Add to Bag (${currentQuantity})` : "Add to Bag"}
        </button>
      </div>
    </figure>
  );
}