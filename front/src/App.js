// App.js
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
import axios from "axios";

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
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // useEffect(() => {
  //   axios
  //     .get("/api", {
  //       params: {},
  //       headers: {
  //         "Content-Type": "application/json",
  //         access: localStorage.getItem("access"),
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // }, []);
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
