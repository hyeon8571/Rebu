import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./util/theme";
import { GlobalStyles } from "./util/GlobalStyles";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "./components/common/NavigationBar";
import NavigationRail from "./components/common/NavigationRail";
import AppRoutes from "./routes/AppRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

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
        <ResponsiveLayout theme={theme} toggleTheme={toggleTheme} isMobile={isMobile} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  min-height: 100vh;
  display: grid;
  width: 100%;
  grid-template-columns: ${({ isMobile }) => (isMobile ? '' : '1fr 2fr 1fr')};
  height: 100vh;
`;

const FixedNavBar = styled.div`
  position: sticky;
  width: 100%;
  z-index: 1000;
`;

const FixedNavRail = styled.div`
  width: 100%;
  position: sticky;
  height: 100%;
  z-index: 1000;
`;

const Content = styled.div`
  grid-column: ${({ isMobile }) => (isMobile ? '' : '2 / 3')};
`;

function ResponsiveLayout({ theme, toggleTheme, isMobile }) {
  return (
    <Layout isMobile={isMobile}>
      {isMobile ? (
        <FixedNavBar>
          <NavigationBar theme={theme} toggleTheme={toggleTheme} />
        </FixedNavBar>
      ) : (
        <FixedNavRail>
          <NavigationRail theme={theme} toggleTheme={toggleTheme} />
        </FixedNavRail>
      )}
    
      <Content isMobile={isMobile}>
        <AppRoutes theme={theme} toggleTheme={toggleTheme} />
        <PrivateRoutes theme={theme} toggleTheme={toggleTheme} />
      </Content>
 
    </Layout>
  );
}

export default App;
