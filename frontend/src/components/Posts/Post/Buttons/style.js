import styled from "styled-components";
import color from "../../../../utils/styles/colors";

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${({ container }) => container && `justify-content: flex-end;`}

  button {
    cursor: pointer;
    color: ${color.primary};
    font-size: 20px;
    border: none;
    background: none;
    transition: 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
`;
