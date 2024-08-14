import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonLarge from "../components/common/ButtonLarge";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import BackgroundImg1 from "../../src/assets/images/shop1.png";
import BackgroundImg2 from "../../src/assets/images/shop7.png";
import BackgroundImg3 from "../../src/assets/images/shop10.png";
import RebuImg from "../assets/images/logo.png";

const Wrapper = styled.div`
  display: flex;
  width: 98vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  margin-bottom: -4rem;
`;

const SlideContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => `-${props.current * 100}%`});
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;
`;

const SlideBack = styled(IoIosArrowBack)`
  position: absolute;
  width: 25px;
  height: 100%;
  top: 0;
  left: 0;
  color: #5b5b5b;
  cursor: pointer;
  z-index: 2;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const SlideFront = styled(IoIosArrowForward)`
  position: absolute;
  width: 25px;
  height: 100%;
  top: 0;
  right: 0;
  color: #5b5b5b;
  cursor: pointer;
  z-index: 2;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8) contrast(0.6);
`;

const LogoImg = styled.img`
  position: absolute;
  bottom: 70%;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4); /* 입체감을 위한 그림자 */
  border-radius: 20px; /* 이미지에 약간의 둥근 테두리 */
  filter: brightness(1.1) contrast(1.2); /* 이미지의 밝기와 대비를 높여 더 선명하게 */
  z-index: 3;
`;

const LogoText = styled.div`
  position: absolute;
  bottom: 57%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 70px;
  font-weight: bold;
  color: #be88f4;
  -webkit-text-stroke: 1px #be88f4; /* 검은색 테두리 추가 */
  text-shadow: 4px 4px 12px #444444; /* 그림자 크기 및 투명도 조정 */
  filter: brightness(1.1) contrast(1.1);
  z-index: 3;
`;

const SlideText = styled.div`
  position: absolute;
  bottom: 28%;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 40px; /* 글자 크기를 키움 */
  font-weight: bold; /* 글자를 두껍게 설정 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  z-index: 3;
  width: 80%; /* 박스 너비 설정 */
  text-align: center; /* 텍스트 가운데 정렬 */
  word-wrap: break-word; /* 긴 단어가 박스를 넘지 않도록 줄바꿈 */
  white-space: pre-wrap; /* 필요 시 줄바꿈 */
`;

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 30px;
  z-index: 3;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#943AEE" : "#c5c5c5")};
  margin: 0 4px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 15%;
  z-index: 3;
`;

const AppStart = () => {
  const nav = useNavigate();
  const [current, setCurrent] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(false);
  const nickname = localStorage.getItem("nickname");

  const slides = [BackgroundImg1, BackgroundImg2, BackgroundImg3];
  const length = slides.length;

  useEffect(() => {
    if (nickname) {
      nav("/main"); // 닉네임이 존재하면 메인 화면으로 이동
    }
  }, [nickname, nav]);

  const button = {
    onClick: () => nav("/login"),
    title: "시작하기",
    highlight: "true",
  };

  const nextSlide = () => {
    if (current < length - 1) {
      setCurrent(current + 1);
      if (current === length - 2) {
        setTimeout(() => {
          setButtonVisible(true);
        }, 200);
      }
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
      if (current !== length - 2) {
        setTimeout(() => {
          setButtonVisible(false);
        }, 100);
      }
    }
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <Wrapper>
      <SlideBack onClick={prevSlide} disabled={current === 0} />
      <SlideFront onClick={nextSlide} disabled={current === length - 1} />

      <SlideContainer current={current}>
        {slides.map((slide, index) => (
          <Slide key={index}>
            <PostImage src={slide} alt={`slide-${index}`} />
            <LogoImg src={RebuImg} />
            <LogoText>REBU</LogoText>
            {index === 0 && <SlideText>예약을 편리하게</SlideText>}
            {index === 1 && <SlideText>리뷰를 간편하게</SlideText>}
            {index === 2 && <SlideText>뷰티를 예약하다</SlideText>}
          </Slide>
        ))}
      </SlideContainer>

      <DotsWrapper>
        {slides.map((_, index) => (
          <Dot key={index} active={index === current} />
        ))}
      </DotsWrapper>

      {buttonVisible && (
        <ButtonWrapper>
          <ButtonLarge button={button}></ButtonLarge>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

export default AppStart;
