import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProducts } from "../api/products";
import "../styles/Searchbar.css";

export default function Searchbar({ autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setAllProducts(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
  }, [query, allProducts]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="search-bar-wrapper" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          ref={inputRef}
          type="text"
          className="global-search-field"
          placeholder="Search curated goods..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />
        <button type="submit" className="search-submit-icon" aria-label="Execute Query">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      {showDropdown && query.trim() && (
        <div className="search-predictive-dropdown">
          {suggestions.length > 0 ? (
            <>
              <div className="dropdown-section-title">Products</div>
              <div className="suggestions-list">
                {suggestions.slice(0, 4).map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="suggestion-item"
                    onClick={() => {
                      setQuery("");
                      setShowDropdown(false);
                    }}
                  >
                    <img src={product.image} alt={product.title} className="suggestion-img" />
                    <div className="suggestion-info">
                      <span className="suggestion-title">{product.title}</span>
                      <span className="suggestion-price">R {product.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="no-results-message">No items found matching "{query}"</div>
          )}
        </div>
      )}
    </div>
  );
}