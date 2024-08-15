import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { BASE_URL } from "./util/commonFunction";

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};

const AlarmToast = ({ t, comment }) => {
  const formattedDate = formatDate(comment.alarmCreateAT);
  let content;
  let message;
  let isDouble = false;
  let onClickAccept = () => {};
  let onClickReject = () => toast.dismiss(t.id);

  switch (comment.alarmType) {
    // case "FOLLOW":
    //   message = `팔로우 알림`;
    //   content = `${comment.senderNickname}님이 팔로우를 시작했습니다.`;
    //   break;
    case "INVITE_EMPLOYEE":
      message = `매장 초대 요청`;
      content = `${comment.shopName}에서 ${comment.role}역할로 매장에 초대 받으셨습니다.`;
      isDouble = true;
      const eId = comment.receiverId;
      const sId = comment.senderId;
      onClickAccept = () => addDesigner(eId, sId, comment.role);
    case "RESERVATION":
      message = `예약 요청 알림`;
      content = `${comment.receiverNickname}님이 ${formattedDate(
        comment.startDateTime
      )}에 예약 요청(${comment.timeTaken}분)을 하셨습니다`;
      isDouble = true;
      onClickAccept = () => acceptReservation(comment.reservationId);
  }
  return (
    <ToastContainer visible={t.visible}>
      <Content>
        <TextContainer>
          <Message>{message}</Message>
          <ContentText>{content}</ContentText>
          <DateText>{formattedDate}</DateText>
        </TextContainer>
      </Content>

      {!isDouble ? (
        <CloseButton onClick={() => toast.dismiss(t.id)}>Close</CloseButton>
      ) : (
        <ButtonWrapper>
          <CloseButton onClick={() => {}}>수락</CloseButton>
          <CloseButton>거절</CloseButton>
        </ButtonWrapper>
      )}
    </ToastContainer>
  );
};

export default AlarmToast;

async function addDesigner(eId, sId, role) {
  await axios.patch(
    `${BASE_URL}/api/profiles/employees/${nickname}/shop`,
    {
      employeeProfileId: eId,
      shopProfileId: sId,
      role: role,
    },
    {
      headers: {
        "Content-Type": "application/json",
        access: `${localStorage.getItem("access")}`,
      },
    }
  );
}

async function acceptReservation(rId, answer) {
  await axios
    .patch(
      `${BASE_URL}/reservations/${rId}`,
      {
        reservationStatus: answer ? "ACCEPTED" : "REFUSED",
      },
      {
        headers: {
          "Content-Type": "application/json",
          access: `${localStorage.getItem("access")}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(error);
    });
}

const ToastContainer = styled.div`
  max-width: 28rem;
  width: 100%;
  background-color: #f6ebff;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  display: flex;
  pointer-events: auto;
  animation: ${({ visible }) =>
    visible ? "enter 0.3s ease-out" : "leave 0.3s ease-in"};

  @keyframes enter {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes leave {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10%);
    }
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  align-items: start;
`;

const TextContainer = styled.div`
  margin-left: 0.75rem;
  flex: 1;
`;

const Message = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const ContentText = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  font-weight: bold;
  color: #4b5563;
`;

const DateText = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const CloseButton = styled.button`
  width: 25%;
  border: none;
  border-left: 1px solid #e5e7eb;
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: medium;
  color: #4f46e5;
  background: transparent;
  cursor: pointer;
  &:hover {
    color: #4338ca;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4338ca;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; /* 버튼 사이에 간격을 고르게 배치 */
  align-content: space-around; /* 버튼들이 수직으로 중앙에 위치 */
  width: 25%; /* 부모 요소의 너비를 차지 */
  gap: 0.5rem; /* 버튼 사이의 간격 */
`;
