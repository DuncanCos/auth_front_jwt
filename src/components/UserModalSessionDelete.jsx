// src/components/MyModal.jsx
import axios from "axios";
import React,{useState} from "react";
import AlertMessage from "./AlertMessage";

const UserModalSessionDelete = ({ show, onClose, userId, refresher }) => {


   const [alert, setAlert] = useState(null);
  
    const showAlert = (type) => {
      const message =
        type === "success"
          ? "Succès ! Tout s'est bien passé."
          : "Échec ! Une erreur est survenue.";
      setAlert({ type, message });
    };

  // delete sesion logic can be added here
  const handleDeleteSession = (sessionId) => {
    // Call API to delete session
    console.log(`Deleting session with ID: ${sessionId}`);
    // Add your API call logic here

    axios.delete(`http://127.0.0.1:8080/sessions/user/${userId}`,{ withCredentials: true,}).then((response) => {
      console.log("Session deleted successfully:", response);
      showAlert("success");
      refresher()
  }).catch((error) => {
      console.error("Error deleting session:", error);
      showAlert("error");
  });
  };

  const handleConfirmDelete = () => {
    handleDeleteSession(userId);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Suppression de session</h3>
        <p className="py-4">Êtes-vous sûr de vouloir supprimer la session de l'utilisateur avec l'ID {userId} ?</p>
      
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Fermer
          </button>
          <button className="btn btn-error" onClick={() => handleConfirmDelete()}>
            Confirmer
          </button>
        </div>
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
};

export default UserModalSessionDelete;
