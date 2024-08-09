import React from "react";
import { Route, Routes } from "react-router-dom";
import AppStart from "../views/AppStart";
import Main from "../views/Main";
import Notfound from "../views/Notfound";
import Login from "../views/Login";
import FindEmail from "../views/FindEmail";
import FindEmailComp from "../views/FindEmailComp";
import ChangePassword from "../views/ChangePassword";
import ChangePasswordCompl from "../views/ChangePasswordCompl";
import Signup from "../views/Signup";
import SignupComp from "../views/SignupComp"
import Error from "../views/Error"
import TestProfile from "../views/TestProfile";


const AppRoutes = () => (
  <Routes>
    <Route path="/start" element={<AppStart />} />
    <Route path="/main" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/login/password" element={<ChangePassword />} />
    <Route path="login/password-changed" element={<ChangePasswordCompl />} />
    <Route path="/login/email" element={<FindEmail />} />
    <Route path="/login/email-found" element={<FindEmailComp />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signup-completed" element={<SignupComp />} />
    <Route path="/error" element={<Error />} />
    <Route path="/test" element={<TestProfile />} />

    {/* <Route path="*" element={<Notfound />} /> */}
  </Routes>
);

export default AppRoutes;
