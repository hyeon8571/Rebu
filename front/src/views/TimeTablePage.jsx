import styled, { css } from "styled-components";
import TimeTable from "../components/reservation/TimeTable";
import { useEffect, useState } from "react";
import { BASE_URL } from "../util/commonFunction";
import { Navigate, useParams } from "react-router-dom";
import ButtonSmall from "../components/common/ButtonSmall";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ButtonLabelAndInputStyles = css`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 12px;
  width: 80px;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#D2B9EA" : "#939393"};
  color: white;
  box-shadow: ${(props) =>
    props.theme.value === "light"
      ? "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
      : ""};
  @media (max-width: 768px) {
    font-size: 12px;
    width: 80px;
  }
`;

const ButtonBigContainer = styled.div`
  padding: 0.4rem;
  justify-self: start;
  width: 85px;
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

const ButtonLabel = styled.label`
  ${ButtonLabelAndInputStyles}
  cursor: pointer;
  z-index: 90;
  line-height: 1.8em;
  text-align: center;
  border: 1px solid #666666;
  padding: 0.2rem;
  border-radius: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;

const TimeTableWrapper = styled.div`
  overflow-x: hidden;
`;

export default function TimeTablePage() {
  const [designers, setDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const { nickname } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/profiles/shops/${nickname}/employees`, {
        headers: {
          "Content-Type": "application/json",
          access: `${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setDesigners(response.data.body);
        setSelectedDesigner(response.data.body[0].nickname);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <ButtonContainer>
        {nickname !== localStorage.getItem("nickname") &&
          localStorage.getItem("type") === "COMMON" && (
            <ButtonSmall
              button={{
                id: 1,
                title: "예약하기",
                onClick: () => {
                  navigate(`/reservation/${nickname}`);
                },
                highlight: "true",
              }}
            />
          )}
        {designers.map((item, index) => (
          <ButtonBigContainer key={index}>
            <ButtonInput
              id={`radio+${index}`}
              onClick={() => {
                setSelectedDesigner(item.nickname);
              }}
              name="radioGroup"
              defaultChecked={index === 0} // Ensure the first item is checked by default
            />
            <ButtonLabel htmlFor={`radio+${index}`}>
              {item.workingName} {item.role}
            </ButtonLabel>
          </ButtonBigContainer>
        ))}
      </ButtonContainer>
      <TimeTableWrapper>
        <TimeTable designer={selectedDesigner}></TimeTable>
      </TimeTableWrapper>
    </>
  );
}
