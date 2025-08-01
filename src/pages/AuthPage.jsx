
import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function AuthPage() {
  const { id } = useParams();
 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    
    // Ici, vous pouvez ajouter la logique pour finaliser la création du compte
    console.log("ID:", id);
    console.log("Nouveau mot de passe:", password);
    
    // Exemple d'appel API pour finaliser la création du compte
    axios.post(`http://localhost:8080/auth/finalize/${id}`, {
        mail : "",
        username: "JeanDupont", // Remplacez par le nom d'utilisateur réel
      password: password,
    })
      .then(response => {
        console.log("Compte créé avec succès :", response.data);
        alert("Compte créé avec succès !");
      })
      .catch(error => {
        console.error("Erreur lors de la création du compte :", error);
        alert("Une erreur est survenue lors de la création du compte.");
      }
    );
  }

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
  <div className="w-full max-w-md p-8 space-y-4 bg-base-100 rounded-box shadow-md">
    <h1 className="text-2xl font-bold text-center">Finalisation de creation de compte</h1>
    <form className="space-y-4">

      <div>
        <label className="label">
          <span className="label-text">Nom d'utilisateur</span>
        </label>
        <p className="text-xl font-semibold">JeanDupont</p>
      </div>

      <div>
        <label className="label">
          <span className="label-text">Rang</span>
        </label>
        <p className="text-xl font-semibold">Administrateur</p>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Nouveau mot de passe</span>
        </label>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="input input-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirmer le nouveau mot de passe</span>
        </label>
        <input
          type="password"
          placeholder="Confirmez le nouveau mot de passe"
          className="input input-bordered"
        />
      </div>

      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          verifier et finaliser
        </button>
      </div>
    </form>
  </div>
</div>

  
  
  );
}
