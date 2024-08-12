import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alarmsAgreement } from "../features/auth/authSlice";
import styled from "styled-components";
import MainHeader from "../components/main/MainHeader";
import MainFilter from "../components/main/MainFilter";
import MainFeed from "../components/main/MainFeed";
import axios from "axios";
import { BASE_URL } from "./Signup";
import Login from "./Login";

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : props.theme.body};
  transition: background-color 0.5s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 768px;
  margin-bottom: 70px;
`;

function Main({ theme, toggleTheme }) {
  const [loginUser, setLoginUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [feed, setFeed] = useState([]);
  const [alarmdata, setAlarmdata] = useState([]);
  const [alarmCount, setAlarmCount] = useState(0);
  const [currentLocation, setCurrentLocation] = useState([]);
  const dispatch = useDispatch();
  const {
    nickname,
    type,
    isLogin,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    const access = localStorage.getItem('access');
    axios.get(`${BASE_URL}/api/feeds/shops/${nickname}`, {
      headers : {
        "access" : access,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response)
      setPostdata(response.data.body);
    })
    .catch(err => {
      console.log('피드 데이터를 찾지 못했습니다');
    })
  }, []);

  useEffect(() => {
    fetch("/mockdata/alarmdata.json")
      .then((res) => res.json())
      .then((data) => {
        const alarm = data.body.filter(
          (alarm) => alarm.receiverNickname === loginUser.nickname
        );
        setAlarmdata(alarm || data.body);
        setAlarmCount(alarm.length);
      });
  }, [loginUser]);

  // useEffect(() => {
  //   const initializeAlarms = async () => {
  //     try {
  //       const alarmsResult = await dispatch(alarmsAgreement());
  //       console.log("alarmResult", alarmsResult);
  //       if (alarmsResult.success) {
  //         console.log("Alarms agreement 성공");
  //       } else {
  //         console.error("Alarms agreement 실패:", alarmsResult.error);
  //       }
  //     } catch (error) {
  //       console.error("Error in alarms agreement:", error);
  //     }
  //   };
  //   initializeAlarms();
  // }, [dispatch]);

 

  return (
    <Wrapper>
      {isLogin !== true ? (
      
          <Login />
    
      ) : (
        <>
          <MainHeader theme={theme} toggleTheme={toggleTheme} currentUser={profile} loginUser={loginUser} Count={alarmCount} alarmdata={alarmdata}/>
          <MainFilter currentLocation={currentLocation} setCurrentLocation={setCurrentLocation}/>
          <MainFeed information={feed} currentUser={profile} loginUser={loginUser} />
        </>
      )}
    </Wrapper>
  );
}

export default Main;
