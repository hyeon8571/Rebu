import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AiTwotonePlusCircle } from "react-icons/ai";
import api from "../../features/auth/api";
import axios from "axios";
import { Msg, Tooltip, InfoIconContainer } from "../user/SignupForm2";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BASE_URL } from "../../views/Signup";
// const Msg = styled.p``;
// const Tooltip = styled.ul``;
// const InfoIconContainer = styled.div``;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  /* flex: 1; */
`;

const Container = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  padding: 20px;
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
  justify-content: flex-end;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#fff" : props.theme.body};
  margin-left: -4rem;
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
  margin-top: 10px;
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

const Form = styled.form`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #bcbcbc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.theme.value === "light" ? "#fbf8fe" : props.theme.secondary};
  width: 100%;
  max-width: 500px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 5px;
  position: relative;
  &:after {
    content: "${(props) => (props.required ? "*" : "")}";
    color: red;
    font-size: 18px;
    margin-left: 5px;
  }
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: ${(props) =>
    props.theme.value === "light" ? "1px solid #b475f3" : "1px solid #4c4c4c"};
  border-radius: 4px;
  margin-bottom: 10px;
  outline: none;
  &:focus {
    border: 2px solid #ca9ef6;
    box-shadow: 0 0 15px rgba(180, 117, 243, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  padding: 10px;
  border: ${(props) =>
    props.theme.value === "light" ? "1px solid #b475f3" : "1px solid #4c4c4c"};
  border-radius: 4px;
  margin-bottom: 10px;
  outline: none;
  resize: vertical;
  &:focus {
    border: 2px solid #ca9ef6;
    box-shadow: 0 0 15px rgba(180, 117, 243, 0.5);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  background: #943aee;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  &:hover {
    color: #943aee;
  }
`;

const UserRole = styled.span`
  background-color: #e5e5e5;
  border-radius: 15px;
  padding: 5px 10px;
  margin-top: 20px;
  color: #000000;
`;

// 전화번호 형식 변환 함수
export const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, "").slice(0, 11);
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) return `${match[1]}-${match[2]}-${match[3]}`;
  const partialMatch = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);
  if (partialMatch) {
    return `${partialMatch[1]}${partialMatch[2] ? `-${partialMatch[2]}` : ""}${
      partialMatch[3] ? `-${partialMatch[3]}` : ""
    }`;
  }
  return value;
};

// 직원 프로필 생성 함수 (+ 프로필 이미지 업로드)
export const createEmployeeProfile = async (formData) => {
  const access = localStorage.getItem("access"); // access 토큰을 적절히 가져오세요

  try {
    const response = await axios.post(
      `${BASE_URL}/api/profiles/employees`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // 요청 본문 형식 설정
          Access: access, // access 토큰을 헤더에 포함
        },
      }
    );
    console.log("직원 프로필 생성 테스트", response);
    // 요청 성공 시 응답 데이터 반환
    if (response.data.code === "1D00") {
      //1D00: 직원 프로필 생성 성공 코드
      localStorage.setItem("access", response.data.access); // 토큰 새로 저장
      localStorage.setItem("nickname", nickname); // 닉네임 저장
      localStorage.setItem("type", "EMPLOYEE"); // 타입 저장
      localStorage.setItem("profileImg", profileImg); // 프로필 이미지 저장

      return { success: true, data: response.data };
    } else if (response.data.code === "0C05") {
      console.log("닉네임 중복 검사 재실시"); //0C05 닉네임 중복 검사 재실시
      return { success: false, error: response.data };
    } else {
      return { success: false, error: response.data };
    }
  } catch (error) {
    // 요청 실패 시 에러 반환 //0C05 닉네임 중복 검사 재실시
    console.error("프로필 업로드 실패:", error);
    return {
      success: false,
      error: error.response ? error.response.data : "프로필 업로드 실패",
    };
  }
};

const ProfileEmployee = () => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(null);
  const [nickname, setNickname] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [workingName, setWorkingName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [phone, setPhone] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "nickname":
        handleNicknameChange(e);
        break;
      case "workingName":
        setWorkingName(value);
        break;
      case "introduction":
        setIntroduction(value);
        break;
      case "phone":
        handlePhoneChange(e);
        break;
      default:
        break;
    }
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);
  };

  // 닉네임 정규식 체크 및 상태 업데이트
  const handleNicknameChange = (e) => {
    const { value } = e.target;
    const regex =
      /^(?![_-])[A-Za-z0-9](?:[A-Za-z0-9]|[-_](?![_-])){0,14}[A-Za-z0-9]?$/;

    console.log(value);

    if (regex.test(value) || value === "") {
      setNickname(value);
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(() => {
        if (value) {
          checkNicknameAvailability(value);
        }
      }, 500)
    );
  };

  // cleanup function to clear timeout
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  // API - 닉네임 중복확인 GET
  const checkNicknameAvailability = async (nickname) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/profiles/check-nickname`,
        {
          params: {
            nickname: nickname,
            purpose: "generateProfile",
          },
        }
      );
      console.log("닉네임 중복 확인", response);

      //"닉네임 중복 검사 성공 코드"
      if (response.data.code === "1C00") {
        console.log("닉네임 중복 검사 성공");
        if (response.data.body === true) {
          setNicknameMsg("중복된 닉네임입니다");
          setIsNicknameValid(false);
        } else {
          //response.data.body === false
          setNicknameMsg("사용 가능한 닉네임입니다");
          setIsNicknameValid(true);
        }
      } else {
        setNicknameMsg("닉네임 중복 확인 중 오류가 발생했습니다.");
        setIsNicknameValid(false);
      }
    } catch (error) {
      console.error("Error checking nickname availability:", error);
      setNicknameMsg("닉네임 확인 중 오류가 발생했습니다.");
      setIsNicknameValid(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("버튼눌림");
    if (!isNicknameValid) {
      alert("유효한 닉네임을 입력하세요.");
      return;
    }

    const formData = new FormData();
    if (profileImg) {
      console.log("이미지 추가함");
      formData.append("imgFile", profileImg);
    }
    formData.append("nickname", nickname);
    formData.append("workingName", workingName);
    formData.append("introduction", introduction);
    formData.append("phone", phone);

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("프로필생성시작");
      const result = await createEmployeeProfile(formData);
      console.log("프로필생성결과", result);
      console.log("formDate", formData.get("nickname"));

      if (result.success) {
        // 프로필 생성 성공
        setSuccess("직원 프로필이 성공적으로 생성되었습니다.");
        // token 다시 저장하고
        // localStorage.setItem("access", result.data.access);
        // navaigate(`/profile/${nickname}/EMPLOYEE`);
      } else {
        setError(result.error || "프로필 생성 실패");
      }
    } catch (error) {
      setError("알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <CloseButton onClick={() => navigate(-1)}>&times;</CloseButton>
      </Header>
      <ProfileImageWrapper>
        <ProfileImage
          src={profileImg ? URL.createObjectURL(profileImg) : "/logo.png"}
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
      <UserRole>직원</UserRole>
      <Form onSubmit={handleSave}>
        <Div>
          <Label required>닉네임</Label>
          <InfoIconContainer>
            <IoMdInformationCircleOutline size="30" color="gray" />
            <Tooltip>
              <li>길이는 3자 이상 16자 이하입니다.</li>
              <li>알파벳 소문자, 대문자, 숫자, _, -만을 포함합니다.</li>
              <li>_ 또는 -로 시작하지 않습니다.</li>
              <li>_ 또는 -가 연속해서 두 번 이상 나오지 않습니다.</li>
              <li>_ 또는 -로 끝나지 않습니다.</li>
            </Tooltip>
          </InfoIconContainer>
        </Div>
        <Input
          type="text"
          name="nickname"
          value={nickname}
          onChange={handleChange}
          required
        />
        {/* {nicknameMsg && <p>{nicknameMsg}</p>} */}

        <Msg style={{ color: isNicknameValid ? "blue" : "red" }}>
          {nicknameMsg}
        </Msg>
        <Label required>활동명</Label>
        <Input
          type="text"
          name="workingName"
          value={workingName}
          onChange={handleChange}
          required
        />
        <Label>프로필 소개</Label>
        <TextArea
          name="introduction"
          value={introduction}
          onChange={handleChange}
        />
        <Label required>휴대폰 번호</Label>
        <Input
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          required
        />
        <ButtonContainer>
          <SaveButton type="submit">프로필 생성</SaveButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default ProfileEmployee;
