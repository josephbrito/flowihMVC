import styled from "styled-components";

export const Container = styled.main`
  min-height: calc(100vh - 15vh);
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: relative;

  .title {
    font-family: monospace;
    border-right: 4px solid;
    width: 23ch;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 2s steps(10), blinking 0.5s infinite step-end alternate;

    > .flowih {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1.7rem;
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }
  }

  @keyframes blinking {
    50% {
      border-color: transparent;
    }
  }

  .addpost {
    text-align: center;
    margin: 30px 0;
    > svg {
      font-size: 2rem;
      cursor: pointer;
      color: #fff;
    }
  }

  .posts_box {
    display: flex;
    gap: 2rem;
  }
`;

export const GreetingBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffff;
  padding: 10px;

  border-radius: 10px 0 10px 0;
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

export const PostsBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
