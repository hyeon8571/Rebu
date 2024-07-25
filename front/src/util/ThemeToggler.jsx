// ThemeToggler.js
import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 100px;
  background: ${({ theme }) => theme.body};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
`;

const ThemeToggler = ({ theme, toggleTheme }) => {
  return (
    <Button onClick={toggleTheme}>
      {theme === "light" ? "다크 모드" : "라이트 모드"}
    </Button>
  );
};

export default ThemeToggler;
