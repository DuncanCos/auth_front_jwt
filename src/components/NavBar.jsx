import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import axios from "axios";

export default function NavBar() {
  const navigate = useNavigate();

  const disconnecting = () => {
    axios.get("http://127.0.0.1:8080/logout",{ withCredentials: true}).then((responce) => {
      console.log(responce);
    });
    navigate('/')
  }

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
          <div 
          onClick={() => { disconnecting() }}
          className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
            disconnect
          </div>
        </div>
      </div>
    </nav>
  );
}
