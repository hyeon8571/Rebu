import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import MyProfile from "../views/MyProfile";
import ReservationCalendar from "../components/reservation/ReservationCalendar";
import VisitedPage from "../views/VisitedPage";
import Components from "../views/Components";
import TimeTablePage from "../views/TimeTablePage";
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
import Main from "../views/Main";

const PrivateRoutes = ({
  theme,
  toggleTheme,
  handleLogout,
  setNickname,
  setType,
  setImageSrc,
}) => (
  <Routes>
    <Route
      path="/personal-info"
      element={
        <ProtectedRoute
          element={() => (
            <PersonalInfo theme={theme} toggleTheme={toggleTheme} />
          )}
        />
      }
    />
    <Route
      path="/profile/:nickname/:type"
      element={
        <ProtectedRoute
          element={() => (
            <MyProfile
              theme={theme}
              toggleTheme={toggleTheme}
              handleLogout={handleLogout}
              setNickname={setNickname}
              setType={setType}
              setImageSrc={setImageSrc}
            />
          )}
        />
      }
    />
    <Route
      path="/main"
      element={
        <ProtectedRoute
          element={() => <Main theme={theme} toggleTheme={toggleTheme} />}
        />
      }
    />
    <Route
      path="/store-profile"
      element={
        <ProtectedRoute
          element={() => (
            <StoreProfile theme={theme} toggleTheme={toggleTheme} />
          )}
        />
      }
    />
    <Route
      path="/calendar"
      element={<ProtectedRoute element={ReservationCalendar} />}
    />
    <Route path="/visited" element={<ProtectedRoute element={VisitedPage} />} />
    <Route
      path="/component"
      element={
        <ProtectedRoute
          element={() => <Components theme={theme} toggleTheme={toggleTheme} />}
        />
      }
    />
    <Route
      path="/profile/:nickname/SHOP/timetable"
      element={<ProtectedRoute element={TimeTablePage} />}
    />
    <Route path="/menutab" element={<ProtectedRoute element={MenuTab} />} />
    <Route
      path="/reservation/:nickname"
      element={<ProtectedRoute element={DesignerTab} />}
    />
    <Route
      path="/myreservation"
      element={<ProtectedRoute element={MyReservationCalendar} />}
    />
    <Route
      path="/menudisplay"
      element={<ProtectedRoute element={MenuDisplay} />}
    />
    <Route path="/addmenu" element={<ProtectedRoute element={AddMenu} />} />
    <Route
      path="/setrev"
      element={<ProtectedRoute element={SettingReservation} />}
    />
    <Route
      path="/designerdisplay"
      element={<ProtectedRoute element={DesignerDisplay} />}
    />
    <Route path="/postrevw" element={<ProtectedRoute element={PostReview} />} />
    <Route
      path="/postfeed"
      element={<ProtectedRoute element={PostFeedPage} />}
    />
    <Route
      path="/stat"
      element={
        <ProtectedRoute element={() => <ReviewKeywordStat reviewNum={3} />} />
      }
    />
    <Route
      path="/designer"
      element={<ProtectedRoute element={DesignerDisplay} />}
    />
  </Routes>
);

export default PrivateRoutes;
