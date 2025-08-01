import React, { useState, useEffect } from "react";
import axios from "axios";
import UserModalSessionDelete from "../components/UserModalSessionDelete";


export default function UserModalSession({
  show,
  onClose,
  userId,
  onEdit,
}) {
    const [showDeleteSessionModal, setShowDeleteSessionModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  useEffect(() => {
    if (userId != 0) {
      getUserSessions();
    }
  }, [userId]);

  const getUserSessions = () => {
    axios
      .get(`http://127.0.0.1:8080/sessions/user/session/${userId}`, {
        withCredentials: true,
      })
      .then((responce) => {
        console.log(responce);
        setSessions(responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [sesions, setSessions] = useState([
    {
      id: 0,
      device: "nonedevice",
      ip_address: "",
      user_agent: "",
      expires_at: "",
      created_at: "",
    },
  ]);

  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl">
        <h3 className="font-bold text-lg mb-4">Liste des utilisateurs</h3>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Devices</th>
                <th>Ip</th>
                <th>User Agent</th>
                <th>Expire</th>
                <th>Creation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sesions.map((session) => (
                <tr key={session.id}>
                  <td>{session.id}</td>
                  <td>{session.device}</td>
                  <td>{session.ip_address}</td>
                  <td>{session.user_agent}</td>
                  <td>
                    {new Date(session.expires_at).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    {new Date(session.created_at).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => onEdit(session.id)}
                      >
                        Éditer
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => {
                          setShowDeleteSessionModal(true);
                          setSelectedId(session.id);
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>

      <UserModalSessionDelete
        show={showDeleteSessionModal}
        onClose={() => setShowDeleteSessionModal(false)}
        userId={selectedId}
      />
    </div>
  );
}
