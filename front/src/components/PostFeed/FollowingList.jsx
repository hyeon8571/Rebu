import React, { useEffect, useState } from "react";
import { fetchFollowingList } from "./api"; // fetchFollowingList 함수가 있는 파일 경로로 변경 필요

const FollowingList = ({ nickname }) => {
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 팔로잉 목록을 가져옵니다.
    const loadFollowingList = async () => {
      try {
        const data = await fetchFollowingList(nickname);
        setFollowingList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFollowingList();
  }, [nickname]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Following List</h1>
      <ul>
        {followingList.map((item, index) => (
          <li key={index}>
            <img
              src={item.imageSrc || "/logo.png"} // 이미지가 없을 경우 기본 이미지
              alt={item.nickname}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <p>
              <strong>Nickname:</strong> {item.nickname}
            </p>
            <p>
              <strong>Introduction:</strong> {item.introduction}
            </p>
            <p>
              <strong>Type:</strong> {item.type}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
