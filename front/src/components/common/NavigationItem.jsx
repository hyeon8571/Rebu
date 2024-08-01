import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { Children } from "react";

const Wrapper = styled.div`
  @media (min-width: 769px) {
    padding: 0.8rem;
    background-color: ${(props) =>
      props.theme.value === "light" ? "none" : props.theme.body};
    border-radius: 0.8rem;
    box-shadow: ${(props) =>
      props.theme.value === "dark"
        ? "rgba(0, 0, 0, 0.1) 0px 10px 20px,rgba(0, 0, 0, 0.15) 0px 6px 6px"
        : ""};
  }
  padding: 0.5rem;
  border-radius: 1rem;
  &:hover {
    border-radius: 0.7rem;
    background-color: ${(props) => props.theme.secondary};
  }
`;

export default function NavigationItem({ onClick, children }) {
  return <Wrapper>{children}</Wrapper>;
}
