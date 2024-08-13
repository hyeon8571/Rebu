import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AiTwotonePlusCircle } from "react-icons/ai";
import api from "../../features/auth/api";
import axios from "axios";
import {
  Msg,
  Tooltip,
  InfoIconContainer,
  RadioButtonContainer,
  Button,
} from "../user/SignupForm2";
import { IoMdInformationCircleOutline } from "react-icons/io";
import ButtonSmall from "../common/ButtonSmall";
import { BASE_URL } from "../../views/Signup";

export const Div = styled.div`
  display: flex;
  justify-content: center;
`;
// const Msg = styled.p``;
// const Tooltip = styled.ul``;
// const InfoIconContainer = styled.div``;
// const RadioButtonContainer = styled.div``;
// const Button = styled.button``;

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

const categories = ["헤어", "네일", "에스테틱", "타투", "애견미용"];

const CategoryContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const RadioButton = styled.button`
  border: 2px solid #a55eea;
  background-color: ${(props) => (props.selected ? "#a55eea" : "white")};
  color: ${(props) => (props.selected ? "white" : "#a55eea")};
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${(props) => (props.selected ? "#8117eb" : "#f4e9ff")};
    color: ${(props) => (props.selected ? "white" : "#8117eb")};
  }
`;

// 사업자등록증 확인 API
export const verifyLicense = async (licenceNum) => {
  const access = localStorage.getItem("access");
  try {
    console.log("사업자 등록번호 인증 요청:", licenceNum);
    const response = await axios.post(
      `${BASE_URL}/api/auths/license/verify`,
      {
        licenceNum: licenceNum, // 요청 바디에 사업자 등록번호 포함
        // purpose: "generateShopProfile", // 목적 설정
      },
      {
        headers: {
          "Content-Type": "application/json", // 요청 본문 형식 설정
          Access: access,
        },
      }
    );
    // 요청 성공 시 응답 데이터 반환
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "사업자 등록번호 인증 실패:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || "사업자 등록번호 인증 실패",
    };
  }
};

// 사업자등록번호 형식 변환 함수
export const formatLicenseNumber = (value) => {
  // 입력값에서 숫자만 추출
  const numbers = value.replace(/[^\d]/g, "");
  // xxx-xx-xxxxx 형식으로 포맷팅
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(
    5,
    10
  )}`;
};

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

// 매장 프로필 생성 함수
export const createShopProfile = async (formData) => {
  try {
    const response = await api.post("/profiles/shops", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("매장 프로필 생성", response);
    return response.data;
  } catch (error) {
    console.error("Error creating shop profile:", error);
    throw error;
  }
};

const ProfileShop = () => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(null);
  const [nickname, setNickname] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [name, setName] = useState("");
  const [licenceNum, setLicenceNum] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [selected, setSelected] = useState("헤어"); // 선택된 업종

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
      case "name":
        setName(value);
        break;
      // case "licenceNum":
      //   handleLicenceChange(e);
      //   break;
      case "address":
        setAddress(value);
        break;
      case "phone":
        handlePhoneChange(e);
        break;
      case "category":
        setCategory(value.toUpperCase());
        break;
      default:
        break;
    }
  };

  const handleLicenceChange = (e) => {
    const formattedNumber = formatLicenseNumber(e.target.value);
    // console.log(formattedNumber); // 출력: 123-45-67890setPhone(formattedValue);
    setLicenceNum(formattedNumber);
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
            purpose: "signup",
          },
        }
      );
      console.log("닉네임 중복 확인", response);

      if (response.data.code === "닉네임 중복 검사 성공 코드") {
        console.log("닉네임 중복 검사 성공");
        if (response.data.body === true) {
          setNicknameMsg("중복된 닉네임입니다");
          setIsNicknameValid(false);
        } else {
          setNicknameMsg("사용 가능한 닉네임입니다");
          setIsNicknameValid(true);
        }
      }
    } catch (error) {
      console.error("Error checking nickname availability:", error);
      setNicknameMsg("닉네임 확인 중 오류가 발생했습니다.");
      setIsNicknameValid(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!isNicknameValid) {
      alert("유효한 닉네임을 입력하세요.");
      return;
    }

    const formData = new FormData();
    if (profileImg) {
      formData.append("imgFile", profileImg);
    }
    formData.append("nickname", nickname);
    formData.append("name", name);
    formData.append("licenceNum", licenceNum);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("category", category);

    try {
      await createShopProfile(formData);
      navigate("/main");
    } catch (error) {
      console.error("Failed to create profile:", error);
    }
  };
  // API - 사업자등록증 조회 버튼 클릭 시 실행될 함수
  const handleClick = async () => {
    alert("사업자등록증 조회");
    // // 하이픈 제거 후 API 호출
    // const cleanedLicenceNum = licenceNum.replace(/-/g, '');
    const result = await verifyLicense(licenceNum);

    if (result.success) {
      console.log("인증요청axios 성공:", result.data);
      if (result.data.code === "유효하지 않은 인증 목적") {
        alert("유효하지 않은 인증 목적입니다. 사업자번호를 다시 확인해주세요.");
      } else {
        console.log(result.data);
      }
    } else {
      console.error("인증 실패:", result.error);
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
      <UserRole>매장</UserRole>
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
        <Msg style={{ color: isNicknameValid ? "blue" : "red" }}>
          {nicknameMsg}
        </Msg>
        <Label required>사업자 등록번호</Label>
        <Div>
          <Input
            type="text"
            name="licenceNum"
            value={licenceNum}
            onChange={handleLicenceChange}
            required
            maxLength={12} // 최대 길이 설정 (xxx-xx-xxxxx)
          />

          <ButtonSmall
            button={{
              title: "조회", // 버튼에 표시될 텍스트
              highlight: true, // 하이라이트 여부 (true일 경우 버튼 배경이 primary 색상)
              onClick: handleClick, // 버튼 클릭 시 실행될 함수
            }}
          />
        </Div>

        <Label required>상호명</Label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />

        <Label required>주소</Label>
        <Input
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
          required
        />
        <Label required>휴대폰 번호</Label>
        <Input
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          required
        />
        {/* category: HAIR, NAIL, TATTOO, PET, AESTHETICS */}
        <Label required>매장 업종</Label>
        <CategoryContainer>
          {categories.map((category) => (
            <RadioButton
              key={category}
              selected={selected === category}
              onClick={() => setSelected(category)}
            >
              {category}
            </RadioButton>
          ))}
        </CategoryContainer>

        <Msg>
          * 업종은 HAIR, NAIL, TATTOO, PET, AESTHETICS 중 하나여야 합니다.
        </Msg>

        <ButtonContainer>
          <SaveButton type="submit">프로필 생성</SaveButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default ProfileShop;
