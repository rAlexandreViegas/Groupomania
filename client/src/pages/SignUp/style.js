import styled from "styled-components";
import color from "../../utils/styles/colors";

export const Img = styled.img`
  display: block;
  width: 90%;
  max-width: 500px;
  margin: 150px auto;
`;
export const Message = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  max-width: 300px;
  margin: 0 auto 40px auto;
  padding: 10px;
  font-size: 20px;
  color: white;
  ${({ success }) => success && `background-color: ${color.succesColor} ;`};
  ${({ error }) => error && `background-color: ${color.primary} ;`};
`;
