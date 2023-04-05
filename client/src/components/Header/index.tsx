import React, { useState } from "react";

import { Container, NavBar, UserBox } from "./styles";

import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useUser } from "../../context/user";

import { FaUserCircle } from "react-icons/fa";

import Modal from "react-modal";
import { Button, Input } from "../Signup/styles";
import { Content } from "../Post/styles";
import { api } from "../../services";
import { IUser } from "../../context/types";

Modal.setAppElement("#root");
const Header: React.FC = () => {
  const { user, setUser } = useUser();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [newUsername, setNewUsername] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  if (!Object.keys(user).length) {
    return (
      <Container>
        <Link to={"/"}>
          <img src={Logo} alt="logo-flowih" />
        </Link>

        <NavBar>
          <ul>
            <li>
              <NavLink
                to={"/signup"}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Sign up
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/signin"}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Sign in
              </NavLink>
            </li>
          </ul>
        </NavBar>
      </Container>
    );
  }

  const handleEditClick = async () => {
    if (!newUsername || !newName || !currentPassword || !newPassword) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const req = await api.put(`update/${user.id}`, {
        username: newUsername,
        name: newName,
        password: currentPassword,
        new_password: newPassword,
      });
      const data: IUser = req.data;

      setUser(data);
      setIsOpen(false);
    } catch (error: any) {
      alert(error.response.data);
      return;
    }
  };

  const handleSignoutClick = () => {
    setUser({} as IUser);
    setIsOpen(false);
  };

  const handleDeleteClick = async () => {
    try {
      await api.delete(`del/${user.id}`);
      setUser({} as IUser);
      setIsOpen(false);
    } catch (error: any) {
      alert(error.response.data);
      return;
    }
  };

  return (
    <Container>
      <Link to={"/"}>
        <img src={Logo} alt="logo-flowih" />
      </Link>

      <UserBox onClick={() => setIsOpen(true)}>
        <FaUserCircle />
        <span>{user.name}</span>
      </UserBox>

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
          <h1>Settings Account</h1>

          <Input
            type="text"
            placeholder="new username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <Input
            type="text"
            placeholder="new name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button background="#FFD166" color="#fff" onClick={handleEditClick}>
            Update
          </Button>
          <Button background="#000" color="#fff" onClick={handleSignoutClick}>
            Sign out
          </Button>
          <Button background="#F64740" color="#fff" onClick={handleDeleteClick}>
            Delete Account
          </Button>
        </Content>
      </Modal>
    </Container>
  );
};

export default Header;
