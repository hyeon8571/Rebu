import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Box = styled.div`
   
`;


const StyledSlider = styled.div`
    position: relative;
    border-radius: 3px;
    background: #dddddd;
    height: 10px;
    width: 70%;
    margin: auto;
`;

const StyledThumb = styled.div`
    width: 10px;
    height: 20px;
    border-radius: 3px;
    position: relative;
    top: -5px;
    opacity: 0.5;
    background: #943AEE;
    cursor: pointer;
`;

const SliderHeader = styled.div`
    width: 70%;
    display: flex;
    justify-content: flex-end;
    margin: auto;
`;

const Slider = ({ initial, max, onChange }) => {
    const sliderRef = React.useRef();
    const thumbRef = React.useRef();
    const diff = React.useRef();
    const currentRef = React.useRef();
    const [currentValue, setCurrentValue] = useState(initial);
    // const value = currentValue

    const handleMouseMove = event => {
        let newX =
            event.clientX -
            diff.current -
            sliderRef.current.getBoundingClientRect().left;

        const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
        const start = 0;

        if (newX < start) {
            newX = start;
        }

        if (newX > end) {
            newX = end;
        }

        const newValue = Math.round((newX / end) * max);
        setCurrentValue(newValue);

        thumbRef.current.style.left = `${newX}px`;
        currentRef.current.textContent = newValue;

        onChange(newValue);
    };

    const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
    };

    const handleMouseDown = event => {
        diff.current =
            event.clientX - thumbRef.current.getBoundingClientRect().left;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        const initialX = (initial / max) * (sliderRef.current.offsetWidth - thumbRef.current.offsetWidth);
        thumbRef.current.style.left = `${initialX}px`;
        currentRef.current.textContent = initial;
    }, [initial, max]);

    return (
        <>
            <SliderHeader>
                <strong ref={currentRef}>{initial}</strong>
                &nbsp;/&nbsp;
                {max}km
            </SliderHeader>
            <StyledSlider ref={sliderRef}>
                <StyledThumb 
                    ref={thumbRef}
                    onMouseDown={handleMouseDown}
                />
            </StyledSlider>
        </>
    );
};

const SlideBar = () => (
  <Box>
    <Slider 
      initial={0}
      max={20}
      onChange={value => console.log(value)}
    />
  </Box>
);

export default SlideBar;
