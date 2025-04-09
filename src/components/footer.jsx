import React from "react";
import { Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#111827", // dark gray
        borderTop: "1px solid #374151", // border
        marginTop: "64px",
        padding: "60px 20px",
        color: "#d1d5db", // text-gray-300
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "center",
        }}
      >
        {/* Brand */}
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#f3f4f6", // lighter gray
          }}
        >
          NoiseMap
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            color: "#9ca3af", // muted
            maxWidth: "400px",
            margin: 0,
          }}
        >
          Empowering communities to track and reduce noise pollution.
        </p>

        {/* Social Icons */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#d1d5db", transition: "color 0.2s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#3b82f6")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#d1d5db")}
          >
            <Github size={20} />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#d1d5db", transition: "color 0.2s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#60a5fa")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#d1d5db")}
          >
            <Twitter size={20} />
          </a>

          <a
            href="mailto:support@noisemap.org"
            style={{ color: "#d1d5db", transition: "color 0.2s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#34d399")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#d1d5db")}
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            marginTop: "16px",
          }}
        >
          © {currentYear} NoiseMap. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;