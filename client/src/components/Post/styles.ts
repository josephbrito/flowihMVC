import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

export const Profile = styled.div`
  min-height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  > svg {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Title = styled.div`
  width: 100%;
  background: #555;
  color: #fff;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-align: center;
`;

export const Description = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
  background: #222;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
