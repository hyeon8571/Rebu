import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdPlace } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import MainFilterStat from "./MainFilterStat";
import CurrentLocation from "../common/CurrentLocation";
import axios from "axios";
import { BASE_URL } from "../../views/Signup";

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
    color: ${(props) =>
      props.theme.value === "light" ? "#943AEE" : "#f4ebfd"};
  }
`;

const FilterIconActive = styled(VscSettings)`
  width: 30px;
  height: 30px;
  color: ${(props) => (props.theme.value === "light" ? "#9e4def" : "#f4ebfd")};
  &:hover {
    color: ${(props) =>
      props.theme.value === "light" ? "#943AEE" : "#f4ebfd"};
  }
`;

const FilterList = styled.div`
  display: flex;
  margin: 0px auto;
  padding: 0 10px;
  width: 95%;
  margin-bottom: 10px;
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
  background-color: ${(props) => (props.selected ? "#b475f3" : "#f9f5fe")};
  color: ${(props) => (props.selected ? "white" : "#a855f7")};
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
    background-color: ${(props) => (props.selected ? "#b475f3" : "#f3e8ff")};
  }
`;

const MainFilter = ({
  currentLocation,
  setCurrentLocation,
  category,
  setCategory,
  distance,
  setDistance,
  sortedLike,
  setSortedLike,
  period,
  setPeriod,
  feed,
  setFeed,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryButtons = ["헤어", "네일", "에스테틱", "타투", "애견미용"];

  const handleFilterOpen = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleButtonClick = (button) => {
    let cate = "";

    if (button === "헤어") {
      cate = "HAIR";
    } else if (button === "네일") {
      cate = "NAIL";
    } else if (button === "에스테틱") {
      cate = "AESTHETICS";
    } else if (button === "타투") {
      cate = "TATTOO";
    } else if (button === "애견미용") {
      cate = "PET";
    }

    if (category === cate) {
      // 이미 선택된 카테고리를 다시 클릭하면 해제
      setCategory("");
    } else {
      // 새로운 카테고리를 선택하면 그 카테고리로 설정
      setCategory(cate);

      const access = localStorage.getItem("access");
      axios
        .get(`${BASE_URL}/api/feeds`, {
          params: {
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
            distance: distance,
            category: cate, // 변경된 category를 사용
            period: period,
            sortedLike: sortedLike,
          },
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          console.log("피드 데이터를 조회했습니다");
          console.log(response.data.body);
          setFeed(response.data.body);
        })
        .catch((err) => {
          console.log("피드 데이터를 찾지 못했습니다");
        });
    }
  };

  return (
    <FilterContainer>
      <FirstContainer>
        <CurrentLocation
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />
        {isFilterOpen ? (
          <FilterIconActive onClick={handleFilterOpen} />
        ) : (
          <FilterIcon onClick={handleFilterOpen} />
        )}
      </FirstContainer>

      <FilterList expanded={isFilterOpen}>
        {isFilterOpen && (
          <MainFilterStat
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            category={category}
            setCategory={setCategory}
            distance={distance}
            setDistance={setDistance}
            sortedLike={sortedLike}
            setSortedLike={setSortedLike}
            period={period}
            setPeriod={setPeriod}
            feed={feed}
            setFeed={setFeed}
            closeButton={setIsFilterOpen}
          />
        )}
      </FilterList>

      <SecondContainer>
        {categoryButtons.map((button) => (
          <Button
            key={button}
            selected={
              category ===
              (button === "헤어"
                ? "HAIR"
                : button === "네일"
                ? "NAIL"
                : button === "에스테틱"
                ? "AESTHETICS"
                : button === "타투"
                ? "TATTOO"
                : "PET")
            }
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </Button>
        ))}
      </SecondContainer>
    </FilterContainer>
  );
};

export default MainFilter;
