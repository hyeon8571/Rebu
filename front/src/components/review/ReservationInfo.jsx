import styled from "styled-components";
import ButtonSmall from "../common/ButtonSmall";
import { HiOutlineChevronRight } from "react-icons/hi";
import ButtonDisabled from "../common/ButtonDisabled";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  height: 175px;
  width: calc(100% - 4rem);
  background: ${(props) =>
    props.theme.value === "light"
      ? "linear-gradient(0deg,rgba(255, 255, 255, 1) 65%,rgba(243, 237, 250, 1) 100%)"
      : "linear-gradient(0deg, rgba(154,154,154,1) 0%, rgba(120,120,120,1) 100%)"};

  box-shadow: ${(props) =>
    props.theme.value === "light"
      ? "rgba(0, 0, 0, 0.15) 0px 6px 0px, rgba(0, 0, 0, 0.23) 0px 6px 6px;"
      : "none"};
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 0.7rem;
`;

const PhotoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1/2;
  width: 100%;
`;

const Photo = styled.img`
  width: 150px;
  height: 150px;
  max-width: 120px;
  max-height: 120px;

  @media (max-width: 768px) {
    max-width: 100px;
    max-height: 100px;
  }

  border-radius: 8rem;
`;

const Content = styled.div`
  grid-column: 2/4;
  padding-top: 1rem;
  padding-right: 1rem;
`;

const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  justify-content: space-between;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: ${(props) =>
    props.theme.value === "light" ? "1px solid black" : "1px solid #a3a3a3"};
  padding-bottom: 0.2rem;

  &:hover {
    color: ${(props) =>
      props.theme.value === "light" ? "lightgrey" : "#c1c1c1"};
  }
`;

const TitleText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const DateWrapper = styled.div`
  padding-top: 0.2rem;
  font-size: 12px;
  color: ${(props) => (props.theme.value === "light" ? "#666666" : "#cfcfcf")};
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const MenuWrapper = styled.div`
  padding-top: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => (props.theme.value === "light" ? "#943AEE" : "#e9d7fb")};
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.3rem;
  font-size: 14px;
  color: ${(props) => (props.theme.value === "light" ? "#666666" : "#cfcfcf")};
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
`;

export default function Reservation({ info, button }) {
  return (
    <GridContainer>
      <PhotoSection>
        <Photo src={info.img} />
      </PhotoSection>
      <Content>
        <TitleWrapper>
          <TitleText>
            {info.title}
            <HiOutlineChevronRight></HiOutlineChevronRight>
          </TitleText>
        </TitleWrapper>
        <div>{info.designer}</div>
        <MenuWrapper>{info.menu}</MenuWrapper>
        <PriceWrapper>{info.price.toLocaleString()}원</PriceWrapper>
        <DateWrapper>{info.date}</DateWrapper>
      </Content>
    </GridContainer>
  );
}
