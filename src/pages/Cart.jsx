import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";

export default function Cart() {
  const { cartItems, totalPrice, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Thank you for shopping at The Pavilion! Your purchase was successful.");
    clearCart();
    navigate("/products");
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-view">
        <div className="empty-cart-content">
          <i className="fa-solid fa-bag-shopping empty-icon"></i>
          <h2>Your Shopping Bag is Empty</h2>
          <p>Discover minimal staples, custom tailoring, and contemporary tech options built to last.</p>
          <Link to="/products" className="continue-shop-btn">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-header-wrapper">
        <h1 className="cart-title">Your Shopping Bag</h1>
        <span className="cart-count-tracker">({cartItems.reduce((a, b) => a + b.quantity, 0)} items)</span>
      </div>

      <div className="cart-layout-grid">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-row">
              <div className="cart-img-box">
                <img src={item.image} alt={item.title} className="cart-row-img" />
              </div>
              
              <div className="cart-row-details">
                <div className="details-header">
                  <h3>{item.title}</h3>
                  <p className="cart-row-category">{item.category}</p>
                </div>
                <p className="cart-row-unit-price">R {Number(item.price).toFixed(2)}</p>
              </div>

              <div className="quantity-controller">
                <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="qty-indicator">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>

              <div className="cart-row-total">
                <p>R {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary-card">
          <h2>Summary</h2>
          <div className="summary-line">
            <span>Subtotal</span>
            <span className="value-light">R {totalPrice}</span>
          </div>
          <div className="summary-line">
            <span>Estimated Shipping</span>
            <span className="free-badge">Complimentary</span>
          </div>
          <hr className="summary-divider" />
          <div className="summary-line total-line">
            <span>Total Owed</span>
            <span className="final-total-val">R {totalPrice}</span>
          </div>

          <button className="checkout-cta-btn" onClick={handleCheckout}>
            Proceed to Checkout <i className="fa-solid fa-arrow-right-long icon-shift"></i>
          </button>
        </div>
      </div>
    </div>
  );
}