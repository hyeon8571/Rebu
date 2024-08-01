import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ModalDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
  padding: 0;
  margin: 0;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;

  @media (min-width: 769px) {
    width: 50%;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Close = styled.span`
  padding: 0;
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;
const ModalContent = styled.div`
  overflow: auto;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  max-height: 320px;
  width: 75%;
  height: auto;
  background-color: ${({ theme }) => theme.body};
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  transform: ${(props) => (props.isOpen ? "scale(1)" : "scale(0.8)")};
`;

export default function Modal({ isOpen, setIsOpen, children }) {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <ModalDiv isOpen={isOpen}>
        <ModalBox isOpen={isOpen}>
          <Close onClick={closeModal}>&times;</Close>
          <ModalContent>{children}</ModalContent>
        </ModalBox>
      </ModalDiv>
    </React.Fragment>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.node,
};
