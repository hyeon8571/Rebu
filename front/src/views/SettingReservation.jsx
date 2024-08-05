import React, { useState } from "react";
import styled from "styled-components";
import CheckBox from "../components/SettingReservation/HolidayCheckBox";
import ButtonLarge from "../components/common/ButtonLarge";
import ModalPortal from "../util/ModalPortal";
import Lottie from "lottie-react";
import validationAlert from "../assets/images/validationAlert.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
  max-width: 420px;
  min-width: 240px;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const NumberInput = styled.input`
  border: 2px solid #000;
  border-radius: 3px;
  height: 25px;
  padding: 0 10px;
  box-sizing: border-box;
  width: 25vw;
  max-width: 100px;
  min-width: 70px;
  display: flex;
  &::placeholder {
    text-align: end;
  }
`;

const TimeInput = styled.input`
  width: 7rem;
  font-size: 12px;

  @media (max-width: 768px) {
    width: 4.5rem;
    font-size: 8px;
  }
  border-radius: 0.2rem;
`;

const CheckBoxTd = styled.td`
  width: 22%;
  height: 15%;
  vertical-align: bottom;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 1.5rem;
`;

const MinRevWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
`;

const StyledTd = styled.td`
  padding-top: 1rem;
`;

const StyledTr = styled.tr`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.div`
  color: #ff7777;
  font-weight: 550;
  margin-bottom: 1rem;
  white-space: pre-line; /* 추가된 스타일 */
`;

const ErrorMsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const StyledLottie = styled(Lottie)`
  width: 50px;
  height: 50px;
  padding-bottom: 0.2rem;
`;

const TitleText = styled.div`
  font-weight: 600;
`;

const days = [
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일",
];

export default function SettingReservation({ Settings }) {
  const [openingHours, setOpeningHours] = useState(
    days.map(() => ({ start: "", end: "", closed: false }))
  );
  const [revGap, setRevGap] = useState(Settings ? Settings.revGap : 30);
  const [wholeDayTime, setWholeDayTime] = useState({ start: "", end: "" });
  const [error, setError] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);

  const handleAllTimeChange = (field, value) => {
    const newOpeningHours = openingHours.map((hour) => ({
      ...hour,
      [field]: value,
    }));
    setWholeDayTime({ ...wholeDayTime, [field]: value });
    setOpeningHours(newOpeningHours);
  };

  const handleTimeChange = (index, field, value) => {
    const newOpeningHours = [...openingHours];
    newOpeningHours[index][field] = value;
    setOpeningHours(newOpeningHours);
  };

  const handleCheckboxChange = (index) => {
    const newOpeningHours = [...openingHours];
    newOpeningHours[index].closed = !newOpeningHours[index].closed;
    setOpeningHours(newOpeningHours);
  };

  const validate = () => {
    let errorMsg = [];
    openingHours.forEach((hour, index) => {
      if (
        (!hour.closed && hour.start && hour.end && hour.start >= hour.end) ||
        (!hour.closed && !hour.start) ||
        (!hour.closed && !hour.end)
      ) {
        if (errorMsg.length < 1)
          errorMsg.push(`영업시간이 올바르지 않습니다 \n`);
      }
    });

    if (isNaN(revGap) || revGap % 5 !== 0 || revGap < 5 || revGap > 60) {
      errorMsg.push("예약 시간 간격의 값이 올바르지 않습니다.");
    }

    return errorMsg;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    setAnimationKey(animationKey + 1);
    if (validationErrors.length > 0) {
      setError(validationErrors);
    } else {
      setError([]);

      const revSetting = {
        revGap: revGap,
        openingHours: openingHours,
      };

      console.log("영업 시간 및 휴무일 설정:", revSetting);

      /*
      fetch('/api/save-opening-hours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(openingHours),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      */
    }
  };

  return (
    <Container>
      <ModalPortal></ModalPortal>
      <InputWrapper>
        <table>
          <thead>
            <tr>
              <th>영업 시간</th>
              <th>휴무일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <StyledTd>
                <TitleText>전체 요일 설정</TitleText>
                <TimeInput
                  type="time"
                  value={wholeDayTime.start}
                  onChange={(e) => handleAllTimeChange("start", e.target.value)}
                />
                ~
                <TimeInput
                  type="time"
                  value={wholeDayTime.end}
                  onChange={(e) => handleAllTimeChange("end", e.target.value)}
                />
              </StyledTd>
            </tr>
            {days.map((day, index) => (
              <tr key={day}>
                <StyledTd>
                  <TitleText>{day}</TitleText>
                  <TimeInput
                    type="time"
                    value={openingHours[index].start}
                    onChange={(e) =>
                      handleTimeChange(index, "start", e.target.value)
                    }
                    disabled={openingHours[index].closed}
                  />
                  ~
                  <TimeInput
                    type="time"
                    value={openingHours[index].end}
                    onChange={(e) =>
                      handleTimeChange(index, "end", e.target.value)
                    }
                    disabled={openingHours[index].closed}
                  />
                </StyledTd>
                <CheckBoxTd>
                  <div></div>
                  <div></div>
                  <CheckBox
                    value={openingHours[index].closed}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </CheckBoxTd>
              </tr>
            ))}
            <td>
              <MinRevWrapper>
                <TitleText>예약 시간 간격</TitleText>
                <NumberInput
                  type="number"
                  value={revGap}
                  onChange={(e) => setRevGap(Number(e.target.value))}
                  placeholder="분"
                />
                <div style={{ fontSize: "12px", color: "gray" }}>
                  [5분 ~ 60분] (5분 간격)
                </div>
              </MinRevWrapper>
            </td>
          </tbody>
        </table>
      </InputWrapper>
      {error.length > 0 && (
        <ErrorMsgContainer>
          <StyledLottie
            key={animationKey}
            loop={false}
            animationData={validationAlert}
          ></StyledLottie>
          <ErrorText>{error.join("\n")}</ErrorText>
        </ErrorMsgContainer>
      )}
      <SubmitButtonWrapper>
        <ButtonLarge
          button={{
            title: "설정",
            onClick: handleSubmit,
            highlight: true,
          }}
        />
      </SubmitButtonWrapper>
    </Container>
  );
}
