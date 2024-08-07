import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft } from "react-icons/fi";
import { useLocation, useNavigate } from 'react-router-dom';
import { AiTwotonePlusCircle } from "react-icons/ai";

const Container = styled.div`
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
    border: 2px solid #CA9EF6;
    box-shadow: 0 0 15px rgba(180,	117,	243, 0.5);
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
  background-color: #943AEE;
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
  background: #943AEE;
  color: white;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  background: #cccccc;
  color: black;
  cursor: pointer;
`;

const PersonalInfo = () => {
  const location = useLocation();
  const user = location.state?.user;
  const profile = location.state?.profile;
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(profile.imageSrc);
  const [nickname, setNickname] = useState(user.nickname);
  const email = user.email;
  const birth = user.birth;
  const phone = user.phone;
  
  let type = profile.type;
  if (profile.type === "COMMON") {
    type = "일반 사용자";
  } else if (profile.type === "EMPLOYEE") {
    type = "디자이너";
  } else if (profile.type === "SHOP") {
    type = "매장";
  }

  let gender = user.gender;
  if (user.gender === "MALE") {
    gender = "남";
  } else if (user.gender === "FEMALE") {
    gender = "여";
  }

  const handleBackClick = () => {
    window.history.back();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImg(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
    navigate('/profile', { state: { user: updatedUser, profile: updatedProfile}});
    console.log(updatedUser);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick} />
        <HeaderText>개인정보 확인</HeaderText>
      </Header>
      <ProfileImageWrapper>
        <ProfileImage src={profileImg} alt="Profile" />
        <ImgUpload onClick={() => document.getElementById('fileInput').click()} />
        <HiddenFileInput
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
        />
      </ProfileImageWrapper>
      <UserInfo>
        <UserRole>{type}</UserRole>
      </UserInfo>
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
    </Container>
  );
};

export default PersonalInfo;
