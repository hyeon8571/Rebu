import { useState, useEffect } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../views/Signup";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & > * {
    flex: 1 1 50%;
    @media (max-width: 768px) {
      flex: 1 1 90%;
    }
  }
`;

const StyledSlider = styled.input.attrs(props => ({
  style: {
    background: `linear-gradient(to right, #c99cf6 ${props.distance}%, #dddddd ${props.distance}%)`
  },
}))`
  -webkit-appearance: none;
  appearance: none;
  width: 90%;
  height: 10px;
  border-radius: 5px;
  outline: none;
  transition: opacity .15s ease-in-out;
  margin: auto;
  display: flex;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${(props) =>
      props.theme.value === "light" ? '#b475f3' : '#b475f3'};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${(props) =>
      props.theme.value === "light" ? '#943AEE' : '#c99cf6'};
    cursor: pointer;
  }
`;

const SliderHeader = styled.div`
  width: 85%;
  font-size: 15px;
  display: flex;
  justify-content: flex-end;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 5px;
`;

const DistanceRange = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const UploadRange = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 5px;
  margin-right: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  gap: 3px;
`;

const Button = styled.button`
  border: 1px solid #a855f7;
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

const PopularRange = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
`;

const ToggleContainer = styled.div`
  position: relative;
  width: 50px;
  margin: 0px 20px;
  display: flex;
  justify-content: center;
  cursor: pointer;

  > .toggle-container {
      width: 50px;
      height: 25.5px;
      border-radius: 30px;
      background-color: ${(props) =>
      props.theme.value === "light" ? '#c4c4c4' : '#c4c4c4'};
    }
    
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
      background-color: #b475f3;
      transition : 0.5s;
    }

  > .toggle-circle {
      position: absolute;
      text-align: center;
      margin: 0px;
      top: 1px;
      left: 1.5px;
      width: 25px;
      height: 23px;
      border-radius: 30px;
      background-color: rgb(255,254,255);
      transition : 0.5s;
    }

    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
    > .toggle--checked {
        left: 24px;
        transition : 0.5s;
      }
`;

const SaveButtonContainer = styled.div`
  
`;

const SaveButton = styled.button`
  width: 65px;
  height: 35px;
  align-self: center;
  box-sizing: border-box;
  border: 0;
  color: #ffffff;
  background-color: #be88f4;
  border-radius: 0.5rem;
  margin-bottom: 10px;
  font-weight: 600;

  &:hover {
    background-color: #943aee;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-right: 10px;
`;

const MainFilterStat = ({
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
    setFeed }) => {

  const periodButtons = ['하루', '일주일', '한달', '일년'];

  const handleButtonClick = (button) => {
    if (period === button) {
      // 같은 버튼을 다시 클릭하면 해제
      setPeriod('');
    } else {
      // 다른 버튼을 클릭하면 해당 기간을 설정
      setPeriod(button);
    }
  };

  const handelSave = () => {
    let periodValue;

    switch (period) {
      case '하루':
        periodValue = 1;
        break;
      case '일주일':
        periodValue = 7;
        break;
      case '한달':
        periodValue = 30;
        break;
      case '일년':
        periodValue = 365;
        break;
      default:
        periodValue = 0;
    }

    const access = localStorage.getItem('access');
    axios.get(`${BASE_URL}/api/feeds`, {
      params: {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
        distance: distance,
        category: category,
        period: periodValue,
        sortedLike: sortedLike
      },
      headers : {
        "access" : access,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response)
      console.log("피드 데이터를 조회했습니다")
      console.log(response.data.body)
      setFeed(response.data.body);
    })
    .catch(err => {
      console.log('피드 데이터를 찾지 못했습니다');
    })
  };

  const handleChange = e => {
    setDistance(e.target.value);
  };

  const handlePopularFeed = () => {
    setSortedLike(!sortedLike);
  };

  return (
    <Container>
      <hr style={{border: "0.5px solid #943aee"}} />
      <DistanceRange>
        <span style={{fontWeight: "bold"}}>거리 범위</span>
        <SliderHeader>
          최대거리 : &nbsp; <strong><span>{distance}km</span></strong>
        </SliderHeader>
          <StyledSlider
            type="range"
            id="myRange"
            className="js-range-slider"
            min="5"
            value={distance}
            distance={distance}
            onChange={handleChange}
          />
      </DistanceRange>
      <UploadRange>
        <span style={{fontWeight: "bold"}}>업로드 기간</span>
        <ButtonContainer>
          {periodButtons.map(button => (
            <Button
              key={button}
              selected={period === button}
              onClick={() => handleButtonClick(button)}>
              {button}
            </Button>
          ))}
        </ButtonContainer>
      </UploadRange>

      <ButtonWrapper>
        <PopularRange>
          <span style={{fontWeight: "bold"}}>인기있는 피드 위주로 보기</span>
          <ToggleContainer onClick={handlePopularFeed}>
              <div className={`toggle-container ${sortedLike ? "toggle--checked" : null}`}></div>
              <div className={`toggle-circle ${sortedLike ? "toggle--checked" : null}`}></div>
          </ToggleContainer>
        </PopularRange>
        <SaveButtonContainer>
          <SaveButton onClick={() => handelSave()}>저장</SaveButton>
        </SaveButtonContainer>
      </ButtonWrapper>
     
      <hr style={{border: "0.5px solid #943aee"}} />
    </Container>
  );
};

export default MainFilterStat;
