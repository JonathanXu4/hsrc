import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "./components/Home";
import SimpleLineChart from "./components/LineChart";

import "./App.css";

function App() {
  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">HSRC App</Navbar.Brand>{" "}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home2" to="/">
              Home
            </Nav.Link>
            <Nav.Link href="#home3" to="/visualization">
              Visualization
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default App;
