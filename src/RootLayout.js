import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const RootLayout = () => {
  return (
    <React.Fragment>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand
              target="_blank"
              href="https://www.w3schools.com/html/html_links.asp"
            >
              Starrail DPS Calculator
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/help">
                  Help
                </Nav.Link>
                <Nav.Link as={Link} to="/rates">
                  Relic Rates
                </Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/test">
                    Test
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/test">
                    Test again
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default RootLayout;
