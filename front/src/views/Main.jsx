import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainHeader from "../components/main/MainHeader";
import MainFilter from "../components/main/MainFilter";
import MainFeed from "../components/main/MainFeed";

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
    fetch('/mockdata/loginuser.json')
      .then(res => res.json())
      .then((data) => {
        setLoginUser(data.body);
      })      
  }, []);

  useEffect(() => {
    fetch('/mockdata/personalprofile.json')
      .then(res => res.json())
      .then((data) => {
        const matchedProfile = data.body.find(profile => profile.nickname === loginUser.nickname);
        setProfile(matchedProfile || data.body);
      })      
  }, [loginUser]);

  useEffect(() => {
    fetch('/mockdata/reviewdata.json')
      .then(res => res.json())
      .then((data) => {
        setFeed(data.body);
        console.log(data.body);
      })      
  }, []);


  return (
    <Wrapper>
      <MainHeader theme={theme} toggleTheme={toggleTheme} />
      <MainFilter />
      <MainFeed information={feed} currentUser={profile} loginUser={loginUser} />
    </Wrapper>
  )
};

export default Main;
