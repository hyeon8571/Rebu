import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { alarmsAgreement } from "../features/auth/authSlice";

function Main() {
  const dispatch = useDispatch();

  // Redux 상태에서 필요한 정보 가져오기
  const { profile, nickname, type, isLogin } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // 컴포넌트가 마운트될 때 alarmsAgreement 액션을 디스패치합니다.
    const fetchAlarmsAgreement = async () => {
      const alarmsResult = await dispatch(alarmsAgreement());
      if (!alarmsResult.success) {
        // 알람 동의 실패 시 처리할 내용 (선택 사항)
        console.error("Failed to agree to alarms:", alarmsResult.error);
      }
    };

    fetchAlarmsAgreement();
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Main Page</h1>
      <div style={{ marginTop: "20px" }}>
        <h2>Profile Information</h2>
        <p>
          <strong>Nickname:</strong> {nickname || "notExist"}
        </p>
        <p>
          <strong>Type:</strong>{" "}
          {type === "COMMON" ? "일반" : type === "SHOP" ? "매장" : "디자이너"}
        </p>
        <p>
          <strong>Is Logged In:</strong> {isLogin ? "Yes" : "No"}
        </p>
        <h3>Profile Details</h3>
        <p>
          <strong>nickname:</strong> {profile.nickname}
        </p>
        <p>
          <strong>Favorites Count:</strong> {profile.favoritesCnt}
        </p>
        <p>
          <strong>Followers Count:</strong> {profile.followersCnt}
        </p>
        <p>
          <strong>Following Count:</strong> {profile.followingCnt}
        </p>
        <p>
          <strong>Introduction:</strong> {profile.introduction || "N/A"}
        </p>
        <p>
          <strong>Relation:</strong> {profile.relation}
        </p>
        <p>
          <strong>Review Count:</strong> {profile.reviewCnt}
        </p>
        <p>
          <strong>Scrap Count:</strong> {profile.scrapCnt}
        </p>
        {profile.imageSrc && (
          <img
            src={profile.imageSrc}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        )}
      </div>
    </div>
  );
}

export default Main;
