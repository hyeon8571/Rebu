import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import moment from "moment";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import "./TimeTable.css";
import "moment/locale/ko"; // 한글 로케일을 가져옵니다.
import Reservation from "../review/ReservationInfo";
import apiClient from "../../util/apiClient";
import { BASE_URL } from "../../util/commonFunction";
import { useParams } from "react-router-dom";
import axios from "axios";

moment.locale("kr"); // 한글 로케일 설정

const today = new Date();

// 연도 추출
const year = today.getFullYear();

// 월 추출 (월은 0부터 시작하므로 1을 더해줘야 함)
const month = String(today.getMonth() + 1).padStart(2, "0");

// 일 추출
const day = String(today.getDate()).padStart(2, "0");

const formatTimeScaleDate = (date) => moment(date, "A hh:mm").format("HH:mm");

const TimeScaleLabel = ({ style, formatDate, ...restProps }) => (
  <WeekView.TimeScaleLabel
    {...restProps}
    style={{ ...style, width: "100%" }}
    formatDate={formatTimeScaleDate}
  />
);

const TimeScaleLayout = ({ style, ...restProps }) => (
  <WeekView.TimeScaleLayout
    {...restProps}
    className="custom-time-table-cell"
    style={{
      ...style,
      width: "45px",
      minWidth: "45px",
    }}
  />
);

const currentDate = `${year}-${month}-${day}`;

function addEndDateTime(updatedData) {
  // 예약 배열을 가져옵니다.
  updatedData = updatedData.map((reservation) => {
    const { startDateTime, timeTaken } = reservation;

    // startDateTime을 Date 객체로 변환합니다.
    const startDate = new Date(startDateTime);

    // timeTaken(분)을 밀리초로 변환하여 startDate에 더합니다.
    const endDate = new Date(startDate.getTime() + timeTaken * 60000);

    // endDateTime을 ISO 문자열로 변환합니다.
    const endTime = endDate.toISOString();

    // 새 항목을 반환합니다.
    return {
      ...reservation,
      startDate: startDate,
      endDate: endTime,
    };
  });

  return updatedData;
}

// 예시 데이터
const jsonData = {
  reservation: [
    {
      startDateTime: "2024-08-11T15:30:00",
      timeTaken: 30,
    },
    {
      startDateTime: "2024-08-12T09:00:00",
      timeTaken: 60,
    },
    {
      startDateTime: "2024-08-15T13:00:00",
      timeTaken: 90,
    },
    {
      startDateTime: "2024-08-17T10:00:00",
      timeTaken: 120,
    },
  ],
};

const ShopStartTime = 8;
const ShopEndTime = 20;

export default function TimeTable({ designer }) {
  const [date, setDate] = useState(currentDate);
  const [reservationData, setReservationData] = useState([]);
  const [shopStartTime, setShopStartTime] = useState();
  const [shopEndTime, setShopEndTime] = useState();

  useEffect(() => {
    if (designer) {
      apiClient
        .get(`${BASE_URL}/api/profiles/employees/${designer}/period-schedule`, {
          params: {
            "start-date": "2023-08-01",
            "end-date": "2025-08-30",
          },
        })
        .then((response) => {
          console.log(response);
          setReservationData(addEndDateTime(response.data.body.reservations));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [designer]);

  return (
    <Paper>
      <Scheduler data={addEndDateTime(reservationData)} locale={"kr-KR"}>
        <ViewState currentDate={date} onCurrentDateChange={setDate} />
        <WeekView
          startDayHour={ShopStartTime}
          endDayHour={ShopEndTime}
          timeScaleLabelComponent={TimeScaleLabel}
          timeScaleLayoutComponent={TimeScaleLayout}
        />
        <Appointments />
        <Toolbar />
        <DateNavigator />
      </Scheduler>
    </Paper>
  );
}
