import React from "react";

import { GlobalStyle } from "./global/GlobalStyle";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Signin from "./components/Signin";
import { UserProvider } from "./context/user";
import { PostProvider } from "./context/posts";
import { Container } from "./components/Main/styles";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <PostProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/signup"
              element={
                <Container>
                  <Signup />
                </Container>
              }
            />
            <Route
              path="/signin"
              element={
                <Container>
                  <Signin />
                </Container>
              }
            />
          </Routes>
        </PostProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
