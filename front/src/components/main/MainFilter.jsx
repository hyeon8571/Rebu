import React, { useState } from "react";
import styled from "styled-components";
import { MdPlace } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import MainFilterStat from "./MainFilterStat";
import CurrentLocation from "../common/CurrentLocation";

const FilterContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
`;

const FirstContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 5px;
`;

const Location = styled.div`
  display: flex;
  color: ${(props) => (props.theme.value === "light" ? "#8e8e8e" : "#ffffff")};
  text-decoration: underline;
  align-items: center;
  cursor: pointer;
`;

const LocationIcon = styled(MdPlace)`
  display: flex;
  width: 20px;
  height: 20px;
`;

const MyPlace = styled.span`
  display: flex;
  font-size: 18px;
`;

const FilterIcon = styled(VscSettings)`
  width: 30px;
  height: 30px;
  color: ${(props) => (props.theme.value === "light" ? "#999999" : "#f4ebfd")};
  &:hover {
    color: ${(props) => (props.theme.value === "light" ? "#943AEE" : "#f4ebfd")};
  }
`;

const FilterIconActive = styled(VscSettings)`
  width: 30px;
  height: 30px;
  color: ${(props) => (props.theme.value === "light" ? "#9e4def" : "#f4ebfd")};
  &:hover {
    color: ${(props) => (props.theme.value === "light" ? "#943AEE" : "#f4ebfd")};
  }
`;

const FilterList = styled.div`
  display: flex;
  margin: 0px auto;
  padding: 0 10px;
  width: 90%;
  max-height: ${(props) => (props.expanded ? "auto" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
 `;

const SecondContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 5px 10px;
  gap: 3px;
`;

const Button = styled.button`
  border: 1.4px solid #a855f7;
  background-color: ${props => (props.selected ? '#c99cf6' : '#f9f5fe')};
  color: ${props => (props.selected ? 'white' : '#a855f7')};
  border-radius: 17px;
  padding: 6px 12px;
  @media (max-width: 400px) {
    padding: 5px 10px;
  }
  font-size: 16px;
  @media (max-width: 375px) {
    font-size: 12px;
  }
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => (props.selected ? '#c99cf6' : '#f3e8ff')};
  }
`;


const MainFilter = ({currentLocation, setCurrentLocation}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState([]);

  const buttons = ['헤어', '네일', '에스테틱', '타투', '애견미용'];

  const handleFilterOpen = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleButtonClick = (button) => {
    setSelectedButtons((prevSelectedButtons) =>
      prevSelectedButtons.includes(button)
        ? prevSelectedButtons.filter((item) => item !== button)
        : [...prevSelectedButtons, button]
    );
  };


  return (
    <FilterContainer>

      <FirstContainer>
        <CurrentLocation currentLocation={currentLocation} setCurrentLocation={setCurrentLocation}/>
        {isFilterOpen ? (
          <FilterIconActive onClick={handleFilterOpen} />
        ) : (
          <FilterIcon onClick={handleFilterOpen} />
        )}
      </FirstContainer>

      <FilterList expanded={isFilterOpen}>
        {isFilterOpen && (
          <MainFilterStat />
        )}
      </FilterList>

      <SecondContainer>
        {buttons.map(button => (
          <Button
            key={button}
            selected={selectedButtons.includes(button)}
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </Button>
        ))}
      </SecondContainer>

    </FilterContainer>
  )
};

export default MainFilter;
