import React, { useEffect, useState } from "react";

import { Container, Content, GreetingBox, Input, PostsBox } from "./styles";
import { IPost } from "../../context/types";
import { api } from "../../services";
import Post from "../Post";

import { useUser } from "../../context/user";
import { usePost } from "../../context/posts";

import { MdAddCircle } from "react-icons/md";

import Modal from "react-modal";
import { Button } from "../Signup/styles";
import NotLogged from "../NotLogged";

Modal.setAppElement("#root");
const Main: React.FC = () => {
  const { posts, setPosts } = usePost();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleClick = async () => {
    if (!title || !description) {
      alert("Fill in all fields of your post");
      return;
    }

    try {
      const req = await api.post(`posts/${user.id}/post`, {
        title,
        description,
      });
      const data: IPost = req.data;
      setPosts([...posts, data]);
      setIsOpen(false);
      setTitle("");
      setDescription("");
    } catch (error: any) {
      alert(error.response.data);
      return;
    }
  };

  if (!Object.keys(user).length) {
    return <NotLogged />;
  }

  return (
    <Container>
      <GreetingBox>
        <h1>Welcome Back {user.name}</h1>
      </GreetingBox>
      {!posts.length ? (
        <div className="addpost">
          <h3>You don't have posts yet.</h3>
          <MdAddCircle onClick={() => setIsOpen(true)} />
        </div>
      ) : (
        <div>
          <div className="addpost">
            <MdAddCircle onClick={() => setIsOpen(true)} />
          </div>
          <PostsBox>
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                name={user.name}
                edit
              />
            ))}
          </PostsBox>
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
          <Button background="#000" color="#fff" onClick={handleClick}>
            SUBMIT
          </Button>
        </Content>
      </Modal>
    </Container>
  );
};

export default Main;
