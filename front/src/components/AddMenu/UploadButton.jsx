import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonWrapper = styled.div``;

const Button = styled.button`
  width: 90x;
  height: 40px;
  align-self: center;
  box-sizing: border-box;
  border: 0;
  color: ${(props) => (props.highlight ? "#fff" : props.theme.text)};
  background: ${(props) =>
    props.highlight
      ? props.theme.primary
      : props.theme.value === "dark" && props.theme.secondary};
  border-radius: 0.5rem;
  margin-bottom: 10px;
  font-weight: 600;

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow};
  }
`;

const UploadButton = ({ button }) => {
  return (
    <ButtonWrapper>
      <Button onClick={button.onClick} highlight={button.highlight}>
        {button.title}
      </Button>
    </ButtonWrapper>
  );
};

UploadButton.propTypes = {
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
    highlight: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default UploadButton;
