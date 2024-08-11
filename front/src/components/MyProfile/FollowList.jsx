import React from "react";
import styled, { keyframes } from "styled-components";
import { fetchFollowingList } from "../../features/common/followSlice";

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

const FollowerContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const OutterCircleOnline = styled.a`
  display: flex;
  justify-content: center;
  width: 56px;
  height: 56px;
  @media (max-width: 475px) {
    width: 46px;
    height: 46px;
  }
  border-radius: 50%;
  margin-right: 10px;
  animation: ${rotateGradient} 3s linear infinite; /* linear 추가 */
`;

const OutterCircleOffline = styled.a`
  display: flex;
  justify-content: center;
  width: 56px;
  height: 56px;
  @media (max-width: 475px) {
    width: 46px;
    height: 46px;
  }
  border-radius: 50%;
  background: gray;
`;

const Insideimg = styled.img`
  align-self: center;
  vertical-align: middle;
  width: 50px;
  height: 50px;
  @media (max-width: 475px) {
    width: 40px;
    height: 40px;
  }
  border-radius: 50%;
  transition: transform 0.5s;
`;

const Info = styled.div`
  flex: 1;
`;

const Username = styled.div`
  color: #8534d6;
  font-weight: bold;
  margin-bottom: 5px;
  @media (max-width: 475px) {
    width: 14px;
  }
`;

const Description = styled.div`
  color: #555;
  @media (max-width: 475px) {
    font-size: 13px;
  }
`;

const Button = styled.button`
  background-color: #8b00ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  @media (max-width: 475px) {
    font-size: 13px;
  }
  cursor: pointer;
`;

const FollowList = ({ follower, time }) => {
  const online = time < 300;

  const handleChat = () => {};

  return (
    <FollowerContainer>
      <React.Fragment>
        {online ? (
          <OutterCircleOnline>
            <Insideimg src={follower.imgSrc} alt="Profile" />
          </OutterCircleOnline>
        ) : (
          <OutterCircleOffline>
            <Insideimg src={follower.imgSrc}></Insideimg>
          </OutterCircleOffline>
        )}
      </React.Fragment>

      <Info>
        <Username>{follower.nickname}</Username>
        <Description>{follower.introduction}</Description>
      </Info>
      <Button>전송</Button>
    </FollowerContainer>
  );
};

export default FollowList;
