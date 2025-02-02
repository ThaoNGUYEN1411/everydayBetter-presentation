import { FC } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
const Header: FC = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="wrapper-header">
      <Container className="grid wide">
        <Link to={"/"}>
          <img
            src="/logo4-removebg.png"
            alt="Everyday Better"
            className="logo"
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="mx-5 d-lg-flex">
          <Nav className="me-auto w-50 d-lg-flex justify-content-around">
            <NavLink to="/activities/create" className="nav-link">
              Fonctionnalités
            </NavLink>
            <NavLink to="/activities" className="nav-link">
              Blog
            </NavLink>
            <NavDropdown title="En savoir plus" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1">Témoignages</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Contact</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3">FQA</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="d-lg-flex justify-content-end">
            <Link to={"/users/authenticate"}>
              <Button variant="light" size="lg" className="mx-4 px-5 bg-btn">
                Sign In
              </Button>
            </Link>
            <Link to={"/users/create"}>
              <Button variant="light" size="lg" className="px-5 bg-logo-color">
                Sign up
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
