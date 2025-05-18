import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    console.log(email);
    console.log(password);

    axios
      .post("http://127.0.0.1:8080/login" , {
        mail: email,
        password: password,
       
      },{ withCredentials: true})
      .then((responce) => {
        console.log(responce);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Connexion
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              className="mt-1 w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={() => Login()}
          >
            Se connecter
          </button>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          Pas encore de compte ?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Créez-en un
          </a>
        </p>
      </div>
    </div>
  );
}
