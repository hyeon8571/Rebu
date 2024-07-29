// App.js
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./util/theme";
import { GlobalStyles } from "./util/GlobalStyles";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/common/NavigationBar";
import NavigationRail from "./components/common/NavigationRail";
import AppRoutes from "./routes/AppRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

const Grid = styled.div`
  @media (min-width: 769px) {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
  height: 100vh;
`;

const Layout = styled.div`
  height: 100%;
  @media (min-width: 769px) {
    grid-column: 2 / 3;
  }
`;

function App() {
  const [theme, setTheme] = useState("light");
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <BrowserRouter>
        <GlobalStyles />
        <Grid>
          {isMobile ? <NavigationBar /> : <NavigationRail />}
          <Layout>
            <AppRoutes theme={theme} toggleTheme={toggleTheme} />
            <PrivateRoutes theme={theme} toggleTheme={toggleTheme} />
          </Layout>
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
