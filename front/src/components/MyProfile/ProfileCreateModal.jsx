import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : "#e5e5e5"};
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 80%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: start;
  margin-bottom: 20px;
`;

const ModalText = styled.h4`
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 22px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #943aee;
  }
`;

const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background: #943aee;
  /* color: ${(props) => (props.primary ? "white" : "black")}; */
  border: none;
  padding: 10px 20px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
`;

const ProfileCreateModal = ({ ProfileCreateModalOpen, closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    // Navigate to the role-specific account creation page
    navigate(`/create-profile?role=${role}`);
    closeModal(); // Close the modal after navigating
  };

  return (
    <>
      {ProfileCreateModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <ModalText>새 계정 생성</ModalText>
            <ModalButtonContainer>
              <Button onClick={() => handleRoleSelection("EMPLOYEE")}>
                디자이너
              </Button>
              <Button onClick={() => handleRoleSelection("SHOP")}>업체</Button>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ProfileCreateModal;
