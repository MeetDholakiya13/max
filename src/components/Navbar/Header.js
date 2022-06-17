import React, { useState, useEffect } from "react";
// import "./Header.css";
// import { CSSTransition } from "react-transition-group";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useAuthListener } from "../../hooks/index";

// import React from "react";
import { logout, auth } from "../../firebase";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

export default function Header() {
  const { user } = useAuthListener();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    logout(user);
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
    navigate("/");
  };
  if (!user) {
    return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to={"/register"}>
              Register
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to={"/movie"}>
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/movie"}>
              Movie
            </Nav.Link>
            <Nav.Link as={Link} to={"/data"}>
              Data
            </Nav.Link>
          </Nav>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            signOut
          </button>
        </Container>
      </Navbar>
    );
  }
}
