import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertMessage from "../components/AlertMessage";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Subcribing = () => {
    console.log(email);
    console.log(username);
    console.log(password);

    axios
      .post("http://127.0.0.1:8080/auth/subscribe", {
        mail: email,
        username: username,
        password: password,
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

  const criteria = [
    { label: "Au moins 8 caractères", test: (pw) => pw.length >= 8 },
    { label: "Une minuscule", test: (pw) => /[a-z]/.test(pw) },
    { label: "Une majuscule", test: (pw) => /[A-Z]/.test(pw) },
    { label: "Un chiffre", test: (pw) => /\d/.test(pw) },
    {
      label: "Un caractère spécial",
      test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    },
  ];

  const isSecure = criteria.every((c) => c.test(password));


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <form
          className="card-body"
          onSubmit={(e) => {
            e.preventDefault();
            Subcribing();
          }}
        >
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

          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text">Nom d’utilisateur</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="votre nom d’utilisateur"
              className="input input-bordered"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Mot de passe</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="input input-bordered"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <ul className="mt-4 space-y-1">
          {criteria.map((c, index) => (
            <li key={index} className={`text-sm flex items-center`}>
              <span
                className={`mr-2 badge ${
                  c.test(password) ? "badge-success" : "badge-error"
                }`}
              >
                {c.test(password) ? "✔" : "✘"}
              </span>
              {c.label}
            </li>
          ))}
        </ul>

        <div
          className={`mt-4 alert ${
            isSecure ? "alert-success" : "alert-error"
          }`}
        >
          {isSecure ? (
            <span>Mot de passe sécurisé ✅</span>
          ) : (
            <span>Mot de passe non sécurisé ❌</span>
          )}
        </div>
      

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              S'inscrire
            </button>
          </div>

          <p className="text-sm text-center text-gray-500 mt-4">
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="link link-primary">
              Connectez-vous
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
