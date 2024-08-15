import styled from "styled-components";
import { menuData } from "../../util/visitedDatas";
import { useState, useEffect } from "react";
import Checkbox from "../common/StyledCheckbox";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonSmall from "../common/ButtonSmall";
import apiClient from "../../util/apiClient";
import { BASE_URL } from "../../util/commonFunction";
import { BASE_IMG_URL } from "../../util/commonFunction";
import Header from "../common/Header";

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
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const MenuPhotoContainer = styled.div`
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
`;

const MenuPhoto = styled.img`
  width: 100px;
  height: 100px;
  max-width: 150px;
  border-radius: 0.5rem;
`;

const MenuIntroduction = styled.div`
  font-size: 14px;
  padding-top: 1rem;
  padding-bottom: 1rem;
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

const MenuTitleWrapper = styled.div`
  cursor: pointer;
`;

const NoticeText = styled.div`
  font-size: 24px;
  margin-top: 4rem;
  margin-left: 2rem;
  font-weight: 600;
`;

export default function MenuTab() {
  const [chosenMenu, setChosenMenu] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const location = useLocation();
  const { info } = location.state;

  const navigate = useNavigate();
  console.log(info);

  useEffect(() => {
    console.log(info.nickname);
    apiClient
      .get(`${BASE_URL}/api/menus?employeeNickname=${info.employeeNickname}`, {
        headers: {
          "Content-Type": "application/json",
          access: `${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setMenuData(response.data.body);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [info]);

  function handleChosenMenu(value) {
    if (chosenMenu && value.id === chosenMenu.id) {
      setChosenMenu(null);
    } else {
      setChosenMenu(value);
    }
  }
  return (
    <>
      <Header title={"시술 선택"} />
      {menuData.length > 0 ? (
        menuData.map((item) => (
          <MenuCardContainer key={item.id}>
            <MenuContent>
              <MenuTitle>
                <Checkbox
                  key={item.id}
                  value={chosenMenu ? item.id === chosenMenu.id : false}
                  onChange={() => handleChosenMenu(item)}
                />
                <MenuTitleWrapper onClick={() => handleChosenMenu(item)}>
                  {item.title}
                </MenuTitleWrapper>
              </MenuTitle>
              <MenuIntroduction>{item.content}</MenuIntroduction>
              <ServiceTimeText>시술 시간 : {item.timeTaken}분</ServiceTimeText>
              <PriceText>가격 : {item.price}원</PriceText>
            </MenuContent>
            <MenuPhotoContainer>
              <MenuPhoto src={BASE_IMG_URL + "/" + item.images[0]} />
            </MenuPhotoContainer>
          </MenuCardContainer>
        ))
      ) : (
        <NoticeText>등록된 시술이 없습니다.</NoticeText>
      )}
      <ButtonWrapper>
        {menuData.length > 0 && (
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
                        menuId: chosenMenu.id,
                        menuTitle: chosenMenu.title,
                        serviceTime: chosenMenu.timeTaken,
                        cost: chosenMenu.price,
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
        )}
      </ButtonWrapper>
    </>
  );
}
