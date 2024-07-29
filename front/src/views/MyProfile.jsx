import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { visitedCards } from "../util/mockDatas";
import TabComponent from "../components/common/Tab";
import ProfileImage from "../components/MyProfile/MyProfileImage";
import Img from "../assets/images/cha.png";
import ProfileInfo from "../components/MyProfile/MyProfileInfo";
import Header from "../components/MyProfile/MyProfileHeader";
import ReviewGrid from "../components/MyProfile/ReviewGrid";
import ScrapGrid from "../components/MyProfile/ScrapGrid";
import LikesCard from "../components/MyProfile/LikesCard";
import ChaImg from "../assets/images/cha.png";
import nail1Img from "../assets/images/nail1.png";
import nail2Img from "../assets/images/nail2.png";
import nailartImg from "../assets/images/nailart.png";
import nail3Img from "../assets/images/nail3.png";
import manImg from "../assets/images/man.png";
import hairImg from "../assets/images/hair.png";

export const Wrapper = styled.div`
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : props.theme.body};
  transition: background-color 0.5s linear;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 768px;
`;

const ProfileContainer = styled.div`
  max-width: 768px;
  width: 100%;
`;

const GridContainer = styled.div`
  max-width: 768px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const IntroduceBox = styled.div`
  height: 30%;
`;

const StickyTabContainer = styled.div`
  position: ${(props) => (props.isSticky ? "fixed" : "relative")};
  top: 50px;
  right: ${(props) => (props.isSticky ? "50%" : "0px")};
  transition: background-color 0.5s linear;
  @media (max-width: 768px) {
    width: 100%;
    right: 0%;
  }
  width: ${(props) => (props.isSticky ? "50%" : "100%")};
  max-width: 768px;
  /* left: ${(props) => (props.isSticky ? "16px" : "0")}; */
  grid-column: 2 / 3;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : props.theme.body};
`;

const ReviewPhotos = [ChaImg, nail3Img, hairImg];
const ScrapPhotos = [manImg, nail1Img, nail2Img, nailartImg];
const name = "Cha_Cha";
const introduce = "나는 차은우 나는 뷰티 마스터 V";
const ReviewCount = ReviewPhotos.length;
const ScrapCount = ScrapPhotos.length;
const LikesCount = visitedCards.length;
const FollowersCount = 10;
const FollowingCount = 12;

const ProfilePage = ({ theme, toggleTheme, children }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [key, setKey] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const tabTitle = [
    { name: "Reviews", content: "Reviews", count: ReviewCount },
    { name: "Scraps", content: "Scraps", count: ScrapCount },
    { name: "Likes", content: "Likes", count: LikesCount },
  ];

  const tabRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tabRef.current) {
        setIsSticky(tabRef.current.getBoundingClientRect().top <= 50); // 60 is the height of the header
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderGrid = () => {
    const content = tabTitle[currentTab].content;
    if (content === "Reviews") {
      return <ReviewGrid key={key} uploadedPhotos={ReviewPhotos} />;
    } else if (content === "Scraps") {
      return <ScrapGrid key={key} uploadedPhotos={ScrapPhotos} />;
    } else if (content === "Likes") {
      return (
        <React.Fragment key={key}>
          {visitedCards.map((item) => (
            <LikesCard key={item.id} Card={item} button={item.button} />
          ))}
        </React.Fragment>
      );
    }
  };

  const handleTabChange = (index) => {
    setCurrentTab(index);
    setKey((prevKey) => prevKey + 1); // 추가된 부분: 같은 탭을 클릭해도 리렌더링
  };

  return (
    <Wrapper>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <ProfileContainer>
        <IntroduceBox>
          <ProfileImage
            img={Img}
            time={130}
            followers={FollowersCount}
            following={FollowingCount}
          />
          <ProfileInfo name={name} introduce={introduce} />
        </IntroduceBox>
        <div ref={tabRef}>
          <StickyTabContainer isSticky={isSticky}>
            <TabComponent
              tabTitle={tabTitle}
              currentTab={currentTab}
              onTabChange={setCurrentTab}
            />
          </StickyTabContainer>
        </div>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </ProfileContainer>
      <GridContainer>{renderGrid()}</GridContainer>
    </Wrapper>
  );
};

export default ProfilePage;
