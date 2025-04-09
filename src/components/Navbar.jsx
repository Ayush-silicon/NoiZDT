import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.backgroundColor = "#111827";
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.style.backgroundColor = "#ffffff";
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const linkStyle = {
    textDecoration: "none",
    color: darkMode ? "#d1d5db" : "#374151",
    fontWeight: 500,
    transition: "color 0.3s",
  };

  const hoverStyle = {
    color: darkMode ? "#60a5fa" : "#2563eb",
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/journal", label: "Journal" },
    { to: "/report", label: "Report" },
    { to: "/quiet", label: "Quiet Finder" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: darkMode ? "rgba(17,24,39,0.8)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={logo}
            alt="NoiseMap Logo"
            style={{ height: "40px", width: "40px", borderRadius: "50%" }}
          />
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: darkMode ? "#ffffff" : "#1f2937",
            }}
          >
            NoiseMap
          </span>
        </div>

        {/* Desktop Nav */}
        <ul
          style={{
            display: "none",
            gap: "24px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="nav-links"
        >
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                style={linkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = hoverStyle.color)}
                onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              style={{
                ...linkStyle,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = hoverStyle.color)}
              onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
            >
              Login
            </button>
          </li>
        </ul>

        {/* Mobile & Dark Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={toggleDarkMode}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {darkMode ? <Sun size={20} color={linkStyle.color} /> : <Moon size={20} color={linkStyle.color} />}
          </button>

          {/* Mobile Menu Toggle */}
          <div className="menu-icon" style={{ display: "block", cursor: "pointer" }} onClick={toggleMenu}>
            {menuOpen ? <X size={24} color={linkStyle.color} /> : <Menu size={24} color={linkStyle.color} />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            padding: "16px 24px",
            backgroundColor: darkMode ? "#111827" : "#ffffff",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={toggleMenu}
              style={{
                ...linkStyle,
                color: darkMode ? "#f9fafb" : "#111827",
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleMenu}
            style={{
              ...linkStyle,
              background: "none",
              border: "none",
              textAlign: "left",
              color: darkMode ? "#f9fafb" : "#111827",
            }}
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;