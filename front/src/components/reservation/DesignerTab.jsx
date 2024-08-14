import styled from "styled-components";
import Switch from "../common/Switch";
import React, { useEffect, useState } from "react";
import Checkbox from "../common/StyledCheckbox";
import ModalNoBackNoExit from "../common/ModalNoBackNoExit";
import Img from "../../assets/images/img.webp";
import InviteDesigner from "./InviteDesigner";
import EditDesignerIntroduction from "./EditDesignerIntroduction";
import AlertDeleteDesigner from "./AlertDeleteDesigner";
import ButtonSmall from "../common/ButtonSmall";
import ModalPortal from "../../util/ModalPortal";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../util/apiClient";
import { BASE_URL } from "../../util/commonFunction";

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
  font-weight: 600;
  cursor: pointer;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const DesignerIntroduction = styled.li`
  font-size: 12px;
  padding-top: 1rem;
  padding-bottom: 1rem;
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

export default function DesignerTab() {
  const [designers, setDesigners] = useState([]);
  const [isMale, setIsMale] = useState("FEMALE");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [chosenDesigner, setChosenDesigner] = useState(null);

  const navigate = useNavigate();

  // const { nickname } = useParams();
  const nickname = "rebu4_hair3";

  useEffect(() => {
    apiClient
      .get(`${BASE_URL}/api/profiles/shops/${nickname}/employees`)
      .then((response) => {
        console.log(response);
        setDesigners(response.data.body);
      })
      .catch((error) => {
        console.error("Failed to fetch ", error);
      });
  }, []);

  const toggleHandler = () => {
    // isMale의 상태를 변경하는 메소드를 구현
    if (isMale === "FEMALE") {
      setIsMale("MALE");
    } else {
      setIsMale("FEMALE");
    }
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

  function handleChosenDesigner(value) {
    if (chosenDesigner && value.nickname === chosenDesigner.nickname) {
      setChosenDesigner(null);
    } else {
      setChosenDesigner(value);
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
        <Switch isMan={isMale === "MALE"} toggleHandler={toggleHandler} />
      </UpperTabWrapper>
      {designers
        .filter((item) => item.gender === isMale)
        .map((item) => (
          <DesignerCardContainer key={item.nickname}>
            <DesignerContent>
              <DesignerTitle>
                <Checkbox
                  key={item.nickname}
                  value={
                    chosenDesigner && item.nickname === chosenDesigner.nickname
                  }
                  onChange={(e) => handleChosenDesigner(item)}
                />
                <div onClick={() => handleChosenDesigner(item)}>
                  {item.workingName} {item.role}
                </div>
              </DesignerTitle>
              <DesignerIntroduction>
                {item.workingIntroduction}
              </DesignerIntroduction>
              <ReviewContainer>방문자 리뷰 {item.reviewCnt}개</ReviewContainer>
            </DesignerContent>
            <DesignerPhotoContainer>
              <DesignerPhoto src={Img} />
            </DesignerPhotoContainer>
          </DesignerCardContainer>
        ))}
      <NextButtonWrapper>
        <ButtonSmall
          button={{
            id: 1,
            title: "다음",
            onClick: () => {
              if (chosenDesigner) {
                navigate("/menutab", {
                  state: {
                    info: {
                      shopTitle: "싸피 헤어샵",
                      nickname: chosenDesigner.nickname,
                      workingName: chosenDesigner.workingName,
                      role: chosenDesigner.role,
                    },
                  },
                });
              } else {
                window.alert("디자이너를 선택해주세요");
              }
            },
            highlight: true,
          }}
        ></ButtonSmall>
      </NextButtonWrapper>
    </>
  );
}
