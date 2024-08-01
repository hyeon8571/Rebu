import styled from "styled-components";
import ButtonSmall from "../common/ButtonSmall";

const ModalContent = styled.div`
  justify-content: start;
  align-self: start;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
const ModalDescription = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const PhotoContainer = styled.img`
  width: 80%;
  border-radius: 0.3rem;
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MenuTitleContainer = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;

const DurationContainer = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.text};
`;

const CostContainer = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.text};
`;
export default function MenuDetail(props) {
  return (
    <ModalContentWrapper>
      <PhotoContainer src={props.menu.img} />
      <ModalContent>
        <MenuTitleContainer>{props.menu.title}</MenuTitleContainer>
        <ModalDescription>{props.menu.description}</ModalDescription>
        <DurationContainer>소요시간 : {props.menu.duration}</DurationContainer>
        <CostContainer>가격 : {props.menu.cost}</CostContainer>
      </ModalContent>
      <ButtonSmall
        button={{
          id: 1,
          onClick: () => window.alert("예약하기"),
          highlight: true,
          title: "예약하기",
        }}
      />
    </ModalContentWrapper>
  );
}
