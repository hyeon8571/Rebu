import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiChevronLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { getCommonProfileInfo } from "../../features/common/userSlice";
import Img from "../../assets/images/img.webp";
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#fff" : props.theme.body};
`;

const HeaderText = styled.p`
  font-size: 20px;
  margin-left: 15px;
`;

const BackButton = styled(FiChevronLeft)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin-top: 5px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 5px;
`;

const ImgUpload = styled(AiTwotonePlusCircle)`
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

export const PersonalInfoCommon = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      const result = await getCommonProfileInfo();
      console.log("getCommonProfileInfo result", result);
      if (result.success) {
        setProfile(result.data);
        if (
          (result.data.imageSrc === null) |
          (result.data.imageSrc === "null")
        ) {
          setImageSrc(Img);
        } else {
          setImageSrc(result.data.imageSrc);
        }
        setNickname(result.data.nickname);
        setEmail(result.data.email);
        setBirth(result.data.birth);
        setPhone(result.data.phone);
        setGender(result.data.birth);
        console.log("profile 조회 성공", profile);
      } else {
        setError(result.error);
      }
    };

    fetchProfileInfo();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const handleEdit = () => {
    const updateNickname = {
      ...user,
      nickname: nickname,
    };
    console.log(updateNickname);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      nickname: nickname,
    };
    const updatedProfile = {
      ...profile,
      nickname: nickname,
      imageSrc: profileImg,
    };
    alert("저장되었습니다.");
    console.log(updatedUser);
  };

  return (
    <>
      <Form>
        <Label>닉네임</Label>
        <Input type="text" value={nickname} onChange={handleChange} />
        <EditButton onClick={handleEdit}>수정</EditButton>
        <br />
        <Label>이메일</Label>
        <InfoBox type="email" value={email} readOnly />
        <br />
        <Label>생년월일</Label>
        <InfoBox type="text" value={birth} readOnly />
        <br />
        <Label>전화번호</Label>
        <InfoBox type="text" value={phone} readOnly />
        <br />
        <Label>성별</Label>
        <InfoBox type="text" value={gender} readOnly />
      </Form>
      <ButtonContainer>
        <DeleteButton>회원탈퇴</DeleteButton>
        <SaveButton onClick={handleSave}>저장</SaveButton>
      </ButtonContainer>
    </>
  );
};

export default PersonalInfoCommon;
