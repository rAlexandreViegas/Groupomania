import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;

  div {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 300px;

    input {
      height: 30px;
      font-size: 15px;
    }

    p {
      color: white;
      font-size: 20px;
      text-align: center;
      background-color: red;
    }
  }
`;

export default Form;
