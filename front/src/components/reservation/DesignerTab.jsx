import styled from "styled-components";
import Switch from "../common/Switch";
import React, { useState } from "react";
import ModalNoBackground from "../common/ModalNoBackground";
import ModalNoBackNoExit from "../common/ModalNoBackNoExit";
import Img from "../../assets/images/img.webp";
import InviteDesigner from "./InviteDesigner";
import EditDesignerIntroduction from "./EditDesignerIntroduction";
import AlertDeleteDesigner from "./AlertDeleteDesigner";

const UpperTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 5px solid ${(props) => props.theme.secondary};
`;

const EditDesignerButton = styled.div`
  cursor: pointer;
  font-size: 12px;
  text-decoration: underline;
  color: ${(props) => (props.theme.value === "light" ? "gray" : "lightgray")};
  align-self: end;
`;

const DesignerCardContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  padding: 0.5rem;
 box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 1rem;
`;

const DesignerContent = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1/2;
`;

const DesignerTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const DesignerIntroduction = styled.text`
  font-size: 12px;
  padding-top: 0.2rem;
`;

const DesignerPhotoContainer = styled.div`
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
`;

const ReviewContainer = styled.span`
  text-decoration: underline;
  cursor: pointer;
  padding-top: 1rem;
  font-size: 10px;
`;

const DesignerPhoto = styled.img`
  width: 100%;
  max-width: 150px;
  border-radius: 50rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-self: end;
  align-self: end;
  padding-top: 0.5rem; /* 추가된 패딩 */
`;

const EditButton = styled.div`
  cursor: pointer;
  font-size: 12px;
  text-decoration: underline;
  color: ${(props) => (props.theme.value === "light" ? "gray" : "lightgray")};
`;

const SaveButton = styled.div`
  cursor: pointer;
  font-size: 12px;
  text-decoration: underline;
  padding-left: 0.5rem;
  color: ${(props) => (props.theme.value === "light" ? "gray" : "lightgray")};
`;

const DesignerData = [
  {
    id: 1,
    workingName: "유승",
    role: "원장",
    workingIntroduction:
      `[맨즈헤어/레이어드펌/셋팅펌 전문]\n` +
      `편안하고 자연스러운 디자인을 찾아드리겠습니다.`,
    gender: true,
    review: 12,
  },
  {
    id: 2,
    workingName: "승현",
    role: "실장",
    workingIntroduction: "[맨즈헤어/애즈펌/열펌 전문]",
    gender: true,
    review: 10,
  },
  {
    id: 3,
    workingName: "지원",
    role: "실장",
    workingIntroduction: "[여성헤어/S컬, C컬 펌/셋팅펌 전문]",
    gender: false,
    review: 17,
  },
  {
    id: 4,
    workingName: "진서",
    role: "디자이너",
    workingIntroduction: "[여성헤어/레이어드 컷 /염색 전문]",
    gender: false,
    review: 14,
  },
];

export default function DesignerTab() {
  const [isMale, setIsMale] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const isShopProfile = true;

  const toggleHandler = () => {
    // isMale의 상태를 변경하는 메소드를 구현
    setIsMale(!isMale);
  };

  function handleModifyDesigner() {
    setIsEditMode(true);
    setModalContent();
  }

  function handleModifyInstruction(introduction) {
    setIsModalOpen(true);
    setModalContent(
      <EditDesignerIntroduction introduction={introduction} setIsModalOpen={setIsModalOpen} />
    );
  }

  function handleSaveDesigner() {
    setIsEditMode(false);
  }

  function handleAddDesigner() {
    setIsModalOpen(true);
    setModalContent(<InviteDesigner setIsModalOpen={setIsModalOpen} />);
  }

  function handleDeleteDesigner() {
    setIsModalOpen(true);
    setModalContent(<AlertDeleteDesigner setIsModalOpen={setIsModalOpen}></AlertDeleteDesigner>);
  }

  return (
    <>
      <ModalNoBackNoExit isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        {modalContent}
      </ModalNoBackNoExit>
      <UpperTabWrapper>
        <Switch isMan={isMale} toggleHandler={toggleHandler} />
        {isShopProfile && !isEditMode && (
          <EditDesignerButton onClick={handleModifyDesigner}>
            디자이너 관리
          </EditDesignerButton>
        )}
        {isEditMode && (
          <ButtonWrapper>
            <EditButton onClick={handleAddDesigner}>추가</EditButton>
            <SaveButton onClick={handleSaveDesigner}>저장</SaveButton>
          </ButtonWrapper>
        )}
      </UpperTabWrapper>
      {DesignerData.filter((item) => item.gender === isMale).map((item) => (
        <DesignerCardContainer key={item.id}>
          <DesignerContent>
            <DesignerTitle>
              {item.workingName} {item.role}
            </DesignerTitle>
            <DesignerIntroduction>
              {item.workingIntroduction}
            </DesignerIntroduction>
            <ReviewContainer>방문자 리뷰 {item.review}개</ReviewContainer>
          </DesignerContent>
          <DesignerPhotoContainer>
            <DesignerPhoto src={Img} />
          </DesignerPhotoContainer>
          {isEditMode && (
            <ButtonWrapper>
              <EditButton onClick={() => handleModifyInstruction(item.workingIntroduction)}>수정</EditButton>
              <SaveButton onClick={handleDeleteDesigner}>삭제</SaveButton>
            </ButtonWrapper>
          )}
        </DesignerCardContainer>
      ))}
    </>
  );
}
