// src/components/MyModal.jsx
import React from "react";

const UserModalDelete = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Etes vous sur de vouloir supprimer ce user
        </h3>
        <p className="py-4">Cet utilisateur cera supprimer definitivement</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Supprimer
          </button>
          <button className="btn" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModalDelete;
