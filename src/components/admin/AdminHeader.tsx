import { FC } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Actions, useStoreActions } from "easy-peasy";

import { useTranslation } from "react-i18next";
import { AppStoreModel } from "../../store";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const faUserIcon: IconProp = faUser;
const AdminHeader: FC = () => {
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

  return (
    <Navbar collapseOnSelect expand="lg" className="wrapper-header">
      <Container className="grid wide">
        <Link to={"/"}>
          <img src="/logo.png" alt="Everyday Better logo" className="logo" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="mx-5 d-lg-flex">
          <Nav className="me-auto w-50 d-lg-flex justify-content-around">
            <NavLink to="/admin/user" className="nav-link">
              {t("menu.admin.user")}
            </NavLink>
            <NavLink to="/admin/category" className="nav-link">
              {t("menu.admin.categories")}
            </NavLink>
            <NavLink to="/admin/articles" className="nav-link">
              {t("menu.admin.articles")}
            </NavLink>
            <NavLink to="/admin/user-contact" className="nav-link">
              {t("menu.admin.user-contact")}
            </NavLink>
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
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
