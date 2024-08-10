import { useSelector, useDispatch } from "react-redux";
import { alarmsAgreement } from "../features/auth/authSlice";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainHeader from "../components/main/MainHeader";
import MainFilter from "../components/main/MainFilter";
import MainFeed from "../components/main/MainFeed";

function Main() {
  const dispatch = useDispatch();

  // Redux 상태에서 필요한 정보 가져오기
  const { profile, nickname, type, isLogin } = useSelector(
    (state) => state.auth
  );

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

    useEffect(() => {
      fetch("/mockdata/loginuser.json")
        .then((res) => res.json())
        .then((data) => {
          setLoginUser(data.body);
        });
    }, []);

    useEffect(() => {
      fetch("/mockdata/personalprofile.json")
        .then((res) => res.json())
        .then((data) => {
          const matchedProfile = data.body.find(
            (profile) => profile.nickname === loginUser.nickname
          );
          setProfile(matchedProfile || data.body);
        });
    }, [loginUser]);

    useEffect(() => {
      fetch("/mockdata/reviewdata.json")
        .then((res) => res.json())
        .then((data) => {
          setFeed(data.body);
          console.log(data.body);
        });
    }, []);

    useEffect(() => {
      // 컴포넌트가 마운트될 때 alarmsAgreement 액션을 디스패치합니다.
      const fetchAlarmsAgreement = async () => {
        const alarmsResult = await dispatch(alarmsAgreement());
        if (!alarmsResult.success) {
          // 알람 동의 실패 시 처리할 내용 (선택 사항)
          console.error("Failed to agree to alarms:", alarmsResult.error);
        }
      };

      fetchAlarmsAgreement();
    }, [dispatch]);

    return (
      <Wrapper>
        <MainHeader theme={theme} toggleTheme={toggleTheme} />
        <MainFilter />
        <MainFeed
          information={feed}
          currentUser={profile}
          loginUser={loginUser}
        />
      </Wrapper>
    );
  }
}
export default Main;
