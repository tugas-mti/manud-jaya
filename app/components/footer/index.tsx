import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-gray-900 text-white py-6 relative">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-xl font-bold">MyWebsite</div>

        {/* Navigation Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <Link href="/about" className="hover:text-gray-400">About</Link>
          <Link href="/services" className="hover:text-gray-400">Services</Link>
          <Link href="/contact" className="hover:text-gray-400">Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://twitter.com" target="_blank" className="hover:text-gray-400">🐦</a>
          <a href="https://facebook.com" target="_blank" className="hover:text-gray-400">📘</a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-gray-400">🔗</a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
    </>
  );
};

export default Footer;
