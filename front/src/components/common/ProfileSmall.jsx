import React from "react";
import styled from "styled-components";

const OutterCircleOnline = styled.div`
  display: flex;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const InsideImg = styled.img`
  align-self: center;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: transform 0.5s;
`;

export default function ProfileSmall({ img }) {
  return (
    <React.Fragment>
      <OutterCircleOnline>
        <InsideImg src={img} alt="Profile" />
      </OutterCircleOnline>
    </React.Fragment>
  );
}
