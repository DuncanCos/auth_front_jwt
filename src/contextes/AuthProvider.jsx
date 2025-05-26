import { createContext, useContext, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // set to false initially

  const fetchUser = () => {
    setLoading(true);
    console.log("Tentative de récupération des données...");
    try {
      axios
        .get("http://127.0.0.1:8080/me", { withCredentials: true })
        .then((res) => {
          console.log("Réponse reçue:", res);
          if (res.data == "notoken") {
            setUser(null);
          } else {
            setUser(res.data); // Assurez-vous d'accéder aux données
          }

          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
          setUser(null);
          setLoading(false);
        });
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
