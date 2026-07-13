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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
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

      <div className="nav-main-wrapper">
        <button
          className={`mobile-hamburger-trigger ${isMenuOpen ? "burger-active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation Options"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x-icon lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu-icon lucide-menu"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          )}
        </button>

        <Link to="/" className="brand-logo">
          The Pavilion
        </Link>

        <ul className={`navlinks-list ${isMenuOpen ? "mobile-drawer-open" : ""}`}>
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
      </div>
    </nav>
  );
}