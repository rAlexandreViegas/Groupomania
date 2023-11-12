import styled from "styled-components";
import color from "../../../../utils/styles/colors";

export const Container = styled.div`
  display: flex;
  width: 90%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px 0 0 0;
  border-top: 1px solid ${color.tertiary};

  img {
    max-width: 40px;
    max-height: 40px;
    border-radius: 50%;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;

    div {
      width: auto;
      flex-direction: column;
      margin-left: 15px;

      span {
        font-weight: bold;
      }

      p {
        margin: 4px 0 15px 0;
      }
    }
  }
`;
