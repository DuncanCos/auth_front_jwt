import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Accueil
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Connexion
          </Link>
          <Link
            to="/subscribe"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Inscription
          </Link>
          <Link
            to="/users"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Utilisateurs
          </Link>
        </div>
      </div>
    </nav>
  );
}
