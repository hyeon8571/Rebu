import React from "react";
import { useSelector } from "react-redux";

function Main() {
  // Redux 상태에서 필요한 정보 가져오기
  const { profile, nickname, type, isLogin } = useSelector(
    (state) => state.auth
  );

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
          {type === 1 ? "일반" : type === 2 ? "디자이너" : "매장"}
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
