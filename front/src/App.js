// App.js
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./util/theme";
import { GlobalStyles } from "./util/GlobalStyles";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter, Router } from "react-router-dom";
import NavigationBar from "./components/common/NavigationBar";
import NavigationRail from "./components/common/NavigationRail";
import AppRoutes from "./routes/AppRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  const [theme, setTheme] = useState("light");
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isDesktop = useMediaQuery({ minWidth: 769 });

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <BrowserRouter>
          <GlobalStyles />
          {isDesktop && (
            <NavigationRail>
              <AppRoutes theme={theme} toggleTheme={toggleTheme} />
              <PrivateRoutes theme={theme} toggleTheme={toggleTheme} />
            </NavigationRail>
          )}
          {isMobile && (
            <NavigationBar>
              <AppRoutes theme={theme} toggleTheme={toggleTheme} />
              <PrivateRoutes theme={theme} toggleTheme={toggleTheme} />
            </NavigationBar>
          )}
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;
