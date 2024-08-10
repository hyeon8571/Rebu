import React, { useState, useEffect } from "react";
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
    display: flex;
    width: calc(100% / 3);
    padding: 10px;
    font-size: 14px;
    transition: 0.5s;
    border-radius: 0px;
  }

  .focused {
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
  font-size: 15px;
  margin-top: 15px;
  margin-left: 5%;
  margin-bottom: 5px;
`;

const TabTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Tabs = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s;
  ${({ active }) => active && `
    border-bottom: 2px solid #943aee;
    font-weight: bold;
  `}
  &:hover {
    border-bottom: 2px solid #d4b0f8;
  }
`;

const Content = styled.div`
  margin-top: 18px;
`;

const Tab = ({ tabTitle, currentTab, onTabChange, tabName, onSubTabChange, activeSubTab }) => {
  const selectMenuHandler = (index) => {
    onTabChange(index);
  };

  const handleTabClick = (tab) => {
    onSubTabChange(tab);
  };

  return (
    <>
      <TabMenu>
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
      <Desc>
        <TabTitle>{tabTitle[currentTab].content}</TabTitle>
        {currentTab === 2 && (
          <TabContainer>
            <Tabs active={activeSubTab === tabName[0]} onClick={() => handleTabClick(tabName[0])}>예약현황</Tabs>
            <Tabs active={activeSubTab === tabName[1]} onClick={() => handleTabClick(tabName[1])}>디자이너</Tabs>
          </TabContainer>
        )}
      </Desc>
    </>
  );
};

export default Tab;
