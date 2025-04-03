import React from 'react';
import NoiseMap from '../components/NoiseMap';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <section className="text-center py-10 bg-teal-600 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to NoiseMap</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover real-time noise levels in your city, find quiet spots, and contribute to a quieter urban life.
          </p>
        </section>

        <section className="p-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Live Noise Map
            </h2>
            <NoiseMap />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-teal-500 to-gray-800 text-white py-6">
        <div className="max-w-5xl mx-auto text-center">
          <p>© 2025 NoiseMap. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with <span className="text-red-400">♥</span> by Team Code-Red-005
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;