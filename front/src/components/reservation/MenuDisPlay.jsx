import styled from "styled-components";
import Img from "../../assets/images/img.webp";
import ModalNoBackNoExit from "../common/ModalNoBackNoExit";
import { useRef, useState, useEffect } from "react";
import { IoSettings } from "react-icons/io5";
import ModalPortal from "../../util/ModalPortal";
import ButtonSmall from "../common/ButtonSmall";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 100%;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  cursor: pointer; /* 클릭 가능한 카드로 만들기 위해 추가 */
`;

const PhotoContainer = styled.img`
  @media (max-width: 768px) {
    width: 80%;
  }
  width: 50%;
  border-radius: 0.3rem;
`;

const ContentContainer = styled.div`
  justify-content: start;
  align-self: start;
  padding-top: 1rem;
  @media (max-width: 768px) {
    padding-left: 10%;
  }
  padding-left: 25%;
`;

const MenuTitleContainer = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;

const DurationContainer = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.text};
`;

const CostContainer = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.text};
`;
const ModalContent = styled.div`
  justify-content: start;
  align-self: start;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
const ModalDescription = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const InsturctionText = styled.div`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.primary};
  font-weight: 600;
  vertical-align: middle;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export default function MenuDisplay() {
  const [menuData, setMenuData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isSettingMode, setIsSettingMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigation = useNavigate();

  const MockData = [
    {
      id: 1,
      nickname: "yuseon",
      img: Img,
      title: "시그니처 세팅펌",
      description:
        "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
      duration: "3h 30",
      cost: "110,000",
    },
    {
      id: 2,
      nickname: "yuseong",
      img: Img,
      title: "시그니처 S컬펌",
      description:
        "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
      duration: "3h",
      cost: "100,000",
    },
    {
      id: 3,
      nickname: "jinseo",
      img: Img,
      title: "밀크브라운 염색",
      description:
        "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
      duration: "2h",
      cost: "80,000",
    },
    {
      id: 4,
      img: Img,
      title: "밀크브라운 염색",
      description:
        "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
      duration: "2h",
      cost: "80,000",
    },
    {
      id: 5,
      img: Img,
      title: "밀크브라운 염색",
      description:
        "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
      duration: "2h",
      cost: "80,000",
    },
    {
      id: 6,
      img: Img,
      title: "밀크브라운 염색",
      description:
        "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
      duration: "2h",
      cost: "80,000",
    },
    {
      id: 7,
      img: Img,
      title: "밀크브라운 염색",
      description:
        "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
      duration: "2h",
      cost: "80,000",
    },
  ];

  function handleSettingMode() {
    if (isSettingMode) {
      setIsDeleteMode(false);
      setIsSettingMode(false);
      setIsEditMode(false);
    } else {
      setIsSettingMode(true);
    }
  }

  function handleModalContent(item) {
    if (!isDeleteMode && !isEditMode) {
      setModalContent(
        <>
          <ModalContentWrapper>
            <PhotoContainer
              src={process.env.PUBLIC_URL + "images/" + item.images[0]}
            />
            <ModalContent>
              <MenuTitleContainer>{item.title}</MenuTitleContainer>
              <ModalDescription>{item.content}</ModalDescription>
              <DurationContainer>소요시간 : {item.timeTaken}</DurationContainer>
              <CostContainer>가격 : {item.price}</CostContainer>
            </ModalContent>
          </ModalContentWrapper>
          <ButtonWrapper>
            <ButtonSmall
              button={{
                id: 1,
                onClick: () => window.alert("예약하기"),
                highlight: true,
                title: "예약하기",
              }}
            />

            <ButtonSmall
              button={{
                id: 2,
                onClick: () => setIsModalOpen(false),
                highlight: false,
                title: "확인",
              }}
            />
          </ButtonWrapper>
        </>
      );
    } else if (isDeleteMode) {
      setModalContent(
        <ModalContentWrapper>
          <ModalContent>
            <MenuTitleContainer>
              해당 항목을 삭제하시겠습니까?
            </MenuTitleContainer>
          </ModalContent>
          <ButtonWrapper>
            <ButtonSmall
              button={{
                id: 1,
                onClick: () => {
                  window.alert("삭제");
                  setIsModalOpen(false);
                },
                highlight: true,
                title: "삭제",
              }}
            />
            <ButtonSmall
              button={{
                id: 1,
                onClick: () => {
                  setIsModalOpen(false);
                },
                highlight: false,
                title: "취소",
              }}
            />
          </ButtonWrapper>
        </ModalContentWrapper>
      );
    } else if (isEditMode) {
      navigation("/addMenu");
    }
    setIsModalOpen(true);
  }

  return (
    <>
      <ModalPortal>
        <ModalNoBackNoExit isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          {modalContent}
        </ModalNoBackNoExit>
      </ModalPortal>
      <Wrapper>
        <IconWrapper>
          <IoSettings
            style={{ paddingRight: "12px" }}
            size={24}
            fill={isSettingMode ? "#999999" : "#000"}
            onClick={handleSettingMode}
          ></IoSettings>
        </IconWrapper>
        {!isSettingMode || isDeleteMode || isEditMode ? (
          <></>
        ) : (
          <ButtonWrapper>
            <ButtonSmall
              button={{
                id: 1,
                onClick: handleAddMenuModalOpen,
                highlight: true,
                title: "메뉴 추가",
              }}
            ></ButtonSmall>
            <ButtonSmall
              button={{
                id: 2,
                onClick: () => {
                  setIsEditMode(true);
                },
                highlight: true,
                title: "메뉴 수정",
              }}
            ></ButtonSmall>
            <ButtonSmall
              button={{
                id: 3,
                onClick: () => {
                  setIsDeleteMode(true);
                },
                highlight: true,
                title: "메뉴 삭제",
              }}
            ></ButtonSmall>
          </ButtonWrapper>
        )}
        {addMenuModalOpen && (
          <AddMenuModal
            addMenuModalOpen={addMenuModalOpen}
            closeModal={closeModal}
          />
        )}
        {isDeleteMode && (
          <InsturctionText>삭제할 항목을 클릭해주세요</InsturctionText>
        )}
        {isEditMode && (
          <InsturctionText>수정할 항목을 클릭해주세요</InsturctionText>
        )}

        <Grid>
          {menuData &&
            menuData.map((item) => (
              <Card
                key={item.id}
                onClick={() => {
                  handleModalContent(item);
                }}
              >
                <PhotoContainer
                  src={process.env.PUBLIC_URL + "images/" + item.images[0]}
                />
                <ContentContainer>
                  <MenuTitleContainer>{item.title}</MenuTitleContainer>
                  <DurationContainer>
                    소요시간 : {item.timeTaken}분
                  </DurationContainer>
                  <CostContainer>가격 : {item.price}</CostContainer>
                </ContentContainer>
              </Card>
            ))}
        </Grid>
      </Wrapper>
    </>
  );
}
