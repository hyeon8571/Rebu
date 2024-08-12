import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  getCommonProfile,
  getEmployeeProfile,
  getShopProfile,
} from "../features/common/userSlice";

const ProfileTestPage = () => {
  const { nickname, type } = useParams(); // URL 파라미터에서 nickname과 type을 추출
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

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
          console.log("success", response.data);
          setProfile(response.data);
        } else {
          setError("Failed to load profile");
        }
      } catch (err) {
        setError("An error occurred while fetching the profile");
      }
    };

    fetchProfile();
  }, [nickname, type]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profile.nickname}'s Profile</h1>
      <p>Type: {type}</p>
    </div>
  );
};

export default ProfileTestPage;
