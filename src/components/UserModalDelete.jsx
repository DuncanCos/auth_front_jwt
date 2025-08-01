// src/components/MyModal.jsx
import axios from "axios";
import React,{useState} from "react";
import AlertMessage from "./AlertMessage";

const UserModalDelete = ({ show, onClose, userId, refresher }) => {

  const [alert, setAlert] = useState(null);
  
    const showAlert = (type) => {
      const message =
        type === "success"
          ? "Succès ! Tout s'est bien passé."
          : "Échec ! Une erreur est survenue.";
      setAlert({ type, message });
    };

  // delete sesion logic can be added here
  const handleDeleteUser = (userId) => {
    // Call API to delete session
    console.log(`Deleting users with ID: ${userId}`);
    // Add your API call logic here

    axios.delete(`http://127.0.0.1:8080/users/user/${userId}`,{ withCredentials: true,}).then((response) => {
      console.log("user deleted successfully:", response);
      showAlert("success");
  }).catch((error) => {
      console.error("Error deleting user:", error);
      showAlert("error");
  });
  };

  const handleConfirmDelete = () => {
    handleDeleteUser(userId);
    refresher(); // Call the refresher function to update the user list
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Etes vous sur de vouloir supprimer ce user
        </h3>
        <p className="py-4">Cet utilisateur cera supprimer definitivement</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleConfirmDelete}>
            Supprimer
          </button>
          <button className="btn" onClick={onClose}>
            Annuler
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

export default UserModalDelete;
