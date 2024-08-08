import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiSend } from "react-icons/fi";

const Wrapper = styled.div`
  /* 레이아웃 */
  display: flex;
  position: fixed;
  align-items: center;
  height: 50px;
  width: 50%;
  @media (max-width: 768px) {
    width: 100vw;
  }
  top: 0;
  z-index: 5;
  position: -webkit-sticky; /* For Safari */

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

const HeaderText = styled.p`
  font-size: 20px;
  margin-left: 10px;
  font-weight: 600;
  @media (max-width: 375px) {
    font-size: 17px;
  }
`;

const Header = ({ title }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    window.history.back();
    console.log("뒤로가기");
  };

  return (
    <Wrapper>
      <ImgBack onClick={handleBackClick} />
      <HeaderText>{title}</HeaderText>
    </Wrapper>
  );
};

export default Header;
