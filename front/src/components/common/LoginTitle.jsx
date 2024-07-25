import styled from "styled-components";

const Section = styled.section`
  display: flex;
  margin-bottom: 1rem;
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
