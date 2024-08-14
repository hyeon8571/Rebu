import styled from "styled-components";
import { useState } from "react";
import ButtonSmall from "../common/ButtonSmall";
import confirmLottie from "../../assets/images/uploadConfirm.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

const ButtonContainer = styled.div`
  display: flex;
  padding-top: 1rem;
  justify-content: space-around;
`;

const DescriptionContainer = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLottie = styled(Lottie)`
  width: 75%;
  height: 75%;
`;

const LottieWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function CheckFeed({
  submitFeed,
  setIsModalOpen,
  setSubmitLoading,
  setIsSubmitOk,
  isSubmitOk,
  uploaded,
}) {
  const [nextModal, setNextModal] = useState(false);
  const navigate = useNavigate();

  const Button1 = {
    id: 1,
    title: "업로드",
    onClick: async () => {
      setSubmitLoading(true);
      await submitFeed(); // 비동기 작업 대기
      setNextModal(true);
    },
    highlight: true,
  };

  const Button2 = {
    id: 2,
    title: "취소",
    onClick: () => {
      setIsModalOpen(false);
    },
    highlight: false,
  };

  return (
    <>
      {!nextModal ? (
        <>
          <DescriptionContainer>
            피드를 업로드하시겠습니까?
          </DescriptionContainer>
          <ButtonContainer>
            <ButtonSmall button={Button1}></ButtonSmall>
            <ButtonSmall button={Button2}></ButtonSmall>
          </ButtonContainer>
        </>
      ) : (
        <>
          <DescriptionContainer>
            {uploaded === "FAIL"
              ? "업로드가 실패했습니다"
              : "업로드 되었습니다."}
          </DescriptionContainer>
          {uploaded === "OK" && (
            <LottieWrapper>
              <StyledLottie
                loop={false}
                autoplay={true}
                animationData={confirmLottie}
              />
            </LottieWrapper>
          )}
          <ButtonWrapper>
            <ButtonSmall
              button={{
                id: 1,
                title: "확인",
                onClick: () => {
                  setIsModalOpen(false);
                  setTimeout(() => {
                    setNextModal(false);
                    setIsSubmitOk(""); // 필요에 따라 값 변경
                  }, 500);
                  if (isSubmitOk) {
                    // 변수명 수정
                    navigate("/");
                  }
                },
                highlight: true,
              }}
            ></ButtonSmall>
          </ButtonWrapper>
        </>
      )}
    </>
  );
}
