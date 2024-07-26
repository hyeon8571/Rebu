import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import MyProfile from "../views/MyProfile";
import ReservationCalendar from "../components/reservation/ReservationCalendar";
import VisitedPage from "../views/VisitedPage";
import Components from "../views/Components";

const PrivateRoutes = ({ theme, toggleTheme }) => (
  <Routes>
    <Route
      path="/personal-info"
      element={<Components theme={theme} toggleTheme={toggleTheme} />}
    />
    <Route
      path="/profile"
      element={<MyProfile theme={theme} toggleTheme={toggleTheme} />}
    />
    <Route path="/calendar" element={<ReservationCalendar />} />
    <Route path="/visited" element={<VisitedPage />} />
    <Route
      path="/component"
      element={<Components theme={theme} toggleTheme={toggleTheme} />}
    />
  </Routes>
);

export default PrivateRoutes;
