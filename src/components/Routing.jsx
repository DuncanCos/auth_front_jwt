import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SubscribePage from "../pages/SubscribePage";
import UserPage from "../pages/UsersPage";
import AuthPage from "../pages/AuthPage";
import MenuPage from "../pages/MenuPage";
import { useAuth } from "../contextes/AuthProvider";

export default function Routing() {
  const { loading } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<MenuPage />}></Route>
        {loading ? (
          <p>
            {" "}
            <span className="loading loading-spinner loading-xs"></span>{" "}
            Chargement des pages...
          </p>
        ) : (
          <>
            <Route path="/users" element={<UserPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/subscribe" element={<SubscribePage />}></Route>
          </>
        )}

        <Route path="/auth/:id/:mode" element={<AuthPage />}></Route>
      </Routes>
    </>
  );
}
