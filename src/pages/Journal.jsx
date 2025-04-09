import React from 'react';
import Navbar from '../components/Navbar';

const Journal = () => (
  <div className="flex flex-col min-h-screen bg-gray-100">
    <Navbar />
    <main className="flex-grow p-6">
      <h1 className="text-3xl font-bold text-gray-800">Noise Journal</h1>
      <p className="mt-4 text-gray-600">Your noise exposure history (coming soon!)</p>
    </main>
    <footer className="bg-gradient-to-r from-teal-500 to-gray-800 text-white py-6">
      <div className="max-w-5xl mx-auto text-center">
        <p>&copy; 2025 NoiseMap. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

export default Journal;