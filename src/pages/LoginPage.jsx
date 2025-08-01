import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertMessage from "../components/AlertMessage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    console.log(email);
    console.log(password);

    axios
      .post(
        "http://127.0.0.1:8080/auth/login",
        {
          mail: email,
          password: password,
        },
        { withCredentials: true },
      )
      .then((responce) => {
        console.log(responce);
        showAlert("success");
      })
      .catch((err) => {
        console.log(err);
        showAlert("error");
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
        <form
          className="card-body"
          onSubmit={(e) => {
            e.preventDefault();
            Login();
          }}
        >
          <h2 className="text-2xl font-bold text-center mb-2">Connexion</h2>

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
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary">
              Se connecter
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm">
              Pas encore de compte ?{" "}
              <a href="#" className="link link-primary">
                Créez-en un
              </a>
            </p>
          </div>
        </form>
      </div>

      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          duration={3000}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
}
