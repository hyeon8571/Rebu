import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfileSmall from "./ProfileSmall";
import NavigationItem from "./NavigationItem";
import { CgAddR } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../../util/ModalPortal";
import SearchModal from "../Search/SearchModal";

import { BASE_IMG_URL } from "../../util/commonFunction";
import Img from "../../assets/images/img.webp";

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

  &.active {
    color: ${(props) => props.theme.primary};
  }

  background-color: ${(props) =>
    props.isModalOpen ? props.theme.body : "none"};
`;

const ICON_SIZE = 28;

//default
export default function NavigationBar({ nickname, type, profileImg }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <ModalPortal>
        <SearchModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </ModalPortal>
      <Bar>
        <StyledNavLink to="/main">
          <NavigationItem>
            <IoHome size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>
        <SearchDiv isModalOpen={isModalOpen} onClick={toggleModal}>
          <NavigationItem>
            <IoSearch size={ICON_SIZE} />
          </NavigationItem>
        </SearchDiv>
        <StyledNavLink
          isModalOpen={isModalOpen}
          to={
            localStorage.getItem("type") === "SHOP" ||
            localStorage.getItem("type") === "EMPLOYEE"
              ? "/postfeed"
              : "/visited"
          }
        >
          <NavigationItem>
            <CgAddR size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>

        <StyledNavLink to="/myreservation">
          <NavigationItem>
            <RiCalendarScheduleLine size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>
        <StyledNavLink to={`/profile/${nickname}/${type}`}>
          <NavigationItem>
            <ProfileSmall
              img={
                profileImg === null || profileImg === "null"
                  ? Img
                  : `${BASE_IMG_URL}/${profileImg}`
              }
            ></ProfileSmall>
          </NavigationItem>
        </StyledNavLink>
      </Bar>
    </>
  );
}
