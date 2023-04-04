import React, { useState } from "react";

import { Container, Content, Input } from "./styles";
import { IChildren, IPost } from "../../context/types";
import { useUser } from "../../context/user";
import { api } from "../../services";
import { usePost } from "../../context/posts";
import Post from "../Post";
import { Link } from "react-router-dom";

import { MdAddCircle } from "react-icons/md";

import Modal from "react-modal";
import { Button } from "../Signup/styles";

Modal.setAppElement("#root");
const Main: React.FC<IChildren> = () => {
  const { user } = useUser();
  const { posts, setPosts } = usePost();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  if (!Object.keys(user).length) {
    return (
      <Container>
        <h1 className="title">
          Welcome! <Link to={"/signup"}>Create an account</Link> or
          <Link to={"/signIN"}> sign in</Link> for post your day to day
        </h1>
      </Container>
    );
  }

  const handleClick = async () => {
    if (!title || !description) {
      alert("Fill in all fields of your post");
      return;
    }

    try {
      const req = await api.post(`${user.id}/post`, { title, description });
      const data: IPost = req.data;
      setPosts([...posts, data]);
      setIsOpen(false);
    } catch (error: any) {
      alert(error.response.data);
      return;
    }
  };

  return (
    <Container>
      <h1>Hello {user.name}</h1>
      {!posts.length ? (
        <div className="addpost">
          <h3>You don't have posts yet.</h3>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              description={post.description}
            />
          ))}
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            background: "rgba(0, 0, 0, .3)",
          },
          content: {
            width: "500px",
            margin: "0 auto",
          },
        }}
      >
        <Content>
          <h1>Post</h1>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handleClick}>SUBMIT</Button>
        </Content>
      </Modal>
    </Container>
  );
};

export default Main;
