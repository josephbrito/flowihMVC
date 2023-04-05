import React, { useEffect, useState } from "react";
import { Container, PostsBox } from "../Main/styles";
import Post from "../Post";

import { usePost } from "../../context/posts";
import { api } from "../../services";
import { IPost } from "../../context/types";

const NotLogged: React.FC = () => {
  const { posts, setPosts } = usePost();

  useEffect(() => {
    const fetchData = async () => {
      const req = await api.get("posts/all");
      const data: IPost[] = req.data;

      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="title">
        Posts from <span className="flowih">Flowih</span> users
      </h1>
      <PostsBox>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            name={post.name}
          />
        ))}
      </PostsBox>
    </Container>
  );
};

export default NotLogged;
