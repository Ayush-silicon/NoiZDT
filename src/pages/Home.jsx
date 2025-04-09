import React from "react";
import { motion } from "framer-motion";
import NoiseMap from "../components/NoiseMap";
import ForecastChart from "../components/ForecastChart";
import AlertBanner from "../components/AlertBanner";
import QuietFinder from "../components/QuietFinder";
import Footer from "../components/footer";
import Navbar from "../components/Navbar"; // ✅ import your component-based navbar

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#0f172a",
        overflow: "hidden",
        color: "#fff",
        fontFamily: "sans-serif",
        transition: "all 0.3s",
      }}
    >
      {/* ✅ Navbar Component */}
      {/* <Navbar /> */}

      {/* Background SVG */}
      <div style={{ position: "absolute", inset: 0, zIndex: -10, paddingTop: "64px" }}>
        <svg
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#cfe9f1" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg)" />
          <circle cx="80%" cy="20%" r="200" fill="#bbdefb" opacity="0.4" />
          <circle cx="20%" cy="90%" r="150" fill="#b3e5fc" opacity="0.3" />
        </svg>
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, paddingTop: "80px" }}>
        {/* Hero Section */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "80px 20px",
            textAlign: "center",
          }}
        >
          <motion.h1
            style={{
              fontSize: "40px",
              fontWeight: "800",
              marginBottom: "16px",
              color: "#1f2937",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Discover the Soundscape of Your City
          </motion.h1>
          <motion.p
            style={{
              fontSize: "18px",
              maxWidth: "600px",
              margin: "0 auto 24px",
              color: "#4b5563",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Track, report, and explore noise levels in real-time with NoiseMap.
          </motion.p>
          <motion.a
            href="#map"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#2563eb",
              color: "#fff",
              borderRadius: "9999px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textDecoration: "none",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Explore Map
          </motion.a>
        </section>

        {/* Map + Forecast + Quiet Finder Sections */}
        <section
          id="map"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px 80px",
          }}
        >
          <AlertBanner />

          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              border: "1px solid #e5e7eb",
              marginBottom: "48px",
            }}
          >
            <NoiseMap />
          </div>

          <div
            id="forecast"
            style={{
              backgroundColor: "#1f2937",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              marginBottom: "48px",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "#fff" }}>
              Forecast Noise Trends
            </h2>
            <ForecastChart />
          </div>

          <div
            id="quiet"
            style={{
              backgroundColor: "#1f2937",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "#fff" }}>
              Find a Quiet Spot
            </h2>
            <QuietFinder />
          </div>
        </section>
      </main>

      {/* ✅ Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;