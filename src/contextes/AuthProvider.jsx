import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // set to false initially
  const navigate = useNavigate();

  const useVerif = async () => {

    try {
      const res = await api.get("http://127.0.0.1:8080/auth/me", { withCredentials: true }); // vérifie l'utilisateur via le cookie
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    useVerif();
  }, []);

  const fetchUser = () => {
    setLoading(true);
    console.log("Tentative de récupération des données...");
    try {
      axios
        .get("http://127.0.0.1:8080/auth/me", { withCredentials: true })
        .then((res) => {
          console.log("Réponse reçue:", res);
          if (res.data == "notoken" || res.data == "no cookie") {
            setUser(null);
          }
          else if (res.data == "relog needed") {
            // redirection vers la page de connexion
            navigate("/login");
          } else if (res.data == "refresh needed") {
            // axios pour rafraîchir le token
            axios
              .get("http://127.0.0.1:8080/auth/refresh", { withCredentials: true })
              .then((resp) => {
                console.log(resp);
                if (resp.data == "isok") {
                  setUser(resp.data);
                  setLoading(false);
                } else if (resp.data == "relog needed") {
                  navigate("/login");
                }
              })
          }
          else {
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

  const disconnectUser = () => {
    setLoading(true);
    console.log("Tentative de récupération des données...");
    try {
      axios
        .get("http://127.0.0.1:8080/auth/logout", { withCredentials: true })
        .then((responce) => {
          console.log(responce);
          setUser(null);
          setLoading(false);
        })
        .catch((error) => {
          console.log("eeror");
          console.log(error.response.data);
          if (error.response.data == "relog needed") {
            axios
              .get("http://127.0.0.1:8080/auth/refresh", { withCredentials: true })
              .then((resp) => {
                console.log(resp);
                if (resp.data == "token refreshed") {
                  axios
                    .get("http://127.0.0.1:8080/auth/logout", {
                      withCredentials: true,
                    })
                    .then((responce) => {
                      console.log(responce);
                      setUser(null);
                      setLoading(false);
                    })
                    .catch((error) => {
                      console.log("eeror");
                      console.log(error);
                      setLoading(false);
                    });
                }
              });
          }
        });
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
      setUser(null);
    }

  };



  return (
    <AuthContext.Provider value={{ user, loading, fetchUser, disconnectUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
