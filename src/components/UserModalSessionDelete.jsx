// src/components/MyModal.jsx
import React from "react";

const UserModalSessionDelete = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello !</h3>
        <p className="py-4">Ceci est une modale simple avec DaisyUI.</p>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModalSessionDelete;
