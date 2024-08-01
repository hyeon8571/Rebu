import React from "react";
import { Route, Routes } from "react-router-dom";
import AppStart from "../views/AppStart";
import Main from "../views/Main";
import Notfound from "../views/Notfound";
import Login from "../views/Login";
import FindEmail from "../views/FindEmail";
import ChangePassword from "../views/ChangePassword";
import Signup from "../views/Signup";
import ChangePasswordCompl from "../views/ChangePasswordCompl";
import SignupForm2 from "../components/forms/SignupForm2";

const AppRoutes = () => (
  <Routes>
    <Route path="/start" element={<AppStart />} />
    <Route path="/main" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/login/password" element={<ChangePassword />} />
    <Route path="login/passwordChanged" element={<ChangePasswordCompl />} />
    <Route path="/login/email" element={<FindEmail />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signup/step2" element={<SignupForm2 />} />
    {/* <Route path="*" element={<Notfound />} /> */}
  </Routes>
);

export default AppRoutes;
