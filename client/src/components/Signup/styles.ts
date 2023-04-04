import styled from "styled-components";

export const Container = styled.div`
  width: 30%;
  padding: 20px;
  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  background-color: #ffff;
`;

export const Input = styled.input`
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  color: #333;
  font-size: 1rem;

  &:focus {
    border: none;
    border-bottom: 1px solid #ccc;
  }
`;

export const Button = styled.button`
  width: 100%;
  background: #000;
  color: #fff;
  border: none;
  height: 50px;
  padding: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
`;
