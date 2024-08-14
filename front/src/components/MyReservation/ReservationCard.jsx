import styled from "styled-components";
import CancelButton from "./CancelButton";
import { HiOutlineChevronRight } from "react-icons/hi";
import { BASE_IMG_URL } from "../../util/commonFunction";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr;
  height: 180px;
  width: 85%;
  max-width: 500px;
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
  border-radius: 0.7rem;
  @media (max-width: 768px) {
    width: 95%;
  }
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
    max-width: 90px;
    max-height: 90px;
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

const DesignerWrapper = styled.div`
  padding-top: 0.3rem;
  color: ${(props) => (props.theme.value === "light" ? "#ef4f91" : "#cfcfcf")};
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ServiceStatusText = styled.div`
  padding-left: 0.3rem;
  color: ${(props) => props.color};
  font-weight: 600;
`;

const PriceText = styled.div`
  padding-left: 0.3rem;
  color: ${(props) => props.theme.primary};
  font-weight: 600;
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

const ServiceStatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.2rem;
  font-size: 12px;
  color: ${(props) => (props.theme.value === "light" ? "#666666" : "#cfcfcf")};
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.2rem;
  font-size: 12px;
  color: ${(props) => (props.theme.value === "light" ? "#666666" : "#cfcfcf")};
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const ReservationTime = styled.div`
  font-size: 12px;
  padding-top: 0.2rem;
  color: ${(props) => (props.theme.value === "light" ? "#666666" : "#cfcfcf")};
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

export default function ShopCard({ Card, isModalOpen, setIsModalOpen }) {
  if (!Card) {
    console.log("카드 컴포넌트 불러오기 실패");
    return null;
  }

  let statusMessege = "";
  let statusColor = "";
  let isUnableCancle = false;

  switch (Card.status) {
    case "RECEIVED":
      statusMessege = "예약 확인중";
      statusColor = "#943AEE";
      break;
    case "DONE":
      statusMessege = "방문 완료";
      statusColor = "gray";
      isUnableCancle = true;
      break;
    case "ACCEPTED":
      statusMessege = "예약 확정";
      statusColor = "#943AEE";
      break;
    case "REFUSED":
      statusMessege = "예약 거절";
      statusColor = "gray";
      isUnableCancle = true;
      break;
    case "CANCLED":
      statusMessege = "예약 취소";
      statusColor = "#ff5656";
      isUnableCancle = true;
      break;
    case "NOSHOW":
      statusMessege = "방문하지않음";
      statusColor = "gray";
      isUnableCancle = true;
      break;
  }

  const date = new Date(Card.time);
  const year = date.getFullYear(); // 연도
  const month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)
  const day = date.getDate(); // 일
  const hours = date.getHours(); // 시
  const minutes = date.getMinutes(); // 분

  // 원하는 형식으로 변환
  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;

  return (
    <Wrapper>
      <GridContainer>
        <PhotoSection>
          <Photo src={BASE_IMG_URL + Card.img} />
        </PhotoSection>
        <Content>
          <TitleWrapper>
            <TitleText>
              {Card.title}
              <HiOutlineChevronRight></HiOutlineChevronRight>
            </TitleText>
          </TitleWrapper>
          <MenuWrapper>{Card.menu}</MenuWrapper>
          <DesignerWrapper>{Card.designer}</DesignerWrapper>
          <PriceWrapper>
            가격 : <PriceText> {Card.price.toLocaleString()}</PriceText>원
          </PriceWrapper>
          <ReservationTime>예약 시간 : {formattedDate}</ReservationTime>
          <ServiceStatusWrapper>
            예약 상태 :
            <ServiceStatusText color={statusColor}>
              {" "}
              {statusMessege}
            </ServiceStatusText>
          </ServiceStatusWrapper>
          <ButtonWrapper>
            <CancelButton
              button={{
                id: 1,
                title: "예약 취소",
                unable: isUnableCancle ? "true" : undefined,
                onClick: () => {
                  setIsModalOpen(true);
                },
              }}
            />
          </ButtonWrapper>
        </Content>
      </GridContainer>
    </Wrapper>
  );
}
