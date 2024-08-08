import styled, { css } from "styled-components";
import { useEffect, useMemo, useState, useRef } from "react";
import ButtonSmall from "../common/ButtonSmall";
import ModalNoBackNoExit from "../common/ModalNoBackNoExit";
import CheckReservation from "./CheckReservation";
import ModalPortal from "../../util/ModalPortal";
import ConfirmReservation from "./ConfirmReservation";

const ButtonWrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
  align-items: center;
`;

const ButtonLabelAndInputStyles = css`
  display: block;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#D2B9EA" : "#939393"};
  color: white;
  box-shadow: ${(props) =>
    props.theme.value === "light"
      ? "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
      : ""};
`;

const ButtonInput = styled.input.attrs({ type: "radio" })`
  ${ButtonLabelAndInputStyles}
  opacity: 0.001;
  z-index: 100;

  background: ${(props) =>
    props.theme.value === "light"
      ? props.theme.primary
      : props.theme.secondary};
  color: #000;

  &:checked + label {
    background: ${(props) =>
      props.theme.value === "light" ? props.theme.primary : "#fff"};
    color: ${(props) => (props.theme.value === "light" ? "#fff" : "#000")};
  }
`;

const ButtonContainer = styled.div`
  padding: 0.5rem;
  justify-self: start;
  width: 60px;
`;

const ButtonBigContainer = styled.div`
  padding: 0.4rem;
  justify-self: start;
  width: 85px;
`;

const ButtonLabel = styled.label`
  ${ButtonLabelAndInputStyles}
  cursor: pointer;
  z-index: 90;
  line-height: 1.8em;
  text-align: center;
  border: 1px solid #666666;
  padding: 0.2rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  border-radius: 0.5rem;
`;
const Title = styled.div`
  width: calc(100% - 1rem);
  font-size: 20px;
  font-weight: 600;
  padding-left: 1rem;
  padding-top: 1rem;
`;

const RequestTextArea = styled.textarea`
  width: 80%;
  max-width: 500px;
  height: 240px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
  justify-self: center;
  border-radius: 0.3rem;
  resize: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 5vh;
  padding-bottom: 4rem;
`;

const DivideLine = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.primary};
  padding-top: 1rem;
`;

//date = 해당날짜, startTime = 매장 시작시각, endTime= 매장 종료시각, intervalMinutes = 예약 간격 최소시간, serviceDuration = 시술 소요시간, scheulerData = 기존 예약 시간들 (객체형태)
function generateTimeIntervals(
  date,
  startTime,
  endTime,
  intervalMinutes,
  serviceDuration,
  schedulerData
) {
  // 날짜와 시간을 함께 처리하기 위해 startTime과 endTime을 Date 객체로 변환
  let [startHour, startMinute] = startTime.split(":").map(Number);
  let [endHour, endMinute] = endTime.split(":").map(Number);

  let currentTime = new Date(`${date}T${startTime}`);
  let endTimeObj = new Date(`${date}T${endTime}`);

  // 시간을 저장할 배열
  let timeIntervals = [];
  let currentHourArray = [];

  // 예약 시간을 Date 객체로 변환
  const reservations = schedulerData.map((reservation) => ({
    start: new Date(reservation.startDate),
    end: new Date(reservation.endDate),
  }));

  // 시술 시간을 분 단위로 변환
  const serviceDurationMinutes = serviceDuration;

  // 간격 만큼 시간을 추가하여 배열에 저장
  while (currentTime <= endTimeObj) {
    const endServiceTime = new Date(
      currentTime.getTime() + serviceDurationMinutes * 60000
    );

    // 현재 시간이 예약된 시간 사이에 있는지 확인 (end 포함)
    const isReserved = reservations.some(
      (reservation) =>
        currentTime < reservation.end && endServiceTime > reservation.start
    );

    // 예약된 시간이 아니면 배열에 추가
    if (!isReserved && endServiceTime <= endTimeObj) {
      let hours = String(currentTime.getHours()).padStart(2, "0");
      let minutes = String(currentTime.getMinutes()).padStart(2, "0");
      let timeString = `${hours}:${minutes}`;

      // 현재 시간이 변경된 경우 (새로운 시간대) 새 배열에 추가
      if (
        currentHourArray.length === 0 ||
        currentHourArray[0].split(":")[0] === hours
      ) {
        currentHourArray.push(timeString);
      } else {
        timeIntervals.push(currentHourArray);
        currentHourArray = [timeString];
      }
    }

    // 간격만큼 시간 증가
    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }

  // 마지막 시간대 배열을 추가
  if (currentHourArray.length > 0) {
    timeIntervals.push(currentHourArray);
  }

  return timeIntervals;
}

function scrollDown() {
  window.scrollBy({
    top: 500, // 스크롤할 픽셀 수
    left: 0,
    behavior: "smooth", // 부드럽게 스크롤
  });
}

// timeInfo => 해당날짜, 가게시작시간, 가게종료시간, 선택한 시술 시간, 예약시간간격, 해당날짜 예약정보
function ReservationForm({ timeInfo, chosenTime, setChosenTime }) {
  const [chosenHour, setChosenHour] = useState(null);
  const [isHourChosen, setIsHourChosen] = useState(false);
  const [isTimeChosen, setIsTimeChosen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const RequestInput = useRef("");

  let idCount = 1;

  function handleIsHourChosen(item) {
    setIsTimeChosen(false);
    setChosenTime(null);
    setChosenHour(item);
    if (!isHourChosen) {
      setTimeout(() => {
        scrollDown();
      }, 100);
    }
  }

  function handleChosenTime(item) {
    setChosenTime(item);
    setIsTimeChosen(true);
    if (!isTimeChosen) {
      setTimeout(() => {
        scrollDown();
      }, 100);
    }
  }

  //useMemo 사용 (불필요 계산 방지)
  const intervals = useMemo(() => {
    const result = generateTimeIntervals(
      timeInfo.date,
      timeInfo.startTime,
      timeInfo.endTime,
      timeInfo.intervalMinutes,
      timeInfo.serviceDuration,
      timeInfo.schedulerData
    );
    return result;
  }, [
    timeInfo.date,
    timeInfo.startTime,
    timeInfo.endTime,
    timeInfo.intervalMinutes,
    timeInfo.serviceDuration,
    timeInfo.schedulerData,
  ]);

  useEffect(() => {
    setChosenHour(null);
    setChosenTime(null);
    setIsHourChosen(false);
    setIsTimeChosen(false);
  }, [timeInfo.date]);

  return (
    <>
      <ModalPortal>
        <ModalNoBackNoExit isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          {!isConfirmed ? (
            <CheckReservation
              setIsConfirmed={setIsConfirmed}
              setIsModalOpen={setIsModalOpen}
            ></CheckReservation>
          ) : (
            <ConfirmReservation
              setIsConfirmed={setIsConfirmed}
              setIsModalOpen={setIsModalOpen}
            ></ConfirmReservation>
          )}
        </ModalNoBackNoExit>
      </ModalPortal>
      <ButtonWrapper className="button">
        <Title>오전</Title>
        {intervals.map((item) => {
          if (item[0][0] + item[0][1] < 12) {
            return (
              <ButtonBigContainer key={timeInfo.date + idCount}>
                <ButtonInput
                  id={`radio+${idCount}`}
                  onClick={() => {
                    handleIsHourChosen(item);
                  }}
                  name="radioGroup"
                />
                <ButtonLabel htmlFor={`radio+${idCount++}`}>
                  {((item[0][0] + item[0][1]) % 12 === 0
                    ? "12"
                    : (item[0][0] + item[0][1]) % 12) + "시"}
                </ButtonLabel>
              </ButtonBigContainer>
            );
          }
        })}
      </ButtonWrapper>
      <ButtonWrapper className="button">
        <Title>오후</Title>
        {intervals.map((item) => {
          if (item[0][0] + item[0][1] >= 12) {
            return (
              <ButtonBigContainer key={timeInfo.date + idCount}>
                <ButtonInput
                  id={`radio+${idCount}`}
                  onClick={() => handleIsHourChosen(item)}
                  name="radioGroup"
                />
                <ButtonLabel htmlFor={`radio+${idCount++}`}>
                  {((item[0][0] + item[0][1]) % 12 === 0
                    ? "12"
                    : (item[0][0] + item[0][1]) % 12) + "시"}
                </ButtonLabel>
              </ButtonBigContainer>
            );
          }
        })}
      </ButtonWrapper>

      {chosenHour && <DivideLine></DivideLine>}
      <ButtonWrapper>
        {chosenHour && <Title>예약 가능 시간</Title>}
        {chosenHour &&
          chosenHour.map((item) => (
            <ButtonContainer key={item + idCount}>
              <ButtonInput
                id={`radios+${item}+${idCount}`}
                onClick={() => {
                  handleChosenTime(item);
                }}
                name="radioGroup2"
              />
              <ButtonLabel htmlFor={`radios+${item}+${idCount++}`}>
                {item}
              </ButtonLabel>
            </ButtonContainer>
          ))}
      </ButtonWrapper>
      {isTimeChosen && (
        <>
          <Title>요청사항</Title>
          <RequestTextArea
            placeholder="요청 사항을 입력하세요"
            onChange={(e) => {
              RequestInput.current = e.target.value;
            }}
          ></RequestTextArea>
          <SubmitButtonWrapper>
            <ButtonSmall
              button={{
                title: "예약하기",
                onClick: () => {
                  if (isTimeChosen) {
                    console.log(RequestInput);
                    setIsModalOpen(true);
                  } else {
                    window.alert("예약 시간을 선택해주세요");
                  }
                },
                highlight: true,
              }}
            />
          </SubmitButtonWrapper>
        </>
      )}
    </>
  );
}

export default ReservationForm;
