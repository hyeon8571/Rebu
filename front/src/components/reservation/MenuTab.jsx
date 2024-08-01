import styled from "styled-components";
import { menuData } from "../../util/visitedDatas";
import { useState } from "react";
import Checkbox from "../common/StyledCheckbox";
import { useLocation,useNavigate } from "react-router-dom";
import ButtonSmall from "../common/ButtonSmall";

const MenuCardContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  background-color: ${(props) =>
    props.theme.value === "light" ? props.theme.body : props.theme.secondary};
  padding: 1rem;
  border-bottom: 2px solid ${(props) => props.theme.primary};
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


export default function MenuTab() {
  const [chosenMenu, setChosenMenu] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const location = useLocation();
  const { nickname } = location.state;

  const navigate = useNavigate();

  console.log(nickname);
  function handleChosenMenu(value) {
  if (chosenMenu && value.menuId === chosenMenu.menuId) {
    setChosenMenu(null);
  } else {
    setChosenMenu(value);
  }
}
  return (
    <>
      {menuData.filter((item) => item.nickname === nickname).map((item) => 
        (
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
            <MenuIntroduction>
              {item.description}
            </MenuIntroduction>
            <ServiceTimeText>
              시술 시간 : {item.duration}
            </ServiceTimeText>
            <PriceText>
              가격 : {item.cost}
            </PriceText>
          </MenuContent>
          <MenuPhotoContainer>
            <MenuPhoto src={item.img}/>
          </MenuPhotoContainer>
          </MenuCardContainer>
        )
      )}
      <ButtonSmall button={{
        id: 1,
        title: "다음",
        onClick: () => {  
                if (chosenMenu) {
                  navigate("/calendar", { state: { menu: { shopTitle: "싸피 네일샵", menu: chosenMenu.title, nickname: chosenMenu.nickname, serviceTime: chosenMenu.duration, cost: chosenMenu.cost } } })
                }
                else {
                  window.alert("시술을 선택해주세요");
                }
              },
                    highlight: true,
            }}></ButtonSmall>
    </>
  );

}