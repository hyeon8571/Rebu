import React, {useState, useEffect} from "react";
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
import MyReservationCalendar from "../components/MyReservation/MyReservationCalendar";
import AddMenu from "../views/AddMenu";
import SettingReservation from "../views/SettingReservation";
import MenuDisplay from "../components/reservation/MenuDisPlay";
import DesignerDisplay from "../components/reservation/DesignerDisplay";
import PostReview from "../views/PostReviewPage";
import PostFeedPage from "../views/PostFeedPage";
import ReviewKeywordStat from "../components/review/ReviewKeywordStat";



  

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
      element={<StoreProfile theme={theme} toggleTheme={toggleTheme} />}
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
    <Route path="/myreservation" element={<MyReservationCalendar />} />
    <Route path="/menudisplay" element={<MenuDisplay />} />
    <Route path="/addmenu" element={<AddMenu />} />
    <Route path="/setrev" element={<SettingReservation />} />
    <Route path="/designerdisplay" element={<DesignerDisplay />} />
    <Route path="/postrevw" element={<PostReview />} />
    <Route path="/postfeed" element={<PostFeedPage />} />
    <Route path="/stat" element={<ReviewKeywordStat reviewNum={83} />} />
    <Route path="/designer" element={<DesignerDisplay />} />
  </Routes>
);

export default PrivateRoutes;
