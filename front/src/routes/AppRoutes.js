import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../views/Login";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/main" />
    <Route path="/login/email" />
    <Route path="/login/password" />
    <Route path="/signup" />
  </Routes>
);

export default AppRoutes;
