import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostReview1 from "../components/review/PostReview1";
import PostReview2 from "../components/review/PostReview2";
import ButtonLarge from "../components/common/ButtonLarge";

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: end;
  width: 95%;
`;

export default function PostReview() {
  const [review, setReview] = useState(null);

  const location = useLocation();
  const { info } = location.state;
  const navigate = useNavigate();

  return (
    <>
      <PostReview1 info={info} review={review} setReview={setReview} />
      <PostReview2 setReview={setReview} />
      <ButtonWrapper>
        <ButtonLarge
          button={{
            id: 1,
            title: "작성",
            onClick: () => {},
            highlight: true,
          }}
        />
      </ButtonWrapper>
    </>
  );
}
