import { FC } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Actions, useStoreActions } from "easy-peasy";
import { AppStoreModel } from "../store";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header: FC = () => {
  const logout = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.user.logout
  );
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("nickname");
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.log("error logout");
    }
  };

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
            <NavLink to="/" className="nav-link">
              {t("menu.features")}
            </NavLink>
            <NavLink to="/" className="nav-link">
              {t("menu.blog")}
            </NavLink>
            <NavDropdown title={t("menu.learnMore")} id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1">
                {t("menu.about")}
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">
                {t("menu.testimonials")}
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3">
                {t("menu.contact")}
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="4.4">
                {t("menu.faq")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div>
            <LanguageSwitcher />
          </div>
          {localStorage.getItem("nickname") ? (
            <NavDropdown
              title={
                <span>
                  {/* <FontAwesomeIcon icon={faUser} /> {authInfo?.nickname} */}
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  {localStorage.getItem("nickname")}
                </span>
              }
              id="nav-dropdown"
            >
              <NavDropdown.Item eventKey="4.1">
                <NavLink to="/activities" className="nav-link">
                  {t("menu.account")}
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">
                <NavLink
                  to="/"
                  onClick={() => {
                    handleLogout();
                  }}
                  className="nav-link"
                >
                  {t("menu.logout")}
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav className="d-lg-flex justify-content-end">
              <Link to={"/users/authenticate"}>
                <Button variant="light" size="lg" className="mx-4 px-5 bg-btn">
                  {t("menu.login")}
                </Button>
              </Link>
              <Link to={"/users/create"}>
                <Button variant="light" size="lg" className="px-5 bg-green">
                  {t("menu.register")}
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
