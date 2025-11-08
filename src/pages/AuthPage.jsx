import api from "../../components/api";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { id, mode } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [titre, setTitre] = useState("Finalisation de creation de compte");
  const [confirmTitre, setConfirmTitre] = useState("Compte créé avec succès");

  let navigate = useNavigate();

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Exemple d'appel API pour finaliser la création du compte
    api
      .post(`/auth/finalize/${id}`, {
        password: password,
      })
      .then((response) => {
        console.log("Compte créé avec succès :", response.data);
        alert(confirmTitre);
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

  useEffect(() => {
    if (mode == "create") {
      setTitre("Finalisation de creation de compte");
      setConfirmTitre("Compte créé avec succès");
    } else if (mode == "new") {
      setTitre("Compte créé avec succès");
      setConfirmTitre("Mot de passe changer avec succes");
    } else if (mode == "forgot") {
      setTitre("Reinitialisation de Mot De Passe");
      setConfirmTitre("Mot de passe Reinitialiser avec succes");
    }
  }, []);

  const isSecure = criteria.every((c) => c.test(password));

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-xl p-8 space-y-4 bg-base-100 rounded-box shadow-md">
        <h1 className="text-2xl font-bold text-center">{titre}</h1>
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
                : ""}
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

          {isSecure && confirmPassword == password ? (
            <div className="form-control mt-6">
              <button onClick={handleSubmit} className="btn btn-primary">
                verifier et finaliser
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
