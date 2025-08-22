import { FC } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Actions, useStoreActions } from "easy-peasy";
import { AppStoreModel } from "../store";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const faUserIcon: IconProp = faUser;

const Header: FC = () => {
  const logout = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.user.logout
  );
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const nickname = localStorage.getItem("nickname");
  const roles = localStorage.getItem("roles");

  return (
    <Navbar collapseOnSelect expand="lg" className="wrapper-header mb-5">
      <Container className="grid wide">
        <Link to={"/"}>
          <img src="/logo.png" alt="Everyday Better logo" className="logo" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="mx-5 d-lg-flex">
          <Nav className="me-auto w-50 d-lg-flex justify-content-around">
            <NavLink to="/advice" className="nav-link text-hover-blue">
              {t("menu.advice")}
            </NavLink>
            <NavDropdown title={t("menu.learnMore")} id="nav-dropdown">
              <NavDropdown.Item>
                <NavLink to="/about" className="nav-link text-hover-blue">
                  {t("menu.about")}
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/contact" className="nav-link text-hover-blue">
                  {t("menu.contact")}
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/faq" className="nav-link text-hover-blue">
                  {t("menu.faq")}
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
            {nickname &&
              (!roles?.includes("ROLE_ADMIN") ? (
                <NavLink to="activities" className="nav-link text-hover-blue">
                  {t("menu.activities")}
                </NavLink>
              ) : (
                <NavLink to="admin" className="nav-link text-hover-blue">
                  {t("menu.admin")}
                </NavLink>
              ))}
          </Nav>
          {nickname ? (
            <NavDropdown
              title={
                <span>
                  <FontAwesomeIcon icon={faUserIcon} className="me-2" />
                  {nickname}
                </span>
              }
              id="nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/activities">
                {t("menu.account")}
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/"
                onClick={() => {
                  handleLogout();
                }}
              >
                {t("menu.logout")}
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav className="d-lg-flex justify-content-end">
              <Link to={"/users/authenticate"}>
                <Button
                  variant="light"
                  size="lg"
                  className="mx-lg-4 px-5 bg-btn"
                >
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
        <LanguageSwitcher />
      </Container>
    </Navbar>
  );
};

export default Header;
