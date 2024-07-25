import React from "react";
import styled, { keyframes } from "styled-components";

// 그라디언트 애니메이션을 정의합니다.
const rotateGradient = keyframes`
  0% {
    background: linear-gradient(0deg, #943aee, #af4261);
  }
  10% {
    background: linear-gradient(36deg, #943aee, #af4261);
  }
  20% {
    background: linear-gradient(72deg, #943aee, #af4261);
  }
  30% {
    background: linear-gradient(108deg, #943aee, #af4261);
  }
  40% {
    background: linear-gradient(144deg, #943aee, #af4261);
  }
  50% {
    background: linear-gradient(180deg, #943aee, #af4261);
  }
  60% {
    background: linear-gradient(216deg, #943aee, #af4261);
  }
  70% {
    background: linear-gradient(260deg, #943aee, #af4261);
  }
  80% {
    background: linear-gradient(290eg, #943aee, #af4261);
  }
  90% {
    background: linear-gradient(320eg, #943aee, #af4261);
  }
  100% {
    background: linear-gradient(340deg, #943aee, #af4261);
  }
`;

const OutterCircleOnline = styled.a`
  display: flex;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  animation: ${rotateGradient} 1s linear infinite; /* linear 추가 */
`;

const OutterCircleOffline = styled.a`
  display: flex;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: gray;
`;

const Insideimg = styled.img`
  align-self: center;
  vertical-align: middle;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  transition: transform 0.5s;
`;

export default function ProfileLarge({ img, time }) {
  const online = time < 300;
  return (
    <React.Fragment>
      {online ? (
        <OutterCircleOnline>
          <Insideimg src={img} alt="Profile" />
        </OutterCircleOnline>
      ) : (
        <OutterCircleOffline>
          <Insideimg src={img}></Insideimg>
        </OutterCircleOffline>
      )}
    </React.Fragment>
  );
}
