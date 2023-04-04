import styled from "styled-components";

export const Container = styled.main`
  min-height: calc(100vh - 15vh);
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  .title {
    color: aliceblue;

    a {
      text-decoration: underline;
      color: #333;
    }
  }

  .addpost {
    text-align: center;

    > svg {
      font-size: 2rem;
      cursor: pointer;
    }
  }
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.3rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 5px;
`;
