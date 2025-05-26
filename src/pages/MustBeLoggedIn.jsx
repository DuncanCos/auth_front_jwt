import React from "react";

const MustBeLoggedIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center p-8 rounded-box shadow-lg bg-base-100 max-w-md">
        <h1 className="text-3xl font-bold text-error mb-4">Accès refusé</h1>
        <p className="text-lg mb-6">
          Vous devez être connecté pour accéder à cette page.
        </p>
        <a href="/login" className="btn btn-primary">
          Se connecter
        </a>
      </div>
    </div>
  );
};

export default MustBeLoggedIn;
