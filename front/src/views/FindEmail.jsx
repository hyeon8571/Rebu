import { useState } from "react";
import styled from "styled-components";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 3rem;
  position: relative;
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: white;
  color: gray;
  padding: 0.5rem;
  border-radius: 0.25rem;
  top: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.$visible ? "1" : "0")};
  transition: opacity 0.2s;
`;

const InfoIconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  max-width: 10%;
`;

const FindEmail = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <Container>
      <InfoIconContainer
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <IoMdInformationCircleOutline size="30" color="gray" />
        <Tooltip $visible={tooltipVisible}>
          비밀번호: 영문, 숫자, 특수문자 조합으로 이루어진 8~15자의 문자열로
          구성되어야 합니다.
        </Tooltip>
      </InfoIconContainer>
    </Container>
  );
};

export default FindEmail;
