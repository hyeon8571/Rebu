// src/App.js
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./util/theme";
import { GlobalStyles } from "./util/GlobalStyles";
import { useMediaQuery } from "react-responsive";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import NavigationBar from "./components/common/NavigationBar";
import NavigationRail from "./components/common/NavigationRail";

import AppStart from "./views/AppStart";
import Main from "./views/Main";
import Notfound from "./views/Notfound";
import Login from "./views/Login";
import FindEmail from "./views/FindEmail";
import ChangePassword from "./views/ChangePassword";
import Signup from "./views/Signup";
import ChangePasswordCompl from "./views/ChangePasswordCompl";
import SignupForm2 from "./components/forms/SignupForm2";

function App() {
  const [theme, setTheme] = useState("light");
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isDesktop = useMediaQuery({ minWidth: 769 });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          {isDesktop && (
            <NavigationRail>
              <Routes>
                <Route path="/start" element={<AppStart />} />
                <Route path="/main" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/password" element={<ChangePassword />} />
                <Route
                  path="login/passwordChanged"
                  element={<ChangePasswordCompl />}
                />
                <Route path="/login/email" element={<FindEmail />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/step2" element={<SignupForm2 />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
            </NavigationRail>
          )}
          {isMobile && (
            <>
              <Routes>
                <Route path="/start" element={<AppStart />} />
                <Route path="/main" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/password" element={<ChangePassword />} />
                <Route
                  path="login/passwordChanged"
                  element={<ChangePasswordCompl />}
                />
                <Route path="/login/email" element={<FindEmail />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/step2" element={<SignupForm2 />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
              {/* <NavigationBar /> */}
              {/* NavigationBar <- 로그인했을때만보이기 */}
            </>
          )}
        </>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
