import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoImage from '../assets/LOGO2.jpg'; // path updated for lowercase name

function Navbar({ onSettingsOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Temporary auth state (your friend will replace with Firebase)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Placeholder logout (Firebase will handle later)
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              {/* Image instead of icon */}
              <img
                src={LogoImage}
                alt="Auracare Logo"
                className="logo-img"
              />
              <span className="logo-text">Auracare</span>
            </div>

            <div className={isMenuOpen ? 'nav-links active' : 'nav-links'} id="nav-links">
              <NavLink to="/" className="nav-link" onClick={handleLinkClick}>Home</NavLink>
              <NavLink to="/dashboard" className="nav-link" onClick={handleLinkClick}>Dashboard</NavLink>
              <NavLink to="/mood" className="nav-link" onClick={handleLinkClick}>Mood Tracker</NavLink>
              <NavLink to="/journal" className="nav-link" onClick={handleLinkClick}>Journal</NavLink>
              <NavLink to="/chat" className="nav-link" onClick={handleLinkClick}>AI Chat</NavLink>
              <NavLink to="/assessments" className="nav-link" onClick={handleLinkClick}>Assessments</NavLink>
              <NavLink to="/resources" className="nav-link" onClick={handleLinkClick}>Resources</NavLink>

              {/* Login / Logout button */}
              {!isLoggedIn ? (
                <NavLink
                  to="/auth"
                  className="btn btn--primary btn--sm btn-white-text"
                  onClick={handleLinkClick}
                >
                  Login / Signup
                </NavLink>
              ) : (
                <button
                  className="btn btn--primary btn--sm btn-white-text"
                  onClick={() => {
                    handleLinkClick();
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              )}

              {/* Settings button */}
              <button
                className="btn btn--primary btn--sm btn-white-text"
                id="settings-btn"
                onClick={() => {
                  handleLinkClick();
                  onSettingsOpen();
                }}
              >
                Settings
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={isMenuOpen ? 'mobile-menu-toggle active' : 'mobile-menu-toggle'}
              id="mobile-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 999;
          background: #ffffff;
          border-bottom: none;
          box-shadow: none;
        }
        /* White text only for Login/Signup and Settings buttons */
        .btn-white-text {
          color: #ffffff !important;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .logo-img {
          height: 32px;
          width: 32px;
          object-fit: cover;
          border-radius: 50%; /* optional: makes it circular */
        }
        .logo-text {
          font-weight: bold;
          font-size: 1.2rem;
          color: inherit; /* keeps original color */
        }
      `}</style>
    </>
  );
}

export default Navbar;
