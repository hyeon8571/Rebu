import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logout from "./ModalLogout";
import SecretMode from "./ModalSecretMode";
import { FiChevronLeft, FiSend } from "react-icons/fi";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import ThemeToggler from "../../util/ThemeToggler";

const Wrapper = styled.div`
  /* 레이아웃 */
  display: flex;
  position: sticky;
  align-items: center;
  height: 50px;
  max-width: 768px;
  width: 100%;
  top: 0;
  z-index: 5;

  /* 색상 */
  background-color: ${(props) =>
    props.theme.value === "light" ? "#f0e6fb" : props.theme.secondary};
  color: ${(props) => (props.theme.value === "light" ? "#000000" : "#ffffff")};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
`;

const ImgBack = styled(FiChevronLeft)`
  width: 24px;
  height: 24px;
  margin-left: 30px;
  cursor: pointer;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 30px;
  color: ${(props) => (props.theme.value === "light" ? "#943AEE" : "#ffffff")};
`;

const ImgSend = styled(FiSend)`
  width: 22px;
  height: 22px;
  margin-left: 20px;
  cursor: pointer;
`;

const ImgSetting = styled(IoSettingsOutline)`
  width: 22px;
  height: 22px;
  margin-left: 20px;
  cursor: pointer;
`;

const ImgSettingActive = styled(IoSettings)`
  width: 22px;
  height: 22px;
  margin-left: 20px;
  cursor: pointer;
`;

const HeaderText = styled.p`
  font-size: 20px;
  margin-left: 10px;
  @media (max-width: 375px) {
    font-size: 17px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 90%;
  right: 3%;
  padding: 5px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : "#e5e5e5"};
  color: black;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(21, 17, 17, 0.1);
  z-index: 10;
  width: 140px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    border-radius: 5px;
    background-color: #f0f0f0;
  }
`;

const Header = ({ theme, toggleTheme, currentUser, loginUser }) => {
  const [LogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [SecretModalOpen, setSecretModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSettingActive, setIsSettingActive] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const logoutModalOpen = () => {
    setLogoutModalOpen(true);
  };

  const secretModalOpen = () => {
    setSecretModalOpen(true);
  };

  const closeModal = () => {
    setLogoutModalOpen(false);
    setSecretModalOpen(false);
  };

  const handleBackClick = () => {
    window.history.back();
    console.log("뒤로가기");
  };

  const handleSettingClick = () => {
    setShowDropdown(!showDropdown);
    setIsSettingActive(!isSettingActive);
  };

  const handleOptionClick = (option) => {
    console.log(option);
    // 선택된 옵션에 대한 추가 작업 수행 가능
    setShowDropdown(false);
    setIsSettingActive(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
      setIsSettingActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Wrapper>
      <ImgBack onClick={handleBackClick} />
      <HeaderText>My Profile</HeaderText>
      <ButtonBox>
        <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
        {currentUser.nickname === loginUser.nickname ? (
          isSettingActive ? (
            <ImgSettingActive onClick={handleSettingClick} />
          ) : (
            <ImgSetting onClick={handleSettingClick} />
          )
        ) : (
          <ImgSend />
        )}
      </ButtonBox>
      <DropdownMenu ref={dropdownRef} show={showDropdown}>
        <DropdownItem
          onClick={() =>
            navigate("/personal-info", { state: { user: loginUser } })
          }
        >
          개인정보 확인
        </DropdownItem>
        <hr style={{ margin: "5px 0px" }} />
        <DropdownItem onClick={() => handleOptionClick("비밀번호 변경")}>
          비밀번호 변경
        </DropdownItem>
        <hr style={{ margin: "5px 0px" }} />
        <DropdownItem onClick={secretModalOpen}>공개 설정</DropdownItem>
        <hr style={{ margin: "5px 0px" }} />
        <DropdownItem onClick={logoutModalOpen}>로그아웃</DropdownItem>
        {LogoutModalOpen && (
          <Logout LogoutModalOpen={LogoutModalOpen} closeModal={closeModal} />
        )}
        {SecretModalOpen && (
          <SecretMode
            secretModalOpen={SecretModalOpen}
            closeModal={closeModal}
          />
        )}
      </DropdownMenu>
    </Wrapper>
  );
};

export default Header;
