import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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
  const [profile, setProfile] = useState([]); //profile 조회
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redux 상태에서 필요한 정보 가져오기
  const { nickname, type, isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (type === "COMMON" && isLogin) {
      const fetchProfile = async () => {
        const result = await getCommonProfile(nickname);
        console.log("프로필조회", result);
        if (result.success) {
          console.log("프로필조회성공", result);
          setProfile(result.data);
        } else {
          setError(result.error);
        }
      };
      fetchProfile();
    } else if (type === "EMPLOYEE" && isLogin) {
      const fetchProfile = async () => {
        const result = await getEmployeeProfile(nickname);
        console.log("직원 프로필조회", result);
        if (result.success) {
          console.log("프로필조회성공", result);
          setProfile(result.data);
        } else {
          setError(result.error);
        }
      };
      fetchProfile();
    } else if (type === "SHOP" && isLogin) {
      const fetchProfile = async () => {
        const result = await getShopProfile(nickname);
        console.log("매장 프로필조회", result);
        if (result.success) {
          console.log("프로필조회성공", result);
          setProfile(result.data);
        } else {
          setError(result.error);
        }
      };
      fetchProfile();
    }
  }, [type, isLogin, nickname]);

  useEffect(() => {
    fetch("/mockdata/loginuser.json")
      .then((res) => res.json())
      .then((data) => {
        setLoginUser(data.body);
      });
  }, []);

  useEffect(() => {
    fetch("/mockdata/followerlist.json")
      .then((res) => res.json())
      .then((data) => {
        setFollowerData(data.body);
      });
  }, []);

  useEffect(() => {
    fetch("/mockdata/followinglist.json")
      .then((res) => res.json())
      .then((data) => {
        setFollowingData(data.body);
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

  // useEffect(() => {
  //   fetch("/mockdata/personalprofile.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const matchedProfile = data.body.find(
  //         (profile) => profile.nickname === loginUser.nickname
  //       );
  //       setProfile(matchedProfile || data.body);
  //     });
  // }, [loginUser]);

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
          <ProfileImage
            currentUser={profile}
            time={130}
            followerdata={followerdata}
            followingdata={followingdata}
          />
          <ProfileInfo currentUser={profile} loginUser={profile} />
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
