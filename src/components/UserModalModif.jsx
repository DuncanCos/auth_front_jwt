// src/components/MyModal.jsx
import React from "react";

const UserModalModif = ({ show, onClose, user, refresher }) => {


  
  if (!show) return null;
  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl">
        <h3 className="font-bold text-lg">Info/Modification Utilisateur</h3>
        <table className="table table-zebra w-full bg-base-100 shadow-xl rounded-lg">
          <thead>
            <tr>
              <th>Champ</th>
              <th>Valeur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold">ID</td>
              <td>
                <input
                  type="text"
                  defaultValue={user.id}
                  readOnly
                  disabled
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Email</td>
              <td>
                <input
                  type="email"
                  defaultValue={user.mail}
                  readOnly
                  disabled
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Nom d'utilisateur</td>
              <td>
                <input
                  type="text"
                  defaultValue={user.username}
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Mot de passe</td>
              <td>
                <input
                  type="text"
                  defaultValue={user.password}
                  readOnly
                  disabled
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Date de création</td>
              <td>
                <input
                  type="text"
                  defaultValue={new Date(user.created_at).toLocaleString(
                    "fr-FR",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                  readOnly
                  disabled
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Rôle</td>
              <td>
               

                <select className="select" value={user.roles}>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="modal-action">
          <button className="btn btn-primary">Enregistrer</button>
          <button className="btn" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModalModif;
