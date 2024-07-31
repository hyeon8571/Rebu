import Calendar from "react-calendar";
import styled from "styled-components";
import React, { useState, useEffect, useMemo } from "react";
import ReservationForm from "./ReservationForm";

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const StyledCalendar = styled(Calendar)`
  .react-calendar {
    width: 320px;
    max-width: 100%;
    background: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 24px;
    font-weight: 800;
    border: 0;
    margin-top: 8px;
  }

  .react-calendar__navigation button:disabled:first-of-type {
    visibility: hidden;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }

  .react-calendar__month-view__weekdays {
    display: flex;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
    box-shadow: ${(props) => props.theme.boxShadow};
  }

  .react-calendar__month-view__weekdays__weekday {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    background-color: ${(props) => props.theme.secondary};
    text-decoration: none;
  }
  .react-calendar__month-view__weekdays__weekday abbr[title] {
    text-decoration: none;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: #ff3a3a;
  }
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: #3a3dff;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    border: 0;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 1px 0px;
    background: none;
    text-align: center;
    line-height: 36px;

    @media (max-width: 768px) {
    }
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  }

  .react-calendar__tile--now {
    background: #646269;
    border-radius: 6px;
    font-weight: bold;
    color: #fff;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: ${(props) => props.theme.primary};
  }

  .react-calendar__tile--hasActive {
    background: ${(props) => props.theme.primary};
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }

  .react-calendar__tile--active {
    background: ${(props) => props.theme.primary};
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${(props) => props.theme.primary};
    color: white;
  }
`;

const SelectedWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const SelectedTitle = styled.span`
  padding-left: 1rem;
  @media (min-width: 769px) {
    font-size: 18px;
  }
  font-weight: 700;
`;
const SelectedTime = styled.span`
  @media (min-width: 769px) {
    font-size: 18px;
  }
  font-weight: 500;
  color: ${(props) => props.theme.primary};
`;
//예약 정보
const schedulerData = [
  {
    startDate: "2024-07-31T08:30",
    endDate: "2024-07-31T17:00",
    title: "여성 펌",
  },
  {
    startDate: "2024-08-01T13:00",
    endDate: "2024-08-01T20:00",
    title: "그라데이션 네일(행사)",
  },
  {
    startDate: "2024-08-02T13:00",
    endDate: "2024-08-02T14:00",
    title: "남성 헤어 커트",
  },
];

// 가게의 시간 설정 정보 (예시)

const weekday = ["일", "월", "화", "수", "목", "금", "토"];
export default function ReservationCalendar() {
  const [date, setDate] = useState(new Date());
  const [chosenTime, setChosenTime] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const moment = require("moment");

  function convertDate(input) {
    // 입력 문자열을 moment.js로 파싱합니다
    const date = moment(input, "YYYY. M. D");

    // 형식을 YYYY-MM-DD로 변환합니다
    return date.format("YYYY-MM-DD");
  }

  const chosenDay = convertDate(date);
  const startTime = "08:00";
  const endTime = "20:00";
  const serviceDuration = 30;
  const intervalMinutes = 5;

  const shopTimeInfo = {
    date: chosenDay,
    startTime: startTime,
    endTime: endTime,
    serviceDuration: serviceDuration,
    intervalMinutes: intervalMinutes,
    schedulerData: schedulerData,
  };

  return (
    <>
      <CalendarWrapper>
        <StyledCalendar
          onChange={setDate}
          minDate={new Date()}
          minDetail="month"
          next2Label={null}
          formatDay={(locale, date) => moment(date).format("D")}
          calendarType="gregory" // 일요일 부터 시작
          showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          tileDisabled={({ activeStartDate, date, view }) =>
            date.getDay() === 2
          } //타일 비활성화 함수
          tileContent={({ date, view }) =>
            view === "month" && date.getDay() === 0 ? "" : null
          } // 타일 내 컨텐츠
          onClickDay={(item) => {
            if (convertDate(item.toLocaleString()) !== chosenDay) {
              setChosenTime(null);
            }
          }}
          prev2Label={null}
          value={date}
        />
      </CalendarWrapper>

      <SelectedWrapper
        style={{ visibility: chosenTime ? "visible" : "hidden" }}
      >
        <SelectedTitle>선택 날짜 : </SelectedTitle>
        <SelectedTime>
          {chosenDay +
            " (" +
            weekday[date.getDay()] +
            ") " +
            (chosenTime ? chosenTime : "")}
        </SelectedTime>
      </SelectedWrapper>

      <ReservationForm
        timeInfo={shopTimeInfo}
        chosenTime={chosenTime}
        setChosenTime={setChosenTime}
      />
    </>
  );
}
