import styled from "styled-components";
import ProfileSmall from "./ProfileSmall";
import Img from "./img.jpg";
import NavigationItem from "./NavigationItem";
import { CgAddR } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";

const Bar = styled.div`
  padding-top: 10px;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  right: 0;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#EDE0FB" : "#666666"};
  z-index: 1;
  height: 48px;
`;

export default function NavigationBar() {
  const iconSize = 28;
  return (
    <Bar>
      <NavigationItem>
        <IoHome size={iconSize}></IoHome>
      </NavigationItem>
      <NavigationItem>
        <CgSearch size={iconSize}></CgSearch>
      </NavigationItem>
      <NavigationItem>
        <CgAddR size={iconSize}></CgAddR>
      </NavigationItem>
      <NavigationItem>
        <RiCalendarScheduleLine size={iconSize}></RiCalendarScheduleLine>
      </NavigationItem>
      <NavigationItem>
        <ProfileSmall img={Img}></ProfileSmall>
      </NavigationItem>
    </Bar>
  );
}
