import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fancy-navbar fixed-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold fs-3">
          🍽️ Happy Plate
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav gap-3 align-items-center">
            <li className="nav-item">
              <button className="nav-link nav-link-custom btn btn-link" onClick={() => scrollToSection("home")}>
                Home
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link nav-link-custom btn btn-link" onClick={() => scrollToSection("about")}>
                About
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link nav-link-custom btn btn-link" onClick={() => scrollToSection("menu")}>
                Menu
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link nav-link-custom btn btn-link" onClick={() => scrollToSection("team")}>
                Team
              </button>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/cart">
                    <i className="bi bi-cart3 fs-5"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/profile">
                    <i className="bi bi-person-circle fs-5"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light btn-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
