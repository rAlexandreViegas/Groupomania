import styled from "styled-components";
import color from "../../utils/styles/colors";

export const Nav = styled.nav`
  background-color: ${color.tertiary};

  @media (max-width: 680px) {
    padding: 5px 0;
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1440px;
  margin: auto;

  img {
    display: flex;
    max-width: 400px;

    @media (max-width: 680px) {
      width: 95%;
    }
  }

  div {
    display: flex;
    flex-direction: column;

    @media (max-width: 680px) {
      flex-direction: row;
    }
  }
`;
export const Button = styled.button`
  cursor: pointer;
  color: ${color.primary};
  background: none;
  border: none;

  &:hover {
    text-decoration: underline white;
  }

  span {
    margin-left: 5px;
    color: white;
    font-size: 20px;
    font-weight: 600;

    @media (max-width: 680px) {
      display: none;
    }
  }
`;
