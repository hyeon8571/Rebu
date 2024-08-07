import React from "react";
import styled from "styled-components";

const TabMenu = styled.ul`
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : props.theme.secondary};
  color: ${(props) =>
    props.theme.value === "light" ? "#000000" : props.theme.text};
  display: flex;
  margin: auto;
  max-width: 768px;
  height: 60px;
  flex-direction: row;
  align-items: center;
  list-style: none;
  transition: border 0.5s linear;
  padding-left: 0px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 6px;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    width: calc(100% / 3);
    padding: 10px;
    font-size: 14px;
    transition: 0.5s;
    border-radius: 0px;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: ${(props) =>
      props.theme.value === "light" ? "#f7f2fd" : "#cccccc"};
    border-radius: 3px;
    font-weight: bold;
    color: rgb(21, 20, 20);
  }
  & div.desc {
    text-align: center;
  }
`;

const TabItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

const TabName = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const Count = styled.span`
  font-size: 14px;
  color: ${(props) => (props.theme.value === "light" ? "#black" : "#white")};
  cursor: pointer;
`;

const Desc = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-left: 4%;
  margin-bottom: 5px;
`;

const Tab = ({ tabTitle, currentTab, onTabChange }) => {
  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    onTabChange(index);
  };

  return (
    <>
      <TabMenu>
        {/* li 엘리먼트의 class명의 경우 선택된 tab 은 'submenu focused', 나머지 2개의 tab은 'submenu'  */}
        {tabTitle.map((el, index) => (
          <li
            key={index}
            className={index === currentTab ? "submenu focused" : "submenu"}
            onClick={() => selectMenuHandler(index)}
          >
            <TabItem>
              <Count>{el.count}</Count>
              <TabName>{el.name}</TabName>
            </TabItem>
          </li>
        ))}
      </TabMenu>
      <Desc>{tabTitle[currentTab].content}</Desc>
    </>
  );
};

export default Tab;
