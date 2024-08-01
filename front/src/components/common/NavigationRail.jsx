import React from "react";
import styled from "styled-components";
import { CgAddR } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import NavigationItem from "./NavigationItem";
import ProfileMedium from "./ProfileMedium";
import Img from "./img.jpg";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 100vh;
`;

const Rail = styled.div`
  position: fixed;
  right: 0;
  left: calc(25% - 96px);
  top: 12.5%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 1rem;
  height: 66.66%;
  min-height: 320px;
  width: 64px;
  background-color: ${(props) =>
    props.theme.value === "light"
      ? props.theme.tertiary
      : props.theme.secondary};
  padding: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
  grid-column: 1 / 2;
`;

const Content = styled.div`
  padding: 16px;
  grid-column: 2 / 3;
`;

const RightWrapper = styled.div`
  grid-column: 3 / 4;
`;

const iconSize = 36;

export default function NavigationRail({ handleClick, children }) {
  return (
    <>
      <GridContainer>
        <Rail>
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
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <ProfileMedium img={Img} time={0}></ProfileMedium>
        </Rail>
        <Content>{children}</Content>
        <RightWrapper />
      </GridContainer>
    </>
  );
}
