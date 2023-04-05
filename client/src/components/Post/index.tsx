import React, { useState } from "react";

import { Container, Title, Description, Profile, Content } from "./styles";

import { FaUserCircle } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

import Modal from "react-modal";

import { api } from "../../services";
import { Button, Input } from "../Signup/styles";

import { useUser } from "../../context/user";
import { usePost } from "../../context/posts";
import { IPost } from "../../context/types";

interface IProps {
  id: number;
  title: string;
  description: string;
  name: string;
  edit?: boolean;
}

Modal.setAppElement("#root");
const Post: React.FC<IProps> = ({
  id,
  title,
  description,
  name,
  edit,
}: IProps) => {
  const { user } = useUser();
  const { posts, setPosts } = usePost();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [titleEdit, setTitleEdit] = useState<string>(title);
  const [descriptionEdit, setDescriptionEdit] = useState<string>(description);

  const handleEditClick = async () => {
    if (!titleEdit || !descriptionEdit) {
      alert("Fill in all fields of your post");
      return;
    }

    try {
      await api.put(`posts/${user.id}/post/update/${id}`, {
        title: titleEdit,
        description: descriptionEdit,
      });
      const req = await api.get(`posts/${user.id}/posts`);
      const data: IPost[] = req.data;

      setPosts(data);
      setIsOpen(false);
      return;
    } catch (error: any) {
      alert(error.response.data);
      return;
    }
  };

  const handleDeleteClick = async () => {
    try {
      await api.delete(`posts/${user.id}/post/del/${id}`);
      const req = await api.get(`posts/${user.id}/posts`);
      const data: IPost[] = req.data;

      setPosts(data);
      setIsOpen(false);
      return;
    } catch (error: any) {
      alert(error.response.data);
      return;
    }
  };

  return (
    <Container>
      <Profile>
        <FaUserCircle />
        <span>{name}</span>
        {edit ? <SlOptions onClick={() => setIsOpen(true)} /> : ""}
      </Profile>
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
          <h1>Edit your post</h1>
          <Input
            type="text"
            placeholder="Edit title"
            value={titleEdit}
            onChange={(e) => setTitleEdit(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Edit description"
            value={descriptionEdit}
            onChange={(e) => setDescriptionEdit(e.target.value)}
          />
          <Button background="#FFD166" color="#fff" onClick={handleEditClick}>
            Update
          </Button>
          <Button background="#F64740" color="#fff" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Content>
      </Modal>
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
