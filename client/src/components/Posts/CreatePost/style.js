import styled from "styled-components";
import color from "../../../utils/styles/colors";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 700px;
  margin: 20px auto 0 auto;
  background: white;
  border: 1.5px solid ${color.tertiary};
  border-radius: 5px;

  textarea {
    width: 98%;
    height: 100px;
    margin: 1% auto 0 auto;
    font-size: 18px;
    font-family: "Lato", sans-serif;
    border: none;
    outline: none;
    resize: none;
  }

  div {
    display: flex;
    justify-content: flex-end;
    width: 98%;
    margin: 0 auto 1% auto;

    span {
      display: flex;
      align-items: center;
      margin-right: 5px;
    }

    label {
      cursor: pointer;
      margin-right: 10px;
      color: ${color.tertiary};
    }

    input {
      display: none;
    }
  }
`;
