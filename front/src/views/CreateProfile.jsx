import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ProfileEmployee from "../components/MyProfile/ProfileEmployee";
import ProfileShop from "../components/MyProfile/ProfileShop";
import { Header, BackButton, HeaderText } from "./PersonalInfo";

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #333;
`;
const handleBackClick = () => {
  //뒤로가기 버튼
  window.history.back();
};

const CreateProfile = () => {
  const location = useLocation();

  // URL 쿼리 매개변수에서 role 값을 가져오기
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick} />
        <HeaderText>프로필 생성</HeaderText>
      </Header>
      {role === "EMPLOYEE" && <ProfileEmployee />}
      {role === "SHOP" && <ProfileShop />}
    </Container>
  );
};

export default CreateProfile;
