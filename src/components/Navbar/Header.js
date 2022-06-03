import React, { useState, useEffect } from "react";
// import "./Header.css";
// import { CSSTransition } from "react-transition-group";
import { Nav, Navbar, Container } from "react-bootstrap";

// import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");

    handleMediaQueryChange(mediaQuery);

    return () => {};
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

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
          <Nav.Link as={Link} to={"/movie"}>
            Movie
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
