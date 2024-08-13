import styled from "styled-components";
import Lottie from "lottie-react";
import confirmLottie from "../../assets/images/confirmLottie.json";
import ButtonSmall from "../common/ButtonSmall";
import { useNavigate } from "react-router-dom";

const DescriptionContainer = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: confirmLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const StyledLottie = styled(Lottie)`
  width: 100%;
  height: 100%;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function ConfirmReservation({ setIsModalOpen }) {
  const navigate = useNavigate();

  return (
    <>
      <DescriptionContainer>
        예약이 정상적으로 처리되었습니다
      </DescriptionContainer>
      <Lottie
        loop={false}
        autoplay={true}
        animationData={confirmLottie}
      ></Lottie>
      <ButtonWrapper>
        <ButtonSmall
          button={{
            id: 1,
            title: "확인",
            onClick: () => {
              setIsModalOpen(false);
              navigate("/myreservation");
            },
            highlight: true,
          }}
        ></ButtonSmall>
      </ButtonWrapper>
    </>
  );
}
