import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-xl font-bold">Gesture Controller</div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          </li>
          <li>
            <Link to="/guide" className="hover:text-blue-400 transition">Guide</Link>
          </li>
          <li>
            <Link to="/feedback" className="hover:text-blue-400 transition">Feedback</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
