import styled from "styled-components";
import { MdPlace } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { KAKAO_REST_API_KEY } from "../../util/ApiKeys";

const Location = styled.div`
  display: flex;
  color: ${(props) => (props.theme.value === "light" ? "#8e8e8e" : "#ffffff")};
  text-decoration: underline;
  align-items: center;
  cursor: pointer;
`;

const LocationIcon = styled(MdPlace)`
  display: flex;
  width: 20px;
  height: 20px;
`;

const MyPlace = styled.span`
  display: flex;
  font-size: 18px;
`;

export default function CurrentLocation({
  currentLocation,
  setCurrentLocation,
}) {
  const [errorMessage, setErrorMessage] = useState("위치 확인중...");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        mapApi(longitude, latitude);
      },
      (error) => {
        console.error("위치 권한 요청이 거부되었습니다: ", error.message);
        setErrorMessage("현재 위치를 확인 할 수 없습니다.");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);
  const mapApi = async (longitude, latitude) => {
    try {
      await axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${longitude}&y=${latitude}`,
          {
            headers: {
              Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
            },
          }
        )
        .then((response) => {
          const location = response.data.documents[0];
          setCurrentLocation({
            si: location.address.region_1depth_name,
            gu: location.address.region_2depth_name,
            dong: location.address.region_3depth_name,
            locationX: location.address.x,
            locationY: location.address.y,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Location>
      <LocationIcon />
      {currentLocation ? (
        <MyPlace>
          {currentLocation.si} {currentLocation.gu} {currentLocation.dong}
        </MyPlace>
      ) : (
        <MyPlace>{errorMessage}</MyPlace>
      )}
    </Location>
  );
}
