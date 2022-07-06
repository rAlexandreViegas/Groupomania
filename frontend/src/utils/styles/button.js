import styled from "styled-components";
import color from "./colors";

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 20px;
  color: white;
  background-color: ${color.primary};
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  ${({ greyButton }) => greyButton && `background-color: ${color.tertiary};`}
  ${({ smallButton }) =>
    smallButton &&
    `width: auto; 
    margin: 0;
    font-size: 12px; 
    font-weight: bold;`}
`;

export default Button;
