// src/components/user/NicknameInput.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoMdInformationCircleOutline } from "react-icons/io";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: whitesmoke;
  color: gray;
  padding: 0.5rem;
  border-radius: 1rem;
  top: -2.5rem;
  transform: translateX(-50%);
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
`;

const InfoIconContainer = styled.div`
  cursor: pointer;
  position: relative;

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
  position: relative;

  &:after {
    content: "${(props) => (props.required ? "*" : "")}";
    color: red;
    position: absolute;
    right: -15px;
    top: 0;
    font-size: 18px;
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

const Msg = styled.p`
  font-size: 11px;
  padding: 0;
  margin: 0;
  color: ${(props) => (props.isValid ? "blue" : "red")};
`;

const BASE_URL = "YOUR_BASE_URL_HERE"; // Replace with your actual base URL

const NicknameInput = ({ nickname, onChange, onValidation }) => {
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

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

      if (response.data.code === "닉네임 중복 검사 성공 코드") {
        if (response.data.body === true) {
          setNicknameMsg("중복된 닉네임입니다");
          setIsNicknameValid(false);
        } else {
          setNicknameMsg("사용 가능한 닉네임입니다");
          setIsNicknameValid(true);
        }
        onValidation(isNicknameValid);
      }
    } catch (error) {
      console.error("Error checking nickname availability:", error);
      setNicknameMsg("닉네임 확인 중 오류가 발생했습니다.");
      setIsNicknameValid(false);
      onValidation(false);
    }
  };

  const handleNicknameChange = (e) => {
    const { value } = e.target;
    const regex =
      /^(?![_-])[A-Za-z0-9](?:[A-Za-z0-9]|[-_](?![_-])){0,14}[A-Za-z0-9]?$/;

    if (regex.test(value) || value === "") {
      onChange(value);
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

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <InputContainer>
      <Label required htmlFor="nickname">
        닉네임
      </Label>
      <Input
        type="text"
        id="nickname"
        value={nickname}
        onChange={handleNicknameChange}
        placeholder="닉네임을 입력하세요"
        maxLength={16}
        minLength={3}
        required
      />
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
      <Msg isValid={isNicknameValid}>{nicknameMsg}</Msg>
    </InputContainer>
  );
};

export default NicknameInput;
