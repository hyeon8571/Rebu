import styled from "styled-components";
import { menuData } from "../../util/visitedDatas";
import { useState } from "react";
import Checkbox from "../common/StyledCheckbox";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonSmall from "../common/ButtonSmall";

const MenuCardContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  background-color: ${(props) =>
    props.theme.value === "light" ? props.theme.body : props.theme.secondary};
  padding: 1rem;
  border-top: 2px solid ${(props) => props.theme.primary};
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1/2;
`;

const MenuTitle = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 1rem;
`;

const MenuPhotoContainer = styled.div`
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
`;

const MenuPhoto = styled.img`
  width: 100%;
  max-width: 150px;
  border-radius: 0.5rem;
`;

const MenuIntroduction = styled.li`
  font-size: 12px;
  padding-top: 0.2rem;
`;

const ServiceTimeText = styled.div`
  font-size: 12px;
  padding-top: 0.2rem;
`;

const PriceText = styled.div`
  font-size: 12px;
  padding-top: 0.2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  padding-right: 1rem;
  padding-top: 1rem;
`;
export default function MenuTab() {
  const [chosenMenu, setChosenMenu] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const location = useLocation();
  const { info } = location.state;

  const navigate = useNavigate();

  console.log(info.nickname);
  function handleChosenMenu(value) {
    if (chosenMenu && value.menuId === chosenMenu.menuId) {
      setChosenMenu(null);
    } else {
      setChosenMenu(value);
    }
  }
  return (
    <>
      {menuData
        .filter((item) => item.nickname === info.nickname)
        .map((item) => (
          <MenuCardContainer key={item.menuId}>
            <MenuContent>
              <MenuTitle>
                <Checkbox
                  key={item.nickname}
                  value={chosenMenu ? item.menuId === chosenMenu.menuId : false}
                  onChange={() => handleChosenMenu(item)}
                />
                {item.title}
              </MenuTitle>
              <MenuIntroduction>{item.description}</MenuIntroduction>
              <ServiceTimeText>시술 시간 : {item.duration}분</ServiceTimeText>
              <PriceText>가격 : {item.cost}원</PriceText>
            </MenuContent>
            <MenuPhotoContainer>
              <MenuPhoto src={item.img} />
            </MenuPhotoContainer>
          </MenuCardContainer>
        ))}
      <ButtonWrapper>
        <ButtonSmall
          button={{
            id: 1,
            title: "다음",
            onClick: () => {
              if (chosenMenu) {
                navigate("/calendar", {
                  state: {
                    info: {
                      ...info,
                      menu: chosenMenu.title,
                      nickname: chosenMenu.nickname,
                      serviceTime: chosenMenu.duration,
                      cost: chosenMenu.cost,
                    },
                  },
                });
              } else {
                window.alert("시술을 선택해주세요");
              }
            },
            highlight: true,
          }}
        />
      </ButtonWrapper>
    </>
  );
}
