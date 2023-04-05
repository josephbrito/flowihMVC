import React, { useState } from "react";

import { Button, Container, Input } from "./styles";
import { api } from "../../services";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/user";

const Signup: React.FC = () => {
  let navigate = useNavigate();

  const { user } = useUser();

  if (Object.keys(user).length) {
    navigate("/");
    return <p></p>;
  }

  const [name, setName] = useState<string>("");
  const [username, setUserame] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    if (!name || !username || !password) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      await api.post("register", { name, username, password });
      alert("Successful");
      navigate("/signin");
      return;
    } catch (error: any) {
      alert(error.response.data);
      return;
    }
  };
  return (
    <Container>
      <h1>Sign up</h1>
      <Input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUserame(e.target.value)}
      />
      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button background="#000" color="#fff" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default Signup;
