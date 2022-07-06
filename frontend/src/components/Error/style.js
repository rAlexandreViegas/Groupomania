import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;

  img {
    width: 90%;
    max-width: 768px;
  }

  span {
    width: 90%;
    margin-top: 20px;
    color: red;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }
`;
