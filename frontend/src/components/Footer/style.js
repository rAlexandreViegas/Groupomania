import styled from "styled-components";
import color from "../../utils/styles/colors";

export const FooterStyle = styled.footer`
  padding: 20px;
  border-top: 2px solid ${color.tertiary};
  background: white;

  img {
    display: block;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }
`;
