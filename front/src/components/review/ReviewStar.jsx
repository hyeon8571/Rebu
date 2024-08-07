import ReactStars from "react-rating-stars-component";
import styled from "styled-components";

const RateContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  align-items: center;
  margin-left: 1rem;
  margin-bottom: 2rem;
  width: 70%;
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#F7F8FA" : "#B7B7B7"};
`;

const RateTextContainer = styled.div`
  display: flex;
  padding-top: 0.5rem;
  margin-left: 0.5rem;
`;

const RateTextWrapper = styled.div`
  margin-right: 0.3rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  border-radius: 0.3rem;
  vertical-align: middle;
  border: 2px solid
    ${(props) => (props.theme.value === "light" ? "gray" : "lightgray")};
`;

export default function ReviewStar({ rate, handleRate }) {
  return (
    <RateContainer>
      <ReactStars
        count={5}
        size={24}
        isHalf={true}
        value={rate}
        onChange={handleRate}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#943AEE"
      />
      <RateTextContainer>
        <RateTextWrapper>{rate === 0 ? "? " : rate}</RateTextWrapper> / 5
      </RateTextContainer>
    </RateContainer>
  );
}
