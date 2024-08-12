import styled from "styled-components";
import ProfileSmall from "./ProfileSmall";
import NavigationItem from "./NavigationItem";
import { CgAddR } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import img from "../../assets/images/cha.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Bar = styled.div`
  padding-top: 10px;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  right: 0;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#f2e9fc" : "#666666"};
  z-index: 2;
  height: 48px;
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

const ProfileNavItem = () => {
  const navigate = useNavigate();
  // Redux 상태에서 nickname과 type을 가져옴
  const { nickname, type } = useSelector((state) => state.auth);
  // console.log("navigationbar", nickname, type);
  const handleProfileClick = () => {
    navigate(`/profile/${nickname}/${type}`);
  };

  return (
    <NavigationItem onClick={handleProfileClick}>
      <ProfileSmall img={img} />
    </NavigationItem>
  );
};

//default
export default function NavigationBar() {
  return (
    <>
      <Bar>
        <StyledNavLink to="/main">
          <NavigationItem>
            <IoHome size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>
        <StyledNavLink to="/designertab">
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

        <ProfileNavItem />
      </Bar>
    </>
  );
}
