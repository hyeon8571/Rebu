import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ProfileEmployee from "../components/MyProfile/ProfileEmployee";
import ProfileShop from "../components/MyProfile/ProfileShop";

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #333;
`;

const CreateProfile = () => {
  const location = useLocation();

  // URL 쿼리 매개변수에서 role 값을 가져오기
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  return (
    <Container>
      <Heading>
        {role ? `새 계정 생성 테스트: ${role}` : "새 계정 생성"}
      </Heading>
      {role === "EMPLOYEE" && <ProfileEmployee />}
      {role === "SHOP" && <ProfileShop />}
    </Container>
  );
};

export default CreateProfile;
