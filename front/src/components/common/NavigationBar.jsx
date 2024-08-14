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
import apiClient from "../../util/apiClient";
import { BASE_URL } from "../../util/commonFunction";
import { BASE_IMG_URL } from "../../util/commonFunction";

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

//default
export default function NavigationBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(null);

  const nickname = localStorage.getItem("nickname");
  const type = localStorage.getItem("type");
  useEffect(() => {
    let EndPoint = "";
    switch (localStorage.getItem("type")) {
      case "COMMON":
        EndPoint = "/api/profiles";
        break;
      case "EMPLOYEE":
        EndPoint = "/api/profiles/employees";
        break;
      case "SHOP":
        EndPoint = "/api/profiles/shops";
        break;
    }

    const nickname = localStorage.getItem("nickname");

    apiClient
      .get(`${BASE_URL}${EndPoint}/${nickname}`)
      .then((response) => {
        setProfileImg(response.data.body.imageSrc);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        <StyledNavLink isModalOpen={isModalOpen} to="/visited">
          <NavigationItem>
            <CgAddR size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>

        <StyledNavLink to="/component">
          <NavigationItem>
            <RiCalendarScheduleLine size={ICON_SIZE} />
          </NavigationItem>
        </StyledNavLink>
        <StyledNavLink to={`/profile/${nickname}/${type}`}>
          <NavigationItem>
            <ProfileSmall img={BASE_IMG_URL + profileImg}></ProfileSmall>
          </NavigationItem>
        </StyledNavLink>
      </Bar>
    </>
  );
}
