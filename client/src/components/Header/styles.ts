import styled from "styled-components";

export const Container = styled.header`
  height: 15vh;
  background: #000;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a > img {
    width: 130px;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const NavBar = styled.nav`
  display: flex;
  align-items: center;

  > ul {
    display: flex;
    gap: 1rem;
    color: #ffff;
    list-style: none;

    > li {
      .active {
        opacity: 0.7;
        cursor: pointer;
      }

      &:hover {
        opacity: 0.7;
        border-bottom: 1px solid #ffff;
      }
    }
  }
`;
