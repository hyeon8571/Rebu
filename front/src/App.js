// App.js
import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./util/theme";
import { GlobalStyles } from "./util/GlobalStyles";
import { useMediaQuery } from "react-responsive";
import NavigationBar from "./components/common/NavigationBar";
import NavigationRail from "./components/common/NavigationRail";

const MobileWrapper = styled.div`
  /* margin-left: 0.5rem;
  margin-right: 0.5rem; */
`;

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
        <GlobalStyles />
        {isDesktop && (
          <NavigationRail theme={theme} toggleTheme={toggleTheme} />
        )}
        {isMobile && (
          <MobileWrapper>
            <NavigationBar theme={theme} toggleTheme={toggleTheme} />
          </MobileWrapper>
        )}
      </>
    </ThemeProvider>
  );
}

export default App;
