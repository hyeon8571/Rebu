import React, { useState } from "react";
import styled from "styled-components";
import { FiChevronLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { updateProfileImage } from "../features/common/userSlice";
import { PersonalInfoCommon } from "../components/MyProfile/PersonalInfoCommon";
import defaultImg from "../assets/images/img.webp";
// import { useSelector } from "react-redux";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  max-width: 768px;
  margin: 0 auto;
  margin-bottom: 70px;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#fff" : props.theme.body};
  border-radius: 8px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#fff" : props.theme.body};
`;

export const HeaderText = styled.p`
  font-size: 20px;
  margin-left: 15px;
`;

export const BackButton = styled(FiChevronLeft)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin-top: 5px;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 5px;
`;

export const ImgUpload = styled(AiTwotonePlusCircle)`
  color: #757575;
  font-size: 28px;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`;

const UserRole = styled.span`
  background-color: #e5e5e5;
  border-radius: 15px;
  padding: 5px 10px;
  margin-top: 20px;
  color: #000000;
`;

const Form = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  /* border: 1px solid #CA9EF6; */
  /* box-shadow: 0 0 15px rgba(202,	158, 246, 0.3); */
  border: 1px solid #bcbcbc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.theme.value === "light" ? "#fbf8fe" : props.theme.secondary};
`;

const Label = styled.p`
  flex: 1;
  font-weight: bold;
`;

const Input = styled.input`
  width: 200px;
  color: #666666;
  padding: 10px;
  border: ${(props) =>
    props.theme.value === "light" ? "1px solid #b475f3" : "1px solid #4c4c4c"};
  border-radius: 4px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  outline: none;
  &:focus {
    border: 2px solid #ca9ef6;
    box-shadow: 0 0 15px rgba(180, 117, 243, 0.5);
  }
`;

const InfoBox = styled.input`
  width: 200px;
  color: #666666;
  padding: 10px;
  border: ${(props) =>
    props.theme.value === "light" ? "1px solid #b475f3" : "1px solid #4c4c4c"};
  border-radius: 4px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  &:not(:focus) {
    pointer-events: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 80%;
  max-width: 700px;
  @media (max-width: 475px) {
    justify-content: space-between;
  }
`;

const EditButton = styled.button`
  background-color: #943aee;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  @media (max-width: 475px) {
    font-size: 13px;
  }
`;

const SaveButton = styled(Button)`
  background: #943aee;
  color: white;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  background: #cccccc;
  color: black;
  cursor: pointer;
`;

export const PersonalInfo = () => {
  const nickname = localStorage.getItem("nickname");
  const type = localStorage.getItem("type");
  const imageSrc = localStorage.getItem("imageSrc");
  console.log("imageSrc", imageSrc);
  const [profileImg, setProfileImg] = useState(imageSrc);

  const handleBackClick = () => {
    //뒤로가기 버튼
    window.history.back();
  };

  // 프로필 수정 API 호출
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const result = await updateProfileImage(file); //nickname

      if (result.success) {
        const newImageSrc = result.data.imageSrc; // 예를 들어 API 응답에 새로운 이미지 URL이 있다고 가정
        localStorage.setItem("imageSrc", newImageSrc); // localStorage에 새로운 이미지 URL 저장
        setProfileImg(newImageSrc); // 컴포넌트 상태 업데이트
        console.log("프로필 이미지가 성공적으로 변경되었습니다.");
      } else {
        console.error("프로필 이미지 변경에 실패했습니다:", result.error);
      }
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick} />
        <HeaderText>개인정보 확인</HeaderText>
      </Header>
      <ProfileImageWrapper>
        {/* <ProfileImage src={profileImg} alt="Profile" /> */}
        <ProfileImage
          src={
            profileImg === null || profileImg === "null"
              ? defaultImg
              : profileImg
          }
          alt="Profile"
        />
        <ImgUpload
          onClick={() => document.getElementById("fileInput").click()}
        />
        <HiddenFileInput
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
        />
      </ProfileImageWrapper>
      <UserInfo>
        {/* <UserRole>{type}</UserRole> */}
        <UserRole>
          {type === "EMPLOYEE"
            ? "디자이너"
            : type === "SHOP"
            ? "매장"
            : "일반 사용자"}
        </UserRole>
      </UserInfo>
      {/* type이 "COMMON"일 때만 PersonalInfoCommon을 렌더링 */}
      {type === "COMMON" && <PersonalInfoCommon />}{" "}
    </Container>
  );
};
export default PersonalInfo;
