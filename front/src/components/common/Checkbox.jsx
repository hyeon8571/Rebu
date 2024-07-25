import { useState } from 'react';
import styled from 'styled-components';


const CheckBox = styled.div`
    position: relative;
    margin: 1rem auto;
    text-align: center;
`

// const Title = styled.div`


// `

const CheckboxComponent= ({checkValue, label}) => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleChecked = (event) => {
      setIsChecked(event.target.checked);
      console.log({label})
    };
  
    return (
      <CheckBox>
        <input 
          type="checkbox"
          checked={isChecked}
          value={checkValue}
          onChange={handleChecked}
        />
        <span>{label}</span>
      </CheckBox>
    );
  }

  export default CheckboxComponent;

