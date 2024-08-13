import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  getCommonProfile,
  getEmployeeProfile,
  getShopProfile,
} from "../features/common/userSlice";

import TabComponent from "../components/MyProfile/MyProfileTab";
import ProfileImage from "../components/MyProfile/MyProfileImage";
import ProfileInfo from "../components/MyProfile/MyProfileInfo";
import Header from "../components/MyProfile/MyProfileHeader";
import ReviewGrid from "../components/MyProfile/ReviewGrid";
import ScrapGrid from "../components/MyProfile/ScrapGrid";
import LikesCard from "../components/MyProfile/LikesCard";

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : props.theme.body};
  transition: background-color 0.5s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 768px;
  margin-bottom: 70px;
`;

const ProfileContainer = styled.div`
  max-width: 768px;
  width: 100%;
`;

const StickyTabContainer = styled.div`
  position: ${(props) => (props.isSticky ? "sticky" : "relative")};
  top: ${(props) =>
    props.isSticky ? "0" : "auto"}; // 화면 상단에 고정되도록 설정
  left: 0;
  right: 0;
  width: 100%;
  max-width: 768px;
  transition: all 0.5s ease-in-out;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : props.theme.body};
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
  -ms-overflow-style: none; /* IE와 Edge */
  scrollbar-width: none; /* Firefox */
`;

const IntroduceBox = styled.div`
  height: 30%;
`;

const ProfilePage = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const updatedUser = location.state?.user;
  const updatedProfile = location.state?.profile;
  const [currentTab, setCurrentTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [key, setKey] = useState(0);
  const tabRef = useRef(null);
  const [likeCard, setLikeCard] = useState([]);
  const [reviewdata, setReveiwData] = useState([]);
  const [scrapdata, setScrapData] = useState([]);
  const [followerdata, setFollowerData] = useState([]);
  const [followingdata, setFollowingData] = useState([]);
  const [loginUser, setLoginUser] = useState([]);

  // Redux 상태에서 필요한 정보 가져오기
  const { imageSrc } = useSelector((state) => state.auth);
  const { nickname, type } = useParams(); // URL 파라미터에서 nickname과 type을 추출
  const [profile, setProfile] = useState([]); //profile 조회
  const [error, setError] = useState(null);

  console.log("MyProfile호출!", nickname, type, imageSrc);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let response;

        switch (type) {
          case "COMMON":
            response = await getCommonProfile(nickname);
            break;
          case "EMPLOYEE":
            response = await getEmployeeProfile(nickname);
            break;
          case "SHOP":
            response = await getShopProfile(nickname);
            break;
          default:
            throw new Error("Invalid profile type");
        }

        if (response.success) {
          setProfile(response.data);
          console.log("success", profile);
        } else {
          console.log("Failed to load profile");
          setError("Failed to load profile");
        }
      } catch (err) {
        setError("An error occurred while fetching the profile");
      }
    };

    fetchProfile();
  }, [nickname, type]);
  if (error) {
    console.log(error);
  }

  if (!profile) {
    console.log("Loading...");
  }

  useEffect(() => {
    fetch("/mockdata/loginuser.json")
      .then((res) => res.json())
      .then((data) => {
        setLoginUser(data.body);
      });
  }, []);

  useEffect(() => {
    fetch("/mockdata/reviewdata.json")
      .then((res) => res.json())
      .then((data) => {
        const matchedReview = data.body.filter(
          (review) => review.nickname === loginUser.nickname
        );
        const matchedScrap = data.body.filter(
          (scrap) =>
            scrap.isScraped === true && scrap.nickname !== loginUser.nickname
        );
        setReveiwData(matchedReview || data.body);
        setScrapData(matchedScrap || data.body);
      });
  }, [loginUser]);

  useEffect(() => {
    fetch("/mockdata/likeshop.json")
      .then((res) => res.json())
      .then((data) => {
        setLikeCard(data.body);
      });
  }, []);

  useEffect(() => {
    if (updatedUser) {
      setLoginUser(updatedUser);
    }
  }, [updatedUser]);

  useEffect(() => {
    if (updatedProfile) {
      setProfile(updatedProfile);
    }
  }, [updatedProfile]);

  const handleScroll = () => {
    if (tabRef.current) {
      const tabTop = tabRef.current.getBoundingClientRect().top;
      const newIsSticky = tabTop <= 0;
      setIsSticky(newIsSticky);
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);
    return () => {
      // 스크롤 이벤트 리스너 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 의존성 배열이 비어 있어 처음 마운트될 때만 실행됨

  // const tabTitle = [
  //   { name: "Post", content: "Post", count: profile.reviewCnt },
  //   { name: "Scrap", content: "Scrap", count: profile.scrapCnt },
  //   { name: "Likes", content: "Likes", count: profile.favoritesCnt },
  // ];
  const tabTitle = [
    { name: "Post", content: "Post", count: profile ? profile.reviewCnt : 0 },
    { name: "Scrap", content: "Scrap", count: profile ? profile.scrapCnt : 0 },
    {
      name: "Likes",
      content: "Likes",
      count: profile ? profile.favoritesCnt : 0,
    },
  ];

  const renderGrid = () => {
    const content = tabTitle[currentTab].content;

    if (content === "Post") {
      return (
        <ReviewGrid
          key={key}
          Card={reviewdata}
          currentUser={profile}
          loginUser={loginUser}
        />
      );
    } else if (content === "Scrap") {
      return (
        <ScrapGrid
          key={key}
          Card={scrapdata}
          currentUser={profile}
          loginUser={profile}
        />
      );
    } else if (content === "Likes") {
      return (
        <React.Fragment key={key}>
          {likeCard.map((item) => (
            <LikesCard key={item.id} Card={item} loginUser={profile} />
          ))}
        </React.Fragment>
      );
    }
  };

  const handleTabChange = (index) => {
    setCurrentTab(index);
    setKey((prevKey) => prevKey + 1); // 같은 탭을 클릭해도 리렌더링
  };

  return (
    <Wrapper>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        currentUser={profile}
        loginUser={profile}
      />
      <ProfileContainer>
        <IntroduceBox>
          <ProfileImage currentUser={profile} time={130} />
          <ProfileInfo currentUser={profile} loginUser={profile} />
          {/* ProfileInfo loginUser props... currentUser랑 loginUser랑 다른 사람일 경우 프로필 다르게 넘겨줘야 함 */}
        </IntroduceBox>
        <div ref={tabRef}>
          <StickyTabContainer isSticky={isSticky}>
            <TabComponent
              tabTitle={tabTitle}
              currentTab={currentTab}
              onTabChange={handleTabChange}
            />
          </StickyTabContainer>
        </div>
      </ProfileContainer>
      <GridContainer>{renderGrid()}</GridContainer>
    </Wrapper>
  );
};

export default ProfilePage;
