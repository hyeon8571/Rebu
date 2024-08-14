import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import ButtonSmall from "../common/ButtonSmall";

const ButtonContainer = styled.div`
  display: flex;
  padding-top: 1rem;
  justify-content: space-around;
`;

const InputBox = styled.textarea`
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
  height: 10rem;
`;

const DescriptionContainer = styled.div`
  font-size: 14px;
  text-align: center;
`;

export default function EditDesignerIntroduction({
  introduction,
  setIsModalOpen,
}) {
  const [inputValue, setInputValue] = useState(introduction);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post(
        "/api/your-endpoint", // replace with your actual endpoint
        {
          workingIntroduction: inputValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response data:", response.data);
      // Add any logic needed after a successful request, e.g., closing the modal or showing a success message
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error while sending the request:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const Button1 = {
    id: 1,
    title: "수정",
    onClick: handleSaveClick,
    highlight: true,
  };

  const Button2 = {
    id: 2,
    title: "취소",
    onClick: () => {
      setIsModalOpen(false);
    },
    highlight: false,
  };

  return (
    <>
      <DescriptionContainer>표시할 소개글을 입력해주세요</DescriptionContainer>
      <InputBox
        value={inputValue}
        onChange={handleInputChange}
        placeholder="소개글을 입력해주세요"
      />
      <ButtonContainer>
        <ButtonSmall button={Button1}></ButtonSmall>
        <ButtonSmall button={Button2}></ButtonSmall>
      </ButtonContainer>
    </>
  );
}
