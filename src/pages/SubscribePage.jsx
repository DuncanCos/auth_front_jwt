import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertMessage from "../components/AlertMessage";

export default function SubscribePage() {
  const [email, setEmail] = useState("");

  const Subcribing = () => {
    console.log(email);
    axios
      .post("http://127.0.0.1:8080/auth/subscribe", {
        mail: email,
      })
      .then((responce) => {
        console.log(responce);
      });
  };

  const [alert, setAlert] = useState(null);

  const showAlert = (type) => {
    const message =
      type === "success"
        ? "Succès ! Tout s'est bien passé."
        : "Échec ! Une erreur est survenue.";
    setAlert({ type, message });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">
            Créer un compte
          </h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="exemple@email.com"
              className="input input-bordered"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-6">
            <button onClick={Subcribing} className="btn btn-primary">
              S'inscrire
            </button>
          </div>

          <p className="text-sm text-center text-gray-500 mt-4">
            Vous avez déjà un compte ?
            <a href="/login" className="link link-primary">
              Connectez-vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
