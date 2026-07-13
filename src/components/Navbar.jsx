import { useContext, useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { navLinks } from "../../constants";
import Searchbar from "./Searchbar";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { totalItemsCount } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState("main");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuOpen(false);
    setMobileView("main");
    setIsSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen, isSearchOpen]);

  return (
    <header className="sticky-header-container">
      <div className="desktop-architecture">
        <div className="topbar">
          <div className="topbar-inner">
            <span className="topbar-link">Help & Support</span>
            <div className="vertical-divider"></div>
            <div className="auth-trigger-zone">
              {user ? (
                <span className="user-greeting">Hi, {user.user_metadata?.username}</span>
              ) : (
                <Link to="/login" className="login-anchor">
                  Login
                </Link>
              )}
              <i className="fa-solid fa-user profile-icon"></i>

              {user && (
                <div className="user-dropdown-menu">
                  <h4>Account Management</h4>
                  <button className="dropdown-action-btn">Profile Settings</button>
                  <Link to="/Favourites" className="dropdown-action-btn">
                    My Wishlist
                  </Link>
                  <button className="dropdown-action-btn logout-accent" onClick={logout}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="nav-main-wrapper">
          <Link to="/" className="brand-logo">
            The Pavilion
          </Link>

          <ul className="navlinks-list">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`nav-item-node ${link.id === "products" ? "dropdown-link-parent" : ""}`}
              >
                <NavLink
                  className={({ isActive }) => `nav-anchor-element ${isActive ? "active-route" : ""}`}
                  to={`${link.path}`}
                >
                  {link.title}
                </NavLink>

                {link.id === "products" && (
                  <div className="nav-mega-dropdown-panel">
                    <div className="dropdown-column">
                      <h4>Fashion</h4>
                      <button onClick={() => navigate("/products?category=men's clothing")}>Men's Clothing</button>
                      <button onClick={() => navigate("/products?category=women's clothing")}>Women's Clothing</button>
                    </div>
                    <div className="dropdown-column">
                      <h4>Lifestyle</h4>
                      <button onClick={() => navigate("/products?category=jewelery")}>Jewelry</button>
                      <button onClick={() => navigate("/products?category=electronics")}>Electronics</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-utility-actions">
            <Searchbar />
            <Link to="/cart" className="bag-icon-container">
              <div className="bag-icon-frame">
                <i className="fa-solid fa-bag-shopping"></i>
                {totalItemsCount > 0 && <span className="cart-badge-counter">{totalItemsCount}</span>}
              </div>
            </Link>
          </div>
        </nav>
      </div>

      <div className="mobile-architecture">
        <nav className="mobile-nav-bar">
          <button
            className="mobile-icon-btn"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          <Link to="/" className="brand-logo">
            The Pavilion
          </Link>

          <div className="mobile-utility-actions">
            <button className="mobile-icon-btn" onClick={() => setIsSearchOpen(true)}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <Link to="/cart" className="bag-icon-container">
              <div className="bag-icon-frame">
                <i className="fa-solid fa-bag-shopping"></i>
                {totalItemsCount > 0 && <span className="cart-badge-counter">{totalItemsCount}</span>}
              </div>
            </Link>
          </div>
        </nav>

        <div className={`mobile-search-overlay ${isSearchOpen ? "search-open" : ""}`}>
          <div className="mobile-search-header">
            <Searchbar autoFocus={isSearchOpen} />
            <button className="mobile-close-btn" onClick={() => setIsSearchOpen(false)}>
              Cancel
            </button>
          </div>
        </div>

        <div className={`mobile-menu-drawer ${isMenuOpen ? "drawer-open" : ""}`}>
          <div className="mobile-drawer-header">
            {mobileView === "products" ? (
              <button className="mobile-back-btn" onClick={() => setMobileView("main")}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            ) : (
              <div></div>
            )}
            {mobileView === "products" && (
              <span className="mobile-header-brand">The Pavilion</span>
            )}
            <button className="mobile-close-btn" onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="mobile-drawer-content">
            {mobileView === "main" && (
              <>
                {user && (
                  <div className="mobile-user-greeting">
                    <i className="fa-regular fa-user"></i>
                    <span>Hi, {user.user_metadata?.username}</span>
                  </div>
                )}
                
                <ul className="mobile-link-list">
                  <li className="mobile-list-item">
                    <Link to="/" className="mobile-main-link">Home</Link>
                  </li>
                  <li className="mobile-list-item" onClick={() => setMobileView("products")}>
                    <span className="mobile-main-link">Products</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="mobile-list-item">
                    <Link to="/about" className="mobile-main-link">About Us</Link>
                  </li>
                  <li className="mobile-list-item">
                    <Link to="/contact" className="mobile-main-link">Contact</Link>
                  </li>
                </ul>

                <div className="mobile-bottom-actions">
                  {user ? (
                    <>
                      <Link to="/Favourites" className="mobile-action-link">Favourites</Link>
                      <button onClick={logout} className="mobile-action-link">Logout</button>
                    </>
                  ) : (
                    <Link to="/login" className="mobile-action-link">Login</Link>
                  )}
                </div>
              </>
            )}

            {mobileView === "products" && (
              <>
                <h3 className="mobile-submenu-title">PRODUCTS</h3>
                <ul className="mobile-link-list">
                  <li className="mobile-list-item">
                    <Link to="/products" className="mobile-sub-link">All Products</Link>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="mobile-list-item">
                    <button onClick={() => navigate("/products?category=men's clothing")} className="mobile-sub-link">Men's Clothing</button>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="mobile-list-item">
                    <button onClick={() => navigate("/products?category=women's clothing")} className="mobile-sub-link">Women's Clothing</button>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="mobile-list-item">
                    <button onClick={() => navigate("/products?category=jewelery")} className="mobile-sub-link">Jewelry</button>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="mobile-list-item">
                    <button onClick={() => navigate("/products?category=electronics")} className="mobile-sub-link">Electronics</button>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}