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
        <i className="fa-solid fa-bag-shopping empty-icon"></i>
        <h2>Your Shopping Bag is empty</h2>
        <p>Discover minimal staples, custom tailoring, and contemporary tech options built to last.</p>
        <Link to="/products" className="continue-shop-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1>Your Shopping Bag</h1>

      <div className="cart-layout-grid">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-row">
              <img src={item.image} alt={item.title} className="cart-row-img" />
              
              <div className="cart-row-details">
                <h3>{item.title}</h3>
                <p className="cart-row-category">{item.category}</p>
                <p className="cart-row-unit-price">R {item.price}</p>
              </div>

              <div className="quantity-controller">
                <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease state">
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="qty-indicator">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase state">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>

              <div className="cart-row-total">
                <p>R {item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary-card">
          <h2>Summary</h2>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>R {totalPrice}</span>
          </div>
          <div className="summary-line">
            <span>Estimated Shipping</span>
            <span className="free-badge">Complimentary</span>
          </div>
          <hr />
          <div className="summary-line total-line">
            <span>Total Owed</span>
            <span>R {totalPrice}</span>
          </div>

          <button className="checkout-cta-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}