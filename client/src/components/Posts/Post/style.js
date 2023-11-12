import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;
export const Avatar = styled.img`
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
`;
export const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;

  p {
    margin: 10px 0;
  }
`;
export const NameAndDate = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Modified = styled.span`
  margin-right: 5px;
`;
export const UserName = styled.span`
  font-weight: bold;
`;
