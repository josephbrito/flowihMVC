import React from "react";

import { Container, Title, Description } from "./styles";

interface IProps {
  title: string;
  description: string;
}

const Post: React.FC<IProps> = ({ title, description }: IProps) => {
  return (
    <Container>
      <Title>
        <h3>{title}</h3>
      </Title>
      <Description>
        <h3>{description}</h3>
      </Description>
    </Container>
  );
};

export default Post;
