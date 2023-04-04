import React from "react";

import { Container, NavBar } from "./styles";

import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
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
};

export default Header;
