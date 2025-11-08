import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function AuthPage() {
  const { id } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Ici, vous pouvez ajouter la logique pour finaliser la création du compte
    console.log("ID:", id);
    console.log("Nouveau mot de passe:", password);

    // Exemple d'appel API pour finaliser la création du compte
    axios
      .post(`http://localhost:8080/auth/finalize/${id}`, {
        password: password,
      })
      .then((response) => {
        console.log("Compte créé avec succès :", response.data);
        alert("Compte créé avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de la création du compte :", error);
        alert("Une erreur est survenue lors de la création du compte.");
      });
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
      <div className="w-full max-w-xl p-8 space-y-4 bg-base-100 rounded-box shadow-md">
        <h1 className="text-2xl font-bold text-center">
          Finalisation de creation de compte
        </h1>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nouveau mot de passe</span>
                </label>
                <input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  className="input input-bordered"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              {password != "" ? (
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
              ) : (
                ""
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Confirmer le nouveau mot de passe
                  </span>
                </label>

                <input
                  type="password"
                  placeholder="Confirmez le nouveau mot de passe"
                  className="input input-bordered"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
              {password != "" &&
              confirmPassword != "" &&
              password != confirmPassword
                ? "it must be the same password"
                : "✔"}
            </div>
            <div className=" min-w-3xs card bg-base-200">
              <ul className="m-4 space-y-1">
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
            </div>
          </div>

          <div className="form-control mt-6">
            <button onClick={handleSubmit} className="btn btn-primary">
              verifier et finaliser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
