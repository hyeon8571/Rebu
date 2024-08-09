import React, { useState } from "react";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import { FaRegBell, FaBell } from "react-icons/fa";
import ThemeSwitch from "../../util/ThemeSwitch";
import RebuImg from "../../assets/images/logo.png";

const Wrapper = styled.div`
  /* 레이아웃 */
  display: flex;
  justify-content: space-between;
  position: sticky;
  align-items: center;
  height: 50px;
  max-width: 768px;
  width: 100%;
  top: 0;
  z-index: 5;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#f0e6fb" : props.theme.secondary};
  color: ${(props) => (props.theme.value === "light" ? "#000000" : "#ffffff")};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
`;

const ModeToggle = styled.div`
  margin-left: 15px;
`;

const MainTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  margin-left: 10px;
  gap: 5px;
`;

const MainLogo = styled.img`
  width: 30px;
  height: 30px;
  @media (max-width: 375px) {
    width: 26px;
    height: 26px;
  }
`;

const MainTitle = styled.h1`
  color: ${(props) => (props.theme.value === "light" ? "#943AEE" : "#f4ebfd")};
  font-size: 30px;
  @media (max-width: 375px) {
    font-size: 25px;
  }
  margin: 5px auto;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  gap: 10px;
`;

const AlarmIcon = styled(FaRegBell)`
  width: 22px;
  height: 22px;
  color: ${(props) => (props.theme.value === "light" ? "#9e4def" : "#ffffff")};
  cursor: pointer;
`;

const AlarmIconActive = styled(FaBell)`
  width: 22px;
  height: 22px;
  color: ${(props) => (props.theme.value === "light" ? "#9e4def" : "#ffffff")};
  cursor: pointer;
`;

const SendIcon = styled(FiSend)`
  width: 22px;
  height: 22px;
  color: ${(props) => (props.theme.value === "light" ? "#9e4def" : "#ffffff")};
  cursor: pointer;
`;


const MainHeader = ({ theme, toggleTheme, currentUser, loginUser }) => {
  const [isAlarm, setIsAlarm] = useState(false);

  const handleAlarmActive = () => {
    setIsAlarm(!isAlarm);
  }

  return (
    <Wrapper>
      <ModeToggle>
        <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
      </ModeToggle>
      <MainTitleContainer>
        {/* <MainLogo src={RebuImg} /> */}
        <MainTitle>REBU</MainTitle>
      </MainTitleContainer>
      <IconBox>
        {isAlarm ? (
          <AlarmIconActive onClick={handleAlarmActive} />
        ) : (
          <AlarmIcon onClick={handleAlarmActive} />
        )}
        <SendIcon />
      </IconBox>
    </Wrapper>
  )
};

export default MainHeader;