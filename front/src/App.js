// src/App.js
import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./util/theme";
import { GlobalStyles } from "./util/GlobalStyles";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/common/NavigationBar";
import NavigationRail from "./components/common/NavigationRail";
import AppRoutes from "./routes/AppRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import { isAuthenticated } from "./util/auths"; // isAuthenticated 함수 가져오기
import apiClient from "./util/apiClient";
import { BASE_URL } from "./util/commonFunction";
import axios from "axios";
import {
  subscribeToAlarms,
  NotificationComponent,
} from "./features/common/alarmSlice"; //sse
import AlarmConnect from "./AlarmConnect";
import MyComponent from "./MyComponent";

const Grid = styled.div`
  @media (min-width: 769px) {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
  @media (max-width: 768px) {
    padding-bottom: 4rem;
  }
`;

const Layout = styled.div`
  @media (min-width: 769px) {
    grid-column: 2 / 3;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  }
`;

function App() {
  const [theme, setTheme] = useState("light");
  const [auth, setAuth] = useState(isAuthenticated());

  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [type, setType] = useState(localStorage.getItem("type"));
  const [imageSrc, setImageSrc] = useState(localStorage.getItem("imageSrc"));

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogin = (nickname, type, imageSrc) => {
    setAuth(true);
    setNickname(nickname);
    setType(type);
    setImageSrc(imageSrc);
  };

  const handleLogout = () => {
    setAuth(false);
    setNickname(null);
    setType(null);
    setImageSrc(null);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <BrowserRouter>
        <GlobalStyles />
        <Grid>
          {/* 로그인 상태에 따라 NavigationBar 또는 NavigationRail을 렌더링 */}

          {auth &&
            (isMobile ? (
              <NavigationBar
                auth={auth}
                nickname={nickname}
                type={type}
                profileImg={imageSrc}
              />
            ) : (
              <NavigationRail
                auth={auth}
                nickname={nickname}
                type={type}
                profileImg={imageSrc}
              />
            ))}

          <AlarmConnect />

          <Layout>
            <AppRoutes
              theme={theme}
              toggleTheme={toggleTheme}
              onLogin={handleLogin}
              handleLogin={handleLogin}
            />
            <PrivateRoutes
              theme={theme}
              toggleTheme={toggleTheme}
              handleLogout={handleLogout}
              setNickname={setNickname}
              setType={setType}
              setImageSrc={setImageSrc}
            />
          </Layout>
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
