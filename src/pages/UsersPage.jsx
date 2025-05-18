import React, { useState, useEffect } from "react";
import { useAuth } from "../contextes/AuthProvider";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", email: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const { user, loading, fetchUser } = useAuth();

  useEffect(()=>{
    const loadUser = async () => {
      await fetchUser();
      console.log("Utilisateur après chargement :", user);
      };
      
      loadUser();

      
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.email) return;

    if (editingIndex !== null) {
      const updated = [...users];
      updated[editingIndex] = form;
      setUsers(updated);
      setEditingIndex(null);
    } else {
      setUsers([...users, form]);
    }

    setForm({ username: "", email: "" });
  };

  const handleEdit = (index) => {
    setForm(users[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
    if (editingIndex === index) {
      setForm({ username: "", email: "" });
      setEditingIndex(null);
    }
  };

  if (!user) {
    return <div>ya rien...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Gestion des Utilisateurs</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={form.username}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">
          {editingIndex !== null ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <ul>
        {users.map((user, index) => (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            <strong>{user.username}</strong> – {user.email}
            <button
              onClick={() => handleEdit(index)}
              style={{ marginLeft: "1rem" }}
            >
              Éditer
            </button>
            <button
              onClick={() => handleDelete(index)}
              style={{ marginLeft: "0.5rem" }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
