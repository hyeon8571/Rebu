import styled from "styled-components";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ButtonSmall from "../common/ButtonSmall";
import { FaRegStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import DesignerTab from "../reservation/DesignerTab";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 85%;
  max-width: 500px;
  background: ${(props) =>
    props.theme.value === "light"
      ? "linear-gradient(0deg,rgba(255, 255, 255, 1) 65%,rgba(243, 237, 250, 1) 100%)"
      : "linear-gradient(0deg, rgba(120,120,120,1) 0%, rgba(85,85,85,1) 100%)"};

  box-shadow: ${(props) =>
    props.theme.value === "light"
      ? "rgba(0, 0, 0, 0.15) 0px 6px 0px, rgba(0, 0, 0, 0.23) 0px 6px 6px;"
      : "none"};
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 0.7rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const IntroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const PhotoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1/2;
  width: 100%;
  margin: 10px 5px;
`;

const Photo = styled.img`
  width: 70px;
  height: 70px;
  /* max-width: 70px;
  max-height: 70px; */
  border-radius: 8rem;
  @media (max-width: 425px) {
    max-width: 60px;
    max-height: 60px;
  }
`;

const Content = styled.div`
  grid-column: 2/4;
  padding-top: 1rem;
  padding-right: 10px;
  margin-left: 10px;
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
  margin-bottom: 5px;
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const ShopName = styled.span``;

const IntroWrapper = styled.div`
  padding-top: 10px;
  color: ${(props) => (props.theme.value === "light" ? "#666666" : "#cfcfcf")};
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

const TabItem = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
`;

const TabName = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const Count = styled.span`
  font-size: 14px;
  color: ${(props) => (props.theme.value === "light" ? "#black" : "#white")};
  cursor: pointer;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  /* margin-bottom: 10px; */
  /* font-size: 1em; */
  color: #ffcc00;
  @media (max-width: 375px) {
    font-size: 14px;
  }
`;

const Ratingtext = styled.span`
  font-size: 15px;
  color: ${(props) => (props.theme.value === "light" ? "#777777" : "#ffffff")};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 0.5rem;
`;

export default function VisitedCard({ Card, loginUser, rating }) {
  const navigate = useNavigate();

  const handleShopNameClick = (nickname) => {
    navigate(`/profile/${nickname}/SHOP`);
  };

  const button = {
    onClick: () => {
      navigate(`/reservation/${Card.nickname}`);
    },
    title: "예약하기",
    highlight: true,
  };

  return (
    <Wrapper>
      <GridContainer>
        <PhotoSection>
          <Photo src={"https://www.rebu.kro.kr/data/" + Card.imageSrc} />
        </PhotoSection>
        <Content>
          <TitleWrapper>
            <TitleText onClick={() => handleShopNameClick(Card.nickname)}>
              {Card.name}
              <HiOutlineChevronRight></HiOutlineChevronRight>
            </TitleText>
            <Rating>
              <FaRegStar />
              &nbsp;
              <Ratingtext>{rating}</Ratingtext>
            </Rating>
          </TitleWrapper>
          <IntroWrapper>{Card.introduction}</IntroWrapper>
        </Content>
      </GridContainer>
      <IntroContainer>
        <TabItem>
          <Count>{Card.feedCnt}</Count>
          <TabName>Post</TabName>
        </TabItem>
        <TabItem>
          <Count>{Card.reviewCnt}</Count>
          <TabName>Reviews</TabName>
        </TabItem>
        <TabItem>
          <Count>{Card.reservationCnt}</Count>
          <TabName>Reservaion</TabName>
        </TabItem>

        <ButtonWrapper>
          <ButtonSmall button={button}></ButtonSmall>
        </ButtonWrapper>
      </IntroContainer>
    </Wrapper>
  );
}
