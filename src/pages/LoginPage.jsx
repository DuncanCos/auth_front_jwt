import React from "react";
import { useState, useEffect } from "react";



import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contextes/AuthProvider";

export default function LoginPages() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, logUser } = useAuth();
  const navigate = useNavigate();


  const Loginin = () => {
    console.log("email of login");
    console.log("mail", email);
    console.log(password);

    logUser(password, email)
      .then((test) => {
        console.log("test commexion");
        setEmail("");
        setPassword("");
       
        navigate("/");
      })
      .catch((error) => {
        
      });
  };

  if (user) {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full card shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          EZPlay Connexion
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">eMail</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* <a href="#" className="text-sm link">J'ai oublié mon mot de passe</a> */}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              Loginin();
            }}
            className="btn btn-primary w-full"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}
