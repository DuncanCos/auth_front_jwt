import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Tentative de récupération des données...");
    axios
      .get("http://localhost:8080/me", { withCredentials: true })

        setUser(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des données:", err);
        setUser(null);
      })
      .finally(() => {
        console.log("Chargement terminé");
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
