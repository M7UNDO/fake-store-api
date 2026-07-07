import {useContext, useState, useEffect} from "react";
import {NavLink, Link, useLocation} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {navLinks} from "../../constants";
import "../styles/Navbar.css";

export default function Navbar() {
  const {user, logout} = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Automatically lock scroll or close menu on navigation mutations
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar-element">
      {/* Premium Top Sub-Navigation Layer */}
      <div className="topbar">
        <div className="topbar-inner">
          <span className="topbar-link">Help & Support</span>
          <div className="vertical-divider"></div>
          <div className="auth-trigger-zone">
            {user ? (
              <span className="user-greeting">Hi, Mfundo</span>
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
                <Link to="/wishlist" className="dropdown-action-btn">
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-x-icon lucide-x"
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-menu-icon lucide-menu"
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
            <li key={link.id} className="nav-item-node">
              <NavLink
                className={({isActive}) => `nav-anchor-element ${isActive ? "active-route" : ""}`}
                to={`${link.path}`}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-utility-actions">
          <div className="search-bar-wrapper">
            <input type="text" className="global-search-field" placeholder="Search curated goods..." />
            <button className="search-submit-icon" aria-label="Execute Query">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <Link to="/cart" className="bag-icon-container">
            <div className="bag-icon-frame">
              <i className="fa-solid fa-bag-shopping"></i>
              <span className="cart-badge-counter">1</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
