import { FC } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
const Header: FC = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="wrapper-header">
      <Container>
        <Link to={"/"}>
          <img src="/logo.png" alt="Everyday Better" className="logo" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="mx-5 d-lg-flex">
          <Nav className="me-auto w-25 d-lg-flex justify-content-around">
            <NavLink to="/create" className="nav-link">
              Blog
            </NavLink>
            <NavLink to="/avis" className="nav-link">
              Avis
            </NavLink>
            <NavLink to="/" className="nav-link">
              Contact
            </NavLink>
          </Nav>
          <Nav className="d-lg-flex justify-content-end">
            <Button variant="light" size="lg" className="mx-5 px-5">
              Sign In
            </Button>
            <Button variant="primary" size="lg" className=" px-5">
              Sign up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
