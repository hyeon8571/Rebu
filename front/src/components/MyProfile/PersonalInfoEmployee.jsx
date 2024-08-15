import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getEmployeeMyProfile,
  updateWorkingName,
  updatePhoneNumber,
  deleteProfile,
} from "../../features/common/userSlice";
import Img from "../../assets/images/img.webp";

const Form = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 8px;
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

export const PersonalInfoEmployee = () => {
  const [nickname, setNickname] = useState("");
  const [workingName, setWorkingName] = useState("");
  const [phone, setPhone] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingWorkingName, setIsEditingWorkingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      const result = await getEmployeeMyProfile();
      if (result.success) {
        setProfile(result.data);
        if (!result.data.imageSrc || result.data.imageSrc === "null") {
          setImageSrc(Img);
        } else {
          setImageSrc(result.data.imageSrc);
        }
        setNickname(result.data.nickname);
        setWorkingName(result.data.workingName);
        setPhone(result.data.phone);
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
    const { name, value } = e.target;
    if (name === "nickname") setNickname(value);
    else if (name === "workingName") setWorkingName(value);
    else if (name === "phone") setPhone(value);
  };

  const handleEdit = (field) => {
    if (field === "nickname") setIsEditingNickname(true);
    else if (field === "workingName") setIsEditingWorkingName(true);
    else if (field === "phone") setIsEditingPhone(true);
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) return `${match[1]}-${match[2]}-${match[3]}`;
    const partialMatch = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);
    if (partialMatch) {
      return `${partialMatch[1]}${
        partialMatch[2] ? `-${partialMatch[2]}` : ""
      }${partialMatch[3] ? `-${partialMatch[3]}` : ""}`;
    }
    return value;
  };
  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);
  };
  const handleSave = async (field) => {
    try {
      let result;
      if (field === "nickname") {
        // 닉네임 업데이트 로직 추가 가능
        setIsEditingNickname(false);
      } else if (field === "workingName") {
        // 활동명 업데이트 로직 추가 가능
        result = await updateWorkingName(nickname, workingName);
        if (result.success) setIsEditingWorkingName(false);
        else setError(result.error);
      } else if (field === "phone") {
        // 전화번호 업데이트 로직 추가 가능
        result = await updatePhoneNumber(nickname, phone);
        if (result.success) setIsEditingPhone(false);
        else setError(result.error);
      }
    } catch (error) {
      setError("Failed to update: " + error.message);
    }
  };

  const handleDelete = (nickname) => {
    deleteProfile(nickname).then((result) => {
      if (result.success) {
        console.log("Profile deletion successful:", result.data);
      } else {
        console.error("Profile deletion failed:", result.error);
      }
    });
  };
  return (
    <>
      <Form>
        <Label>닉네임</Label>
        <Input
          type="text"
          name="nickname"
          value={nickname}
          onChange={handleChange}
          disabled={!isEditingNickname}
        />
        {isEditingNickname ? (
          <EditButton onClick={() => handleSave("nickname")}>저장</EditButton>
        ) : (
          <EditButton onClick={() => handleEdit("nickname")}>수정</EditButton>
        )}
        <br />
        <Label>활동명</Label>
        <Input
          type="text"
          name="workingName"
          value={workingName}
          onChange={handleChange}
          disabled={!isEditingWorkingName}
        />
        {isEditingWorkingName ? (
          <EditButton onClick={() => handleSave("workingName")}>
            저장
          </EditButton>
        ) : (
          <EditButton onClick={() => handleEdit("workingName")}>
            수정
          </EditButton>
        )}
        <br />
        <Label>전화번호</Label>
        <Input
          type="text"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
          disabled={!isEditingPhone}
        />
        {isEditingPhone ? (
          <EditButton onClick={() => handleSave("phone")}>저장</EditButton>
        ) : (
          <EditButton onClick={() => handleEdit("phone")}>수정</EditButton>
        )}
        <br />
      </Form>
      <ButtonContainer>
        <DeleteButton onClick={() => handleDelete(nickname)}>
          프로필삭제
        </DeleteButton>
      </ButtonContainer>
    </>
  );
};

export default PersonalInfoEmployee;
