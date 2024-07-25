import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0.5rem;
  border-radius: 1rem;
`;

export default function NavigationItem({ onClick, children }) {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
}
