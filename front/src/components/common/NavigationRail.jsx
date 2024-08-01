import React from "react";
import styled from "styled-components";
import Img from "../../assets/images/img.webp";
import { CgAddR } from "react-icons/cg";
import { IoHome, IoSearch } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import NavigationItem from "./NavigationItem";
import ProfileMedium from "./ProfileMedium";

import { NavLink } from "react-router-dom";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 100vh;
`;

const Rail = styled.nav`
  position: fixed;
  right: 0;
  left: calc(25% - 96px);
  top: 10%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 1rem;
  height: 80vh;
  min-height: 320px;
  width: 64px;
  background-color: ${(props) =>
    props.theme.value === "light"
      ? props.theme.tertiary
      : props.theme.secondary};
  padding: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
  grid-column: 1 / 2;
  transition: background-color 0.3s ease-in-out;
`;

const StyledNavLink = styled(NavLink)`
  color: ${(props) => (props.theme.value === "light" ? "" : props.theme.text)};
  transition: background-color 0.3s ease-in-out;
  border-radius: 1rem;
  &.active {
    color: ${(props) => props.theme.primary};
    background-color: ${(props) => props.theme.body};
  }
`;

const ProfileNavLink = styled(NavLink)``;

const ICON_SIZE = 36;

export default function NavigationRail() {
  return (
    <GridContainer>
      <Rail>
        <StyledNavLink to="/Login">
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
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <ProfileNavLink to="/profile">
          <ProfileMedium img={Img} time={0} />
        </ProfileNavLink>
      </Rail>
    </GridContainer>
  );
}
