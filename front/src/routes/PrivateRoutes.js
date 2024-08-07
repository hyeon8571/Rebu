import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import MyProfile from "../views/MyProfile";
import ReservationCalendar from "../components/reservation/ReservationCalendar";
import VisitedPage from "../views/VisitedPage";
import Components from "../views/Components";
import TimeTable from "../components/reservation/TimeTable";
import MenuTab from "../components/reservation/MenuTab";
import DesignerTab from "../components/reservation/DesignerTab";
import PersonalInfo from "../views/PersonalInfo";
import StoreProfile from "../views/StoreProfile";

const PrivateRoutes = ({ theme, toggleTheme }) => (
  <Routes>
    <Route
      path="/personal-info"
      element={<PersonalInfo theme={theme} toggleTheme={toggleTheme} />}
    />
    <Route
      path="/profile"
      element={<MyProfile theme={theme} toggleTheme={toggleTheme} />}
    />
    <Route
      path="/store-profile/"
      element={<StoreProfile theme={theme} toggleTheme={toggleTheme}/>}
    />
    <Route path="/calendar" element={<ReservationCalendar />} />
    <Route path="/visited" element={<VisitedPage />} />
    <Route
      path="/component"
      element={<Components theme={theme} toggleTheme={toggleTheme} />}
    />
    <Route path="/timetable" element={<TimeTable />} />
    <Route path="/menutab" element={<MenuTab />} />
    <Route path="/designertab" element={<DesignerTab />} />
  </Routes>
);

export default PrivateRoutes;
