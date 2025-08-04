import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // set to false initially
  const navigate = useNavigate();
  const location = useLocation();

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
    // setLoading(true);
    // console.log("utilisation du useverif",user)
    //useVerif();
    fetchUser();
  }, [location]);

  const   fetchUser = async () => {
    setLoading(true);
    // console.log("Tentative de récupération des données...");
    // console.log('fetchuser start')
   
      axios
        .get("http://127.0.0.1:8080/auth/me", { withCredentials: true })
        .then((res) => {
          console.log("Réponse reçue:", res.data);
          setUser(res.data)
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data)
         
          if (err.response.data == "refresh needed") {
            // axios pour rafraîchir le token
            axios
              .get("http://127.0.0.1:8080/auth/refresh", { withCredentials: true })
              .then((resp) => {
               
                console.log(resp);
                setUser(resp.data);
                setLoading(false);
              }).catch((error) => {
                console.log("voici un erreru")
                console.log(error);
                setUser(null);
                setLoading(false);
                navigate("/login");
              })
          }

          if (err.response.data == "relog needed"  ) {
            setUser(null);
            setLoading(false);
            navigate("/login");
          }else if (err.response.data == "no cookie"){
            setUser(null);
            setLoading(false);
          }
        });
    
  };

  const disconnectUser = () => {
    setLoading(true);
    console.log("Tentative de récupération des données...");

    axios
      .get("http://127.0.0.1:8080/auth/logout", { withCredentials: true })
      .then((responce) => {
        console.log(responce);
        setUser(null);
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        console.log("eeror");
        console.log(error.response.data);
        if (error.response.data == "relog needed") {

          setUser(null);
          setLoading(false);
          navigate("/login");
        }

        setLoading(false);
      })
  };

  const logUser = (password, email) => {
    return axios
      .post(
        "http://127.0.0.1:8080/auth/login",
        {
          mail: email,
          password: password,
        },
        { withCredentials: true },
      )
      .then((responce) => {
        console.log(responce);
        setUser(responce.data)
        return "isok";
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Échec de connexion");
      });
  }



  return (
    <AuthContext.Provider value={{ user, loading, fetchUser, disconnectUser, logUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
