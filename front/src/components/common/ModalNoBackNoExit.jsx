import React from "react";
import styled from "styled-components";

const ModalDiv = styled.div`
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  overflow: auto;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 5%;
`;

const ModalBox = styled.div`
  display: flex;
  position: fixed;
  top: 20vh;
  @media (max-width: 768px) {
    top: 20vh;
  }
  flex-direction: column;
  background-color: ${(props) => props.theme.background};
  max-width: 640px;
  max-height: 70%;
  width: 75%;
  height: auto;
  background-color: ${({ theme }) => theme.body};
  padding: 1rem;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.boxShadow};

  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  transform: ${(props) => (props.isOpen ? "scale(1)" : "scale(0.8)")};
`;

export default function ModalNoBackNoExit({ isOpen, setIsOpen, children }) {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <ModalDiv isOpen={isOpen}>
        <ModalBox isOpen={isOpen}>
          <ModalContent>{children}</ModalContent>
        </ModalBox>
      </ModalDiv>
    </React.Fragment>
  );
}
