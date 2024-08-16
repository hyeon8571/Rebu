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
  margin-bottom: 70px;
`;

function Main({ theme, toggleTheme }) {
  const [loginUser, setLoginUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [feed, setFeed] = useState([]);
  const [distance, setDistance] = useState(100);
  const [period, setPeriod] = useState("");
  const [sortedLike, setSortedLike] = useState(false);
  const [category, setCategory] = useState("HAIR");
  const [alarmdata, setAlarmdata] = useState([]);
  const [alarmCount, setAlarmCount] = useState(0);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [feedKey, setFeedKey] = useState(0);
  const dispatch = useDispatch();
  const nickname = localStorage.getItem("nickname");
  const type = localStorage.getItem("type");
  const access = localStorage.getItem("access");
  const [error, setError] = useState(null);

  // 로그인 사용자 프로필 정보 조회
  useEffect(() => {
    if (type === "COMMON") {
      axios
        .get(`${BASE_URL}/api/profiles/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setProfile(response.data.body);
        })
        .catch((err) => {
          console.log("사용자 프로필 데이터를 찾지 못했습니다");
        });
    } else if (type === "SHOP") {
      axios
        .get(`${BASE_URL}/api/profiles/shops/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setProfile(response.data.body);
        })
        .catch((err) => {
          console.log("사용자 프로필 데이터를 찾지 못했습니다");
        });
    } else if (type === "EMPLOYEE") {
      axios
        .get(`${BASE_URL}/api/profiles/employees/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setProfile(response.data.body);
        })
        .catch((err) => {
          console.log("사용자 프로필 데이터를 찾지 못했습니다");
        });
    }
  }, []);

  // useEffect(() => {
  //   fetch("/mockdata/alarmdata.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const alarm =
  //         data &&
  //         data.body.filter(
  //           (alarm) => alarm.receiverNickname === loginUser.nickname
  //         );
  //       setAlarmdata(alarm || data.body);
  //       setAlarmCount(alarm ? alarm.length : 0);
  //     });
  // }, [feed]);

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
      <MainHeader
        theme={theme}
        toggleTheme={toggleTheme}
        currentUser={profile}
        loginUser={nickname}
        Count={alarmCount}
        alarmdata={alarmdata}
      />
      <MainFilter
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        category={category}
        setCategory={setCategory}
        distance={distance}
        setDistance={setDistance}
        sortedLike={sortedLike}
        setSortedLike={setSortedLike}
        period={period}
        setPeriod={setPeriod}
        feed={feed}
        setFeed={setFeed}
        feedKey={feedKey}
        setFeedKey={setFeedKey}
      />
      <MainFeed
        information={feed}
        currentUser={profile}
        loginUser={nickname}
        type={type}
        feed={feed}
        setFeed={setFeed}
        feedKey={feedKey}
        setFeedKey={setFeedKey}
        currentLocation={currentLocation}
        category={category}
        distance={distance}
        sortedLike={sortedLike}
        period={period}
      />
    </Wrapper>
  );
}

export default Main;
