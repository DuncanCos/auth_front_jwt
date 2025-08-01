import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SubscribePage from "../pages/SubscribePage";
import UserPage from "../pages/UsersPage";
import AuthPage from "../pages/AuthPage";

// import { Navigate } from "react-router-dom";
// import { useAuth } from "../contextes/AuthProvider";

export default function Routing() {
  // const { user, loading, fetchUser } = useAuth();

  // useEffect(() => {
  //   fetchUser(); // ← on déclenche ici
  // }, []);

  // const ProtectedRoute = ({ children }) => {
  //   if (loading) return <div>Loading...</div>;

  //   if (!user) {
  //     return <Navigate to="/login" replace />;
  //   }

  //   return children;
  // };

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route
          path="/users"
          element={
              <UserPage />
           
          }
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/subscribe" element={<SubscribePage />}></Route>
        
        <Route
          path="/auth/:id"
          element={
            <AuthPage />
          }
        ></Route>
      </Routes>
    </>
  );
}
