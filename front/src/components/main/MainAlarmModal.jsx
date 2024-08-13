import React from 'react';
import styled from 'styled-components';
import RebuImg from "../../assets/images/logo.png";
import { useEffect, useState } from 'react';

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

const NotificationItem = styled.div`
  background: #f4ebfd;
  border: ${(props) =>
      props.theme.value === "light" ? '' : '1px solid #be88f4'};;
  padding: 10px;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
`;

const ModalContent = styled.div`
  background: ${(props) =>
      props.theme.value === "light" ? '#ffffff' : '#f7f7f7'};
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

const AlarmHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RebuTitle = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;

`;

const MainLogo = styled.img`
  width: 14px;
  height: 14px;
`;


const AlarmTime = styled.div`
  font-size: 12px;
`;

const timeSince = (date) => {
  const milliSeconds = new Date() - date;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

const NotificationModal = ({ closeModal, loginUser }) => {
  const [alarmdata, setAlarmdata] = useState([]);


  useEffect(() => {
    fetch("/mockdata/alarmdata.json")
      .then((res) => res.json())
      .then((data) => {
        const alarm = data.body.filter(
          (alarm) => alarm.receiverNickname === loginUser.nickname
        );
        setAlarmdata(alarm || data.body);
      });
  }, []);


  return (
    <ModalOverlay>
    <ModalContent>
      <ModalHeader>
        <ModalTitle>MY 알림</ModalTitle>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>
      <hr style={{borderColor: '#b475f3'}}/>
      <AlarmListContainer>
        {alarmdata.map((alarm, index) => (
          <NotificationItem key={index}>
          <AlarmHeader>
            <RebuTitle><MainLogo src={RebuImg}/>&nbsp; REBU 알림</RebuTitle>
            <AlarmTime>{timeSince(new Date(alarm.alarmCreateAT))}</AlarmTime>
          </AlarmHeader>
          <hr style={{borderColor: '#dec3f9'}}/>

          {alarm.alarmType === "COMMENT" && (
            <span><strong>{alarm.senderNickname}</strong>님이 회원님의 게시글에 댓글을 남겼습니다.</span> 
          )}

          {alarm.alarmType === "NESTED_COMMENT" && (
            <span><strong>{alarm.senderNickname}</strong>님이 회원님의 댓글에 답글을 남겼습니다.</span>
          )}

          {alarm.alarmType === "INVITE_EMPLOYEE" && (
            <span><strong>{alarm.shopName}</strong>에서 회원님에게 디자이너 요청을 보냈습니다.</span>
          )}

          {alarm.alarmType === "RESERVATION" && (
          <span><strong>{alarm.receiverNickname}</strong>님이&nbsp;
          <strong>{alarm.startDateTime}</strong>에&nbsp;
          <strong>{alarm.timeTaken}분</strong> 시술 예약을 요청하였습니다.</span>
          )}

          {alarm.alarmType === "FOLLOW" && (
            <span><strong>{alarm.senderNickname}</strong>님이 회원님을 팔로우하기 시작했습니다.</span>
          )}
          </NotificationItem>
          // <NotificationItem key={index}>
          //   <NotificationTime>{notification.time}</NotificationTime>
          //   <NotificationTitle>{notification.title}</NotificationTitle>
          //   <NotificationText>{notification.text}</NotificationText>
          // </NotificationItem>
        ))}
      </AlarmListContainer>
    </ModalContent>
    </ModalOverlay>
  );
};

export default NotificationModal;
