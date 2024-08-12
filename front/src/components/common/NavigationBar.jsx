import styled from "styled-components";
import { useState } from "react";
import ProfileSmall from "./ProfileSmall";
import NavigationItem from "./NavigationItem";
import { CgAddR } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import img from "../../assets/images/cha.png";
import { NavLink } from "react-router-dom";
import ModalPortal from "../../util/ModalPortal";
import SearchModal from "../Search/SearchModal";

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
const SearchDiv = styled.div`
  transition: background-color 0.3s ease-in-out;
  border-radius: 1rem;

  color: ${(props) =>
    props.isModalOpen ? props.theme.primary : "rgb(85, 26, 139)"};
  background-color: ${(props) =>
    props.isModalOpen ? props.theme.body : "none"};
`;

const ICON_SIZE = 28;

export default function NavigationBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <ModalPortal>
        <SearchModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </ModalPortal>
      <Bar>
        <StyledNavLink isModalOpen={isModalOpen} to="/Login">
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
        <StyledNavLink isModalOpen={isModalOpen} to="/profile">
          <NavigationItem>
            <ProfileSmall img={img}></ProfileSmall>
          </NavigationItem>
        </StyledNavLink>
      </Bar>
    </>
  );
}
