import { FC, useEffect } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { AppStoreModel } from "../store";

const Header: FC = () => {
  const authInfo = useStoreState((state: AppStoreModel) => state.user.authInfo);
  const logout = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.user.logout
  );

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
            {/* <p>{userData[0]?.nickname}</p> */}
            <NavLink to="/" className="nav-link">
              Fonctionnalités
            </NavLink>
            <NavLink to="/" className="nav-link">
              Blog
            </NavLink>
            <NavDropdown title="En savoir plus" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1">Témoignages</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Contact</NavDropdown.Item>
              {/* <NavDropdown.Item eventKey="4.3">FQA</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          {authInfo ? (
            <NavDropdown
              title={
                <span>
                  <FontAwesomeIcon icon={faUser} /> {authInfo?.nickname}
                </span>
              }
              id="nav-dropdown"
            >
              <NavDropdown.Item eventKey="4.1">
                <NavLink to="/activities" className="nav-link">
                  Compte
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">
                <NavLink
                  to="/"
                  onClick={() => {
                    //e.preventDefault(); // Empêche le rechargement immédiat
                    logout();
                  }}
                  className="nav-link"
                >
                  Logout
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav className="d-lg-flex justify-content-end">
              <Link to={"/users/authenticate"}>
                <Button variant="light" size="lg" className="mx-4 px-5 bg-btn">
                  Se connecter
                </Button>
              </Link>
              <Link to={"/users/create"}>
                <Button variant="light" size="lg" className="px-5 bg-green">
                  S'inscrire
                </Button>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
