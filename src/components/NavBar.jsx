import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

import { useAuth } from "../contextes/AuthProvider";

export default function NavBar() {
  const navigate = useNavigate();
  const { user, disconnectUser } = useAuth();

 

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-6">
          <Link
            to="/"
            className="link link-primary"
          >
            Accueil
          </Link>

          {user?.mail ?
            <>
              <Link
                to="/users"
                className="link link-primary"
              >
                Utilisateurs
              </Link>
              <div
                onClick={() => {
                  disconnectUser();
                }}
                className="link link-primary"
              >
                disconnect
              </div>
              <div className="badge">{user.mail}</div>
            </>
            :
            <>
              <Link
                to="/login"
                className="link link-primary"
              >
                Connexion
              </Link>
              <Link
                to="/subscribe"
                className="link link-primary"
              >
                Inscription
              </Link>
            </>

          }


        </div>
      </div>
    </nav>
  );
}
