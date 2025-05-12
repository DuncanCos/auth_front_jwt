import React from "react";

import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SubscribePage from "../pages/SubscribePage";
import UserPage from "../pages/UsersPage";

import { Navigate } from "react-router-dom";
import { useAuth } from "../contextes/AuthProvider";

export default function Routing() {
  const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" replace />;

    return children;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/subscribe" element={<SubscribePage />}></Route>
      </Routes>
    </>
  );
}
