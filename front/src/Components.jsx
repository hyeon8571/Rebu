import React, { useState } from "react";
import styled from "styled-components";
import ButtonFull from "./components/common/ButtonFull";
import Modal from "./components/common/Modal";
import ProfileBig from "./components/common/ProfileBig";
import ProfileLarge from "./components/common/ProfileLarge";
import ProfileMedium from "./components/common/ProfileMedium";
import ProfileSmall from "./components/common/ProfileSmall";
import ButtonLarge from "./components/common/ButtonLarge";
import ButtonSmall from "./components/common/ButtonSmall";
import ModalNoBackGround from "./components/common/ModalNoBackground";
import Img from "./components/common/img.jpg";
import ThemeToggler from "./util/ThemeToggler";

const Wrapper = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
  margin-right: 1rem;
  z-index: 2;
`;
const ProfilesDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Components({ theme, setTheme }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalNoBackgroundOpen, setIsModalNoBackgroundOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const buttons = [
    {
      id: 1,
      onClick: handleModal,
      theme: theme,
      title: "버튼",
      highlight: true,
    },
  ];

  const buttons2 = {
    id: 1,
    onClick: handleFollowingModal,
    theme: theme,
    highlight: true,
    title: "버튼",
  };

  const buttons3 = {
    id: 1,
    onClick: handleFollowingModal,
    highlight: false,
    title: "버튼",
  };

  function handleModal() {
    setIsModalOpen(true);
  }

  function handleFollowingModal() {
    setIsModalNoBackgroundOpen(true);
  }

  return (
    <Wrapper>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        children={
          "ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
        }
      ></Modal>
      <ModalNoBackGround
        isOpen={isModalNoBackgroundOpen}
        setIsOpen={setIsModalNoBackgroundOpen}
      ></ModalNoBackGround>
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

      <ButtonFull buttons={buttons}></ButtonFull>
      <ButtonFull buttons={buttons}></ButtonFull>

      <ButtonFull buttons={buttons}></ButtonFull>
      <ButtonLarge button={buttons2}></ButtonLarge>
      <ButtonLarge button={buttons3}></ButtonLarge>
      <ButtonSmall button={buttons2}></ButtonSmall>
      <ButtonSmall button={buttons3}></ButtonSmall>
    </Wrapper>
  );
}
