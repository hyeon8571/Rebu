import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SelectBox = styled.select`
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  height: 30px;
  border-radius: 3px;
  padding: 0 40px 0 20px;
  background-image: url("../assets/images/select-arrow.png");
  background-repeat: no-repeat;
  background-size: 13px;
  background-position: 30%;
  cursor: pointer;
  outline: none;
  display: flex;
  margin: auto;
  width: 45%;
  margin-top: 3em;
  margin-bottom: 10px;
`;

const InputBox = styled.input`
  border: 1px solid #000;
  border-radius: 3px;
  height: 30px;
  padding: 0 20px;
  box-sizing: border-box;
  width: 45%;
  display: flex;
  margin: auto;
  margin-top: 10px;
`;

const SaveButton = styled.button`
  display: flex;
  margin: 10px auto;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  background-color: #943aee;
  color: white;
  cursor: pointer;
`;

const SelectComponent = ({ options }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [optionList, setOptionList] = useState(options);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    if (inputValue.trim() !== "") {
      const newOption = { value: inputValue, title: inputValue };
      setOptionList([...optionList, newOption]);
      setSelectedValue(inputValue);
      setInputValue("");
      console.log(inputValue);
    }
  };

  return (
    <div>
      <SelectBox onChange={handleChange} value={selectedValue}>
        <option value="" disabled selected>
          시술 분류
        </option>
        {optionList &&
          optionList.map((target) => (
            <option key={target.value} value={target.value}>
              {target.title}
            </option>
          ))}
        <option value="직접입력">직접입력</option>
      </SelectBox>
      {selectedValue === "직접입력" && (
        <>
          <InputBox
            placeholder="시술 분류"
            value={inputValue}
            onChange={handleInputChange}
          />
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </>
      )}
    </div>
  );
};

SelectComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// const SelectOption = () => (
//   <div>
//     <SelectComponent
//       options={[
//         { value: 'option1', title: '옵션 1' },
//         { value: 'option2', title: '옵션 2' },
//         { value: 'self', title: '직접입력' },
//       ]}
//     />
//   </div>
// );

export default SelectComponent;
