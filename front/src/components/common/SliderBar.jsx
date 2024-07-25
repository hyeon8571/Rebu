import React, { useState } from 'react';
import styled from 'styled-components';


// const StyledSlider = styled.input`
//     position: relative;
//     border-radius: 3px;
//     background: #dddddd;
//     height: 10px;
//     width: 300px;
//     display: flex;
//     margin: auto;
//     margin-top: 3em;
// `;

const StyledSlider = styled.input.attrs(props => ({
  style: {
    background: `linear-gradient(to right, #943AEE ${props.value}%, #dddddd ${props.value}%)`
  },
}))`
  -webkit-appearance: none;
  appearance: none;
  width: 70%;
  height: 10px;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
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
    background: #943AEE;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #943AEE;
    cursor: pointer;
  }
`;

const SliderHeader = styled.div`
    width: 70%;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    margin: auto;
    margin-top: 3em;
    margin-bottom: 0.5em;
`;

// const Text = styled.p`
//     display: flex;
//     justify-content: center;
// `

const SlideBar = () => {

  const [value, setValue] = useState(0);

  const handleChange = e => {
      setValue(e.target.value);
    };

  const handleMouseUp = () => {
    console.log(value);
  };

  const handleTouchEnd = () => {
    console.log(value);
  };

    return (
      <>
      <SliderHeader>
        최대거리 : &nbsp; <strong><span>{value}km</span></strong>
      </SliderHeader>
        <StyledSlider
          type="range"
          id="myRange"
          className="js-range-slider"
          min="0"
          value={value}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleTouchEnd}
        ></StyledSlider>
      </>
    )
};

export default SlideBar;