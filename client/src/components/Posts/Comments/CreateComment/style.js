import styled from "styled-components";
import color from "../../../../utils/styles/colors";

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding-top: 20px;
  border-top: 1px solid ${color.tertiary};

  img {
    max-width: 40px;
    max-height: 40px;
    border-radius: 50%;
  }

  input {
    width: 100%;
    margin-left: 20px;
    font-size: 16px;
    border: none;
    outline: none;
  }
`;
