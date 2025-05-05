import React from "react";

import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SubscribePage from "../pages/SubscribePage";
import UserPage from "../pages/UsersPage";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/users" element={<UserPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/subscribe" element={<SubscribePage />}></Route>
      </Routes>
    </>
  );
}
