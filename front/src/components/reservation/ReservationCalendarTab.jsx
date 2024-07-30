import styled, { css } from 'styled-components';
import { useState } from "react";
import ReservationCalendar from "./ReservationCalendar";

const ButtonWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  position: relative;
`;

const ButtonLabelAndInputStyles = css`
  display: block;
`;

const ButtonInput = styled.input.attrs({ type: 'radio' })`
  ${ButtonLabelAndInputStyles}
  opacity: 0.001;
  z-index: 100;


  &:checked + label {
    background: #20b8be;
    
  }
`;

const ButtonContainer = styled.div`

`; 

const ButtonLabel = styled.label`
  ${ButtonLabelAndInputStyles}
  cursor: pointer;
  z-index: 90;
  line-height: 1.8em;
  text-align: center;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

// 예시로 사용하는 React 컴포넌트
function ReservationCalendarTab () {
  

  const [chosenTime, setChosenTime] = useState(null);

return (
  <ButtonWrapper className="button">
    <ButtonContainer>
      <ButtonInput id="radio1" name="radioGroup" />
      <ButtonLabel htmlFor="radio1" onClick={(value) => { setChosenTime(); window.alert(value)}}>10 : 00</ButtonLabel>
    </ButtonContainer>
    <ButtonContainer>
      <ButtonInput id="radio2" name="radioGroup" />
      <ButtonLabel htmlFor="radio2">10 : 05</ButtonLabel>
    </ButtonContainer>
    
    <ButtonContainer>
      <ButtonInput id="radio3" name="radioGroup" />
      <ButtonLabel htmlFor="radio3">10 : 10</ButtonLabel>
    </ButtonContainer>

    <ButtonContainer>
      <ButtonInput id="radio4" name="radioGroup" />
      <ButtonLabel htmlFor="radio4">10 : 15</ButtonLabel>
    </ButtonContainer>
  </ButtonWrapper>
)
};

export default ReservationCalendarTab;
