import styled from "styled-components";

const Section = styled.section`
  display: flex;
  margin-bottom: 1rem;
  @media (max-width: 375px) {
    flex-direction: column; /* 320px 이하에서 세로 배치 */
    align-items: center; /* 중앙 정렬 */
  }
`;

const Img = styled.img`
  margin-right: 10px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  @media (max-width: 375px) {
    text-align: center; /* 중앙 정렬 */
  }
`;

const Description = styled.p`
  margin: 0;
  color: gray;
`;
const LoginTitle = ({ text, description }) => {
  return (
    <>
      <Section>
        <Img
          src={process.env.PUBLIC_URL + "/REBU_logo.png"}
          alt="logo"
          width="50px"
        />
        <Div>
          <Title>{text}</Title>
          {description && <Description>{description}</Description>}
        </Div>
      </Section>
    </>
  );
};

export default LoginTitle;
