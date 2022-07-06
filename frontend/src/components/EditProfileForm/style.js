import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
  margin: 100px auto 0 auto;
  font-size: 20px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }

  img {
    max-width: 200px;
    max-height: 200px;
    margin-bottom: 30px;
    background-color: white;
    border: 2px solid white;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    input {
      height: 30px;
      font-size: 15px;
    }

    span {
      margin-top: 5px;
      text-align: center;
      color: white;
      background-color: red;
    }
`;
