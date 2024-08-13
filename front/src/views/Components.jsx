import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonFull from "../components/common/ButtonFull";
import Modal from "../components/common/Modal";
import ProfileBig from "../components/common/ProfileBig";
import ProfileLarge from "../components/common/ProfileLarge";
import ProfileMedium from "../components/common/ProfileMedium";
import ProfileSmall from "../components/common/ProfileSmall";
import ButtonLarge from "../components/common/ButtonLarge";
import ButtonSmall from "../components/common/ButtonSmall";
import ModalNoBackGround from "../components/common/ModalNoBackground";
import Img from "../assets/images/img.webp";
import ThemeToggler from "../util/ThemeToggler";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import confirmLottie from "../assets/images/confirmLottie.json";
import ButtonDisabled from "../components/common/ButtonDisabled";
import ModalPortal from "../util/ModalPortal";
import axios from "axios";
import CurrentLocation from "../components/common/CurrentLocation";
import SearchModal from "../components/Search/SearchModal";

const Wrapper = styled.div``;
const ProfilesDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Components({ theme, toggleTheme }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalNoBackgroundOpen, setIsModalNoBackgroundOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();

  const buttons = [
    {
      id: 1,
      onClick: handleModal,
      title: "버튼",
      highlight: true,
    },
  ];

  const buttons2 = {
    id: 1,
    onClick: () => {
      navigate("/designer");
    },
    highlight: true,
    title: "에약 플로우",
  };

  const buttons3 = {
    id: 1,
    onClick: () => {},
    highlight: false,
    title: "버튼",
  };

  const buttons4 = [
    {
      id: 1,
      onClick: () => {
        navigate("/timetable");
      },
      title: "시간표",
      highlight: true,
    },
  ];

  const buttons5 = [
    {
      id: 1,
      onClick: () => {
        navigate("/myreservation");
      },
      title: "내 예약 보기",
      highlight: true,
    },
  ];
  const buttons6 = [
    {
      id: 1,
      onClick: () => {
        navigate("/setrev");
      },
      title: "예약 설정",
      highlight: true,
    },
  ];
  const buttons7 = [
    {
      id: 1,
      onClick: () => {
        navigate("/addmenu");
      },
      title: "시술 추가",
      highlight: true,
    },
  ];
  const buttons8 = [
    {
      id: 1,
      onClick: () => {
        navigate("/menudisplay");
      },
      title: "시술 보기",
      highlight: true,
    },
  ];
  const buttons9 = {
    id: 1,
    onClick: () => {
      navigate("/");
    },
    title: "시술 보기",
    highlight: true,
  };
  const button10 = [
    {
      id: 1,
      onClick: () => {
        navigate("/postfeed");
      },
      title: "매장 피드 작성",
      disabled: true,
    },
  ];

  const button11 = {
    id: 1,
    onClick: () => {
      navigate("/designer");
    },
    title: "디자이너 보기",
    highlight: true,
  };

  const button12 = {
    id: 1,
    onClick: () => {
      navigate("/stat");
    },
    title: "리뷰 키워드 통계",
    highlight: true,
  };

  function handleModal() {
    setIsModalOpen(true);
  }

  function handleFollowingModal() {
    setIsModalNoBackgroundOpen(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <ThemeToggler theme={theme} toggleTheme={toggleTheme}></ThemeToggler>
      <ProfilesDisplay>
        <ProfileBig img={Img} time={0} />
        <ProfileBig img={Img} time={3600} />
        <ProfileLarge img={Img} time={0} />
        <ProfileLarge img={Img} time={3600} />
        <ProfileMedium img={Img} time={0} />
        <ProfileMedium img={Img} time={3600} />
        <ProfileSmall img={Img} />
      </ProfilesDisplay>
      <CurrentLocation
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />

      <Lottie
        style={{ width: 100, height: 100 }}
        animationData={confirmLottie}
      />

      <ButtonFull buttons={buttons4}></ButtonFull>
      <ButtonFull buttons={buttons5}></ButtonFull>
      <ButtonFull buttons={buttons7}></ButtonFull>
      <ButtonFull buttons={buttons6}></ButtonFull>
      <ButtonFull buttons={buttons8}></ButtonFull>
      <ButtonFull buttons={button10}></ButtonFull>
      <ButtonLarge button={button12}></ButtonLarge>
      <ButtonLarge button={button11}></ButtonLarge>
      <ButtonLarge button={buttons9}></ButtonLarge>
      <ButtonLarge button={buttons3}></ButtonLarge>
      <ButtonSmall button={buttons2}></ButtonSmall>
      <ButtonSmall button={buttons3}></ButtonSmall>
    </Wrapper>
  );
}
