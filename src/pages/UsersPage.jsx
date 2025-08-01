import React, { useState, useEffect } from "react";
import { useAuth } from "../contextes/AuthProvider";
import axios from "axios";
import MustBeLoggedIn from "./MustBeLoggedIn";
import UserModalSession from "../components/UserModalSession";
import UserModalModif from "../components/UserModalModif";
import UserModalDelete from "../components/UserModalDelete";
import UserModalSessionDelete from "../components/UserModalSessionDelete";

export default function UserPage() {
  const [users, setUsers] = useState([]);

  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showModifModal, setShowModifModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSessionModal, setShowDeleteSessionModal] = useState(false);

  const { user, loading, fetchUser } = useAuth();

  const [selectedId, setSelectedId] = useState(0);
  const [selectedUser, setSelectedUser] = useState({
    id: 0,
    mail: "mail",
    password: "pass",
    username: "username",
    created_at: "2025-04-16T13:03:12.379612",
  });

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      fetchUser();
      
        console.log("fetching users");
        getingUsers();
      
      
     
      console.log("Utilisateur après chargement :", user);
    };

    loadUser();
  }, [user, refresh]);

  const getingUsers = () => {
    axios
      .get("http://127.0.0.1:8080/users/users", { withCredentials: true })
      .then((resp) => {
        console.log(resp.data);
        setUsers(resp.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data == "refresh needed") {
          axios
            .get("http://127.0.0.1:8080/auth/refresh", { withCredentials: true })
            .then((resp) => {
              console.log(resp);
              if (resp.data == "token refreshed") {
                axios
                  .get("http://127.0.0.1:8080/users/users", {
                    withCredentials: true,
                  })
                  .then((responce) => {
                    console.log(responce);
                    setUsers(responce.data);
                  })
                  .catch((error) => {
                    console.log("eeror");
                    console.log(error);
                  });
              }
            }).catch((error) => {
              
              console.log("Erreur lors du rafraîchissement du token :", error);
          });
        }
      });
  };

  if (!user) {
    return <MustBeLoggedIn />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Date de création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.mail}</td>
              <td>
                {new Date(user.created_at).toLocaleString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="space-x-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setShowModifModal(true);
                    setSelectedUser(user);
                  }}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setSelectedId(user.id);
                    setShowSessionModal(true);
                  }}
                >
                  Sessions
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedId(user.id);
                  }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModalSession
        show={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        userId={selectedId}
      />
      <UserModalModif
        show={showModifModal}
        onClose={() => setShowModifModal(false)}
        user={selectedUser}
      />
      <UserModalDelete
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        userId={selectedId}
        refresher={() => setRefresh(!refresh)}
      />

     

    </div>
  );
}
