import styled from "styled-components";
import Switch from "../common/Switch";
import React, { useState } from "react";
import Checkbox from "../common/StyledCheckbox";
import ModalNoBackNoExit from "../common/ModalNoBackNoExit";
import Img from "../../assets/images/img.webp";
import InviteDesigner from "./InviteDesigner";
import EditDesignerIntroduction from "./EditDesignerIntroduction";
import AlertDeleteDesigner from "./AlertDeleteDesigner";
import ButtonSmall from "../common/ButtonSmall";
import ModalPortal from "../../util/ModalPortal";

const UpperTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${(props) => props.theme.primary};
  padding-left: 1rem;
  padding-right: 1rem;
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
  background-color: ${(props) =>
    props.theme.value === "light" ? props.theme.body : props.theme.secondary};
  padding: 1rem;
  border-bottom: 2px solid ${(props) => props.theme.primary};
`;

const DesignerContent = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1/2;
`;

const DesignerTitle = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 1rem;
`;

const DesignerIntroduction = styled.li`
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

const NextButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 5%;
  margin-top: 1rem;
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

const Button = {
  id: 1,
  title: "다음",
  onClick: () => {},
  highlight: true,
};

export default function DesignerTab() {
  const [isMale, setIsMale] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [chosenMenu, setChosenMenu] = useState(null);

  // 예약화면일때
  const isReservation = false;

  // 디자이너일때
  const isDesigner = true;

  // 가게 프로필 일떄
  const isShop = false;

  // 손님일때
  const isCustomer = false;

  // 디자이너인데 자기자신 항목인지 (테스트용 변수 실제로는 map 내부에서 판단해야함)
  const isMine = true;

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
      <EditDesignerIntroduction
        introduction={introduction}
        setIsModalOpen={setIsModalOpen}
      />
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
    setModalContent(
      <AlertDeleteDesigner
        setIsModalOpen={setIsModalOpen}
      ></AlertDeleteDesigner>
    );
  }

  function handleChosenMenu(value) {
    if (value === chosenMenu) {
      setChosenMenu(null);
    } else {
      setChosenMenu(value);
    }
  }

  return (
    <>
      <ModalPortal>
        <ModalNoBackNoExit isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          {modalContent}
        </ModalNoBackNoExit>
      </ModalPortal>
      <UpperTabWrapper>
        <Switch isMan={isMale} toggleHandler={toggleHandler} />
        {(isDesigner || isShop) && !isEditMode && (
          <EditDesignerButton onClick={handleModifyDesigner}>
            디자이너 관리
          </EditDesignerButton>
        )}
        {isEditMode && (
          <ButtonWrapper>
            {isShop && (
              <EditButton onClick={handleAddDesigner}>추가</EditButton>
            )}
            <SaveButton onClick={handleSaveDesigner}>저장</SaveButton>
          </ButtonWrapper>
        )}
      </UpperTabWrapper>
      {DesignerData.filter((item) => item.gender === isMale).map((item) => (
        <DesignerCardContainer key={item.id}>
          <DesignerContent>
            <DesignerTitle>
              {isReservation && (
                <Checkbox
                  key={item.id}
                  value={item.id === chosenMenu}
                  onChange={() => handleChosenMenu(item.id)}
                />
              )}
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
              {isMine && (
                <EditButton
                  onClick={() =>
                    handleModifyInstruction(item.workingIntroduction)
                  }
                >
                  수정
                </EditButton>
              )}
              {isShop || isMine ? (
                <SaveButton onClick={handleDeleteDesigner}>삭제</SaveButton>
              ) : null}
            </ButtonWrapper>
          )}
        </DesignerCardContainer>
      ))}
      {isReservation && (
        <NextButtonWrapper>
          <ButtonSmall button={Button}></ButtonSmall>
        </NextButtonWrapper>
      )}
    </>
  );
}
