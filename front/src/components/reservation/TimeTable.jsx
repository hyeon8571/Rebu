import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState } from "react";
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

const schedulerData = [
  {
    startDate: "2024-07-30T10:55",
    endDate: "2024-07-30T14:00",
    title: "여성 펌",
  },
  {
    startDate: "2024-07-31T19:00",
    endDate: "2024-07-31T20:00",
    title: "그라데이션 네일(행사)",
  },
];

const ShopStartTime = 8;
const ShopEndTime = 20;

export default function TimeTable() {
  const [date, setDate] = useState(currentDate);
  return (
    <Paper>
      <Scheduler data={schedulerData} locale={"kr-KR"}>
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
