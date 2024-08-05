import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

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
    width: 80%;
    max-width: 420px;
    min-width: 240px;
`;

const InputBox = styled.input`
    border: 1px solid #000;
    border-radius: 3px;
    height: 30px;
    padding: 0 20px;
    box-sizing: border-box;
    width: 80%;
    display: flex;
    margin: auto;
    margin-top: 10px;
`;

const SelectComponent = ({ options, category, setCategory }) => {
  const [selectedValue, setSelectedValue] = useState(category || "");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    console.log(value);
    if (value=== "직접입력") {
      setCategory(null);
    }
    else {
      setCategory(value);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCategory(value);
  };

  return (
    <div>
      <SelectBox onChange={handleChange} value={selectedValue}>
        <option value="" disabled>
          시술 분류
        </option>
        {options.map((target) => (
          <option key={target.value} value={target.value}>
            {target.title}
          </option>
        ))}
        <option value="직접입력">[직접입력]</option>
      </SelectBox>
      {selectedValue === "직접입력" && (
        <InputBox
          placeholder="시술 분류"
          value={category}
          onChange={handleInputChange}
        />
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
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default SelectComponent;
