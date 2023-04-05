import React, { useState } from "react";
import { Button, Container, Input } from "../Signup/styles";
import { useNavigate } from "react-router-dom";
import { api } from "../../services";
import { useUser } from "../../context/user";
import { IUser } from "../../context/types";

const Signin: React.FC = () => {
  let navigate = useNavigate();

  const { user, setUser } = useUser();

  if (Object.keys(user).length) {
    navigate("/");
    return <p></p>;
  }

  const [username, setUserame] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    if (!username || !password) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const req = await api.post("login", { username, password });
      const data: IUser = req.data;

      setUser(data);
      navigate("/");
      return;
    } catch (error: any) {
      alert(error.response.data);
      return;
    }
  };
  return (
    <Container>
      <h1>Sign in</h1>
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

export default Signin;
