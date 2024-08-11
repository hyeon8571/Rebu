import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 300px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

// const ModalHeader = styled.div`
//   font-size: 1.2rem;
//   color: #8a2be2; /* Purple color */
//   margin-bottom: 10px;
// `;

const NotificationItem = styled.div`
  background: #f4ebfd;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const NotificationTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const NotificationTime = styled.div`
  color: gray;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const NotificationText = styled.div`
  font-size: 0.9rem;
  span {
    font-weight: bold;
  }
`;

// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   font-size: 1.2rem;
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   cursor: pointer;
// `;

// const ModalOverlay = styled.div`
//   position: absolute;
//   top: 70%;
//   left: 50%;
//   @media (min-width: 768px) {
//     left: 55%;
//   }
//   transform: translateX(-50%);
//   width: 90%;
//   @media (min-width: 768px) {
//     width: 80%;
//   }
//   max-width: 500px;
//   z-index: 1000;
// `;

const ModalContent = styled.div`
  background: ${(props) =>
      props.theme.value === "light" ? '#ffffff' : '#e5e5e5'};
  color: black;
  padding: 10px;
  border: 1.5px solid #943AEE;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
  width: 80%;
  margin-top: 0;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  @media (max-width: 375px) {
    font-size: 16px;
  }
  margin: 0 auto;
  color: #943AEE;
`;

const CloseButton = styled.button`
  background: transparent;
  color: #943AEE;
  font-size: 25px;
  border: none;
  /* padding: 5px; */
  border-radius: 5px;
  cursor: pointer;
  float: right;
  `;

const AlarmListContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const NotificationModal = ({ notifications, closeModal }) => {
  return (
    <ModalOverlay>
    <ModalContent>
      <ModalHeader>
        <ModalTitle>MY 알림</ModalTitle>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <hr style={{borderColor: '#dec3f9'}}/>
      <AlarmListContainer>
        {notifications.map((notification, index) => (
          <NotificationItem key={index}>
            <NotificationTime>{notification.time}</NotificationTime>
            <NotificationTitle>{notification.title}</NotificationTitle>
            <NotificationText>{notification.text}</NotificationText>
          </NotificationItem>
        ))}
      </AlarmListContainer>
    </ModalContent>
    </ModalOverlay>
  );
};

export default NotificationModal;
