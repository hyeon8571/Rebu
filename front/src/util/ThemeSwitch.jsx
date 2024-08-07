import React, { useState } from "react";
import styled from "styled-components";
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { AiOutlineSun } from "react-icons/ai";

const ToggleContainer = styled.div`
  position: relative;
  width: 62px;
  display: flex;
  cursor: pointer;

  > .toggle-container {
    width: 62px;
    height: 30px;
    border-radius: 30px;
    background-color: #bcbcbc;
  }

  .toggle-text {
    color: #6b6b6b; // 텍스트 색상
    font-weight: bold; // 텍스트 굵기
    transition: color 0.5s;
    font-size: 13px;
  }

  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: #b475f3;
    transition: 0.5s;

    .toggle-text {
      color: rgb(57, 150, 237); // 텍스트 색상 변경
      font-size: 13px;
    }
  }

  > .toggle-circle {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 1.3px;
    left: 2px;
    width: 35px;
    height: 27px;
    border-radius: 30px;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
  }

  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    left: 25.5px;
    transition: 0.5s;
  }
`;

const LightImg = styled(AiOutlineSun)`
  color: #943aee;
  font-size: 23px;
`;

const DarkImg = styled(FaRegMoon)`
  font-size: 21px;
`;

const switchContainer = styled.div`
  width: 100px;
  background: ${({ theme }) => theme.body};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
`;

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <>
      <ToggleContainer onClick={toggleTheme}>
        <div
          className={`toggle-container ${theme === "light" ? "toggle--checked" : null}`}
        ></div>
        <div className={`toggle-circle ${theme === "light" ? "toggle--checked" : null}`}>
          <span className="toggle-text" style={{ display: 'flex', alignItems: 'center' }}>
            {theme === "light" ? <LightImg /> : <DarkImg />}
          </span>
        </div>
      </ToggleContainer>
    </>
  );
};

export default Toggle;
