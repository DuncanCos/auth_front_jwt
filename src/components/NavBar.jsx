import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

import { useAuth } from "../contextes/AuthProvider";

export default function NavBar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const disconnecting = () => {
    axios
      .get("http://127.0.0.1:8080/logout", { withCredentials: true })
      .then((responce) => {
        console.log(responce);
      })
      .catch((error) => {
        console.log("eeror");
        console.log(error.response.data);
        if (error.response.data == "relog needed") {
          axios
            .get("http://127.0.0.1:8080/refresh", { withCredentials: true })
            .then((resp) => {
              console.log(resp);
              if (resp.data == "token refreshed") {
                axios
                  .get("http://127.0.0.1:8080/logout", {
                    withCredentials: true,
                  })
                  .then((responce) => {
                    console.log(responce);
                  })
                  .catch((error) => {
                    console.log("eeror");
                    console.log(error);
                  });
              }
            });
        }
      });
    navigate("/");
  };

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
            onClick={() => {
              disconnecting();
            }}
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            disconnect
          </div>
          <div>{user}</div>
        </div>
      </div>
    </nav>
  );
}
