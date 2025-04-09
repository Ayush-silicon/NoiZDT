import React from "react";
import { Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">NoiseMap</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Empowering communities to track and reduce noise pollution.
        </p>

        <div className="flex justify-center space-x-6 text-gray-600 dark:text-gray-300">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <Github size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <Twitter size={20} />
          </a>
          <a href="mailto:support@noisemap.org" className="hover:text-green-500">
            <Mail size={20} />
          </a>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} NoiseMap. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
