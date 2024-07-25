import styled from "styled-components";
import ProfileSmall from "./ProfileSmall";
import Img from "../../assets/images/img.webp";
import NavigationItem from "./NavigationItem";
import { CgAddR } from "react-icons/cg";
import { IoHome, IoSearch } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import MyProfile from "../../views/MyProfile";
import img from "../../assets/images/cha.png";
import VisitedPage from "../../views/VisitedPage";
import Components from "../../views/Components";
import ComponentsJiwon from "../../views/ComponentsJiwon";
import ReservationCalendar from "../reservation/ReservationCalendar";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

const Bar = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
  position: fixed;
  width: 100%;
  display: flex;
  border-radius: 1.5rem 1.5rem 0 0;
  justify-content: space-around;
  bottom: 0;
  right: 0;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#f2e9fc" : "#666666"};
  z-index: 1;
  height: 48px;
  transition: background-color 0.3s ease-in-out;
`;

const StyledNavLink = styled(NavLink)`
  color: ${(props) => (props.theme.value === "light" ? "" : props.theme.text)};
  border-radius: 1rem;
  transition: background-color 0.3s ease-in-out;
  &.active {
    color: ${(props) => props.theme.primary};
    background-color: ${(props) => props.theme.body};
  }
`;
const ICON_SIZE = 28;
const Navigation = ({ theme, children }) => {
  return (
    <>
      <>{children}</>
      <Bar>
        <StyledNavLink to="/jinwonComponents">
          <NavigationItem>
            <IoHome size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>
        <StyledNavLink to="/calendar">
          <NavigationItem>
            <IoSearch size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>
        <StyledNavLink to="/visited">
          <NavigationItem>
            <CgAddR size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>
        <StyledNavLink to="/component">
          <NavigationItem>
            <RiCalendarScheduleLine size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>
        <StyledNavLink to="/Profile">
          <NavigationItem>
            <ProfileSmall img={img}></ProfileSmall>
          </NavigationItem>
        </StyledNavLink>
      </Bar>
    </>
  );
};

export default function NavigationBar({ theme, toggleTheme, children }) {
  return (
    <Router>
      <Navigation theme={theme}>
        <Routes>
          <Route path="jiwonComponents" element={<ComponentsJiwon />} />
          <Route path="/calendar" element={<ReservationCalendar />} />
          <Route path="/visited" element={<VisitedPage />} />
          <Route
            path="/component"
            element={<Components theme={theme} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/profile"
            element={<MyProfile theme={theme} toggleTheme={toggleTheme} />}
          />
        </Routes>
      </Navigation>
    </Router>
  );
}
