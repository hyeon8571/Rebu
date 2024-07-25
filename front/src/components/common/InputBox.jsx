import styled from "styled-components";

const Input = styled.input``;

export default function InputBox({ placeholder, value, setValue }) {
  function onChange(e) {
    setValue(e.target.value);
  }

  return <Input placeholder={placeholder} onChange={onChange}></Input>;
}
