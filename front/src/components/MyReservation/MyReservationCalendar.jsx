import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import ReservationCard from "./ReservationCard";

// 스타일 정의는 기존과 동일하게 유지합니다.
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
    background-color: ${(props) =>
      props.theme.value === "light" ? "#f0f0f0" : "#f0f0f0"};
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

  .react-calendar__month-view__days__day abbr {
    position: relative;
    bottom : 25%;
    right : 5%;
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

  .react-calendar__month-view__weekdays__weekday abbr {
    color: #fff;
  }
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: #ff3a3a;
  }
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: ${(props) =>
      props.theme.value === "light" ? "#3a3dff" : "#7b7dff"};
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #d3d3d3;
    font-weight: 300;
  }
  .react-calendar__month-view__days__day--neighboringMonth:disabled {
    background: #fff;
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
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: ${(props) =>
      props.theme.value === "light" ? "#ffffff" : "#d1d1d1"};
    vertical-align: top;
    text-align: left;
    font-weight: 600;
    height : 100%;

    @media (max-width: 768px) {
    }
  }

  .react-calendar__tile:disabled {
    background-color: ${(props) =>
      props.theme.value === "light" ? "#c2c2c2" : "#333333"};
    color: ${(props) =>
      props.theme.value === "light" ? "#f0f0f0" : "#838383"};
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

const NumInCalendar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
  width: 50%;
  height: 60%;
  bottom: 80%;
  left: 25%;
  border-radius: 1rem;
  text-align: center;
  vertical-align: middle;
  background-color: ${(props) => props.theme.secondary};
  line-height: 150%;
  font-weight: 600;

  @media (min-width: 769px) {
    height: 100%;
    line-height: 250%;
  }
`;

const EmptyDiv = styled.div`
  position: relative;
  bottom: 80%;
  width: 50%;
  height: 60%;
  left: 25%;
  padding: 0;
  margin: 0;
  line-height: 150%;
  color: white;

  @media (min-width: 769px) {
    line-height: 250%;
  }
`;

const InnerText = styled.div``;

const ReservationDetails = styled.div`
  margin-top: 1em;
`;

export default function MyReservationCalendar() {
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDateReservations, setSelectedDateReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const response = await fetch("/mockdata/reservationdata.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data && data.body) {
        setReservations(data.body);
      } else {
        console.error("Reservations data is missing or incorrect format.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const reservationCounts = reservations.reduce((acc, reservation) => {
    const dateStr = moment(reservation.startDateTime).format("YYYY-MM-DD");
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  // 선택된 날짜의 예약을 필터링하는 함수
  const handleDateChange = (newDate) => {
    setDate(newDate);
    const selectedDateStr = moment(newDate).format("YYYY-MM-DD");
    const reservationsForDate = reservations.filter(
      (reservation) =>
        moment(reservation.startDateTime).format("YYYY-MM-DD") === selectedDateStr
    );
    setSelectedDateReservations(reservationsForDate);
  };

  return (
    <CalendarWrapper>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <StyledCalendar
            onChange={handleDateChange}
            minDetail="month"
            formatDay={(locale, date) => moment(date).format("D")}
            calendarType="gregory"
            tileContent={({ date, view }) =>
              view === "month" ? (
                reservationCounts[moment(date).format("YYYY-MM-DD")] ? (
                  <NumInCalendar>
                    <InnerText>
                      {reservationCounts[moment(date).format("YYYY-MM-DD")]}
                    </InnerText>
                  </NumInCalendar>
                ) : (
                  <EmptyDiv>ㅤ</EmptyDiv>
                )
              ) : null
            }
            value={date}
          />
          <ReservationDetails>
            <h2>예약 상세 정보</h2>
            {selectedDateReservations.length > 0 ? (
                selectedDateReservations.map((rev) => (
                  <ReservationCard Card={{
                    img: rev.shop.imageSrc,
                    title: rev.shop.name,
                    menu: rev.menu.title,
                    designer: rev.employee.workingName+" "+rev.employee.role,
                    price: rev.menu.price,
                    reservationStatus : rev.reservationStatus
                  }}>
                    
                  </ReservationCard>
              ))
            ) : (
              <p>선택된 날짜에 예약이 없습니다.</p>
            )}
          </ReservationDetails>
        </>
      )}
    </CalendarWrapper>
  );
}
