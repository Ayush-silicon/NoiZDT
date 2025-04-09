import React from "react";
import { motion } from "framer-motion";
import NoiseMap from "../components/NoiseMap";
import ForecastChart from "../components/ForecastChart";
import AlertBanner from "../components/AlertBanner";              
import QuietFinder from "../components/QuietFinder";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div className="relative overflow-hidden dark:bg-gray-950 transition-colors duration-300 min-h-screen">
  {/* Animated SVG Background */}
  <div className="absolute inset-0 -z-10">
    <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
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

  {/* Hero Section */}
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
    <motion.h1
      className="text-3xl sm:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Discover the Soundscape of Your City
    </motion.h1>
    <motion.p
      className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      Track, report, and explore noise levels in real-time with NoiseMap.
    </motion.p>
    <motion.a
      href="#map"
      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      Explore Map
    </motion.a>
  </section>

  {/* Main Content Sections */}
  <section id="map" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
    <AlertBanner />

    <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
      <NoiseMap />
    </div>

    <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Forecast Noise Trends</h2>
      <ForecastChart />
    </div>

    <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Find a Quiet Spot</h2>
      <QuietFinder />
    </div>
  </section>

  {/* Footer Section */}
  <Footer />
</div>
    
  );
};

export default Home;
