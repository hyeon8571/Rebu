import React, { useState } from "react";
import styled from "styled-components";
import Img from "../../assets/images/img.webp";
import { CgAddR } from "react-icons/cg";
import { IoHome, IoSearch } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import NavigationItem from "./NavigationItem";
import ProfileMedium from "./ProfileMedium";
import ModalPortal from "../../util/ModalPortal";
import SearchModal from "../Search/SearchModal";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 100vh;
`;

const Rail = styled.nav`
  position: fixed;
  right: 0;
  left: calc(25% - 120px);
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
  color: ${(props) =>
    props.theme.value === "light" ? "" : props.theme.text} !important;
  transition: background-color 0.3s ease-in-out;
  border-radius: 1rem;
  &.active {
    color: ${(props) =>
      props.isModalOpen ? "rgb(85, 26, 139)" : props.theme.primary};
    background-color: ${(props) =>
      props.isModalOpen ? "none" : props.theme.body};
  }
`;

const SearchDiv = styled.div`
  transition: background-color 0.3s ease-in-out;
  border-radius: 1rem;

  color: ${(props) =>
    props.isModalOpen ? props.theme.primary : "rgb(85, 26, 139)"};
  background-color: ${(props) =>
    props.isModalOpen ? props.theme.body : "none"};
`;

const ProfileNavLink = styled(NavLink)``;

const ICON_SIZE = 36;

const ProfileNavItem = () => {
  const navigate = useNavigate();

  const nickname = localStorage.getItem("nickname");
  const type = localStorage.getItem("type");

  const handleProfileClick = () => {
    // console.log(`/profile/${nickname}/${type}`);
    navigate(`/profile/${nickname}/${type}`);
  };

  return (
    <div onClick={handleProfileClick}>
      <ProfileMedium img={Img} time={0} />
    </div>
  );
};

export default function NavigationRail() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <GridContainer>
      <ModalPortal>
        <SearchModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </ModalPortal>
      <Rail>
        <StyledNavLink isModalOpen={isModalOpen} to="/main">
          <NavigationItem>
            <IoHome size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>
        <SearchDiv isModalOpen={isModalOpen} onClick={toggleModal}>
          <NavigationItem>
            <IoSearch size={ICON_SIZE} />
          </NavigationItem>
        </SearchDiv>
        <StyledNavLink isModalOpen={isModalOpen} to="/visited">
          <NavigationItem>
            <CgAddR size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>
        <StyledNavLink isModalOpen={isModalOpen} to="/component">
          <NavigationItem>
            <RiCalendarScheduleLine size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        {/* <ProfileNavLink to="/profile">
          <ProfileMedium img={Img} time={0} />
        </ProfileNavLink>{" "} */}
        <ProfileNavItem />
      </Rail>
    </GridContainer>
  );
}
