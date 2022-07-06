import styled from "styled-components";
import color from "../../../../utils/styles/colors";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 95%;

  button {
    cursor: pointer;
    height: 0;
    color: ${color.primary};
    font-size: 16px;
    border: none;
    background: none;
    position: relative;
    bottom: 30px;
    transition: 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
`;
