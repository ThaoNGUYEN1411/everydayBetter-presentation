import { FC, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import ArticleCard from "../components/ArticleCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const ArticlesPage: FC = () => {
  const articles = [
    {
      title: "Adopter la méthode GTD sans stress",
      description: "Pour adopter la méthode GTD sans stress...",
      imageUrl: "/feature3.jpg",
      link: "/articles/gtd",
    },
    {
      title: "L’auto-réflexologie : un geste simple",
      description: "Bienvenue sur Habitudes Zen ! ...",
      imageUrl: "/feature3.jpg",
      link: "/articles/reflexologie",
    },
    {
      title: "Adopter la méthode GTD sans stress",
      description: "Pour adopter la méthode GTD sans stress...",
      imageUrl: "/feature3.jpg",
      link: "/articles/gtd",
    },
    {
      title: "L’auto-réflexologie : un geste simple",
      description: "Bienvenue sur Habitudes Zen ! ...",
      imageUrl: "/feature3.jpg",
      link: "/articles/reflexologie",
    },
  ];

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState([]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
  };
  return (
    <Container className="my-5">
      <h5>Rechercher</h5>

      {/* <Row className="text-center">
        <div className="search">
          <Form.Control
            type="text"
            placeholder="Rechercher un article..." //i18n
            value={searchValue}
            size="lg"
            spellCheck={false}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="mb-3 search-input"
          />
          {!!searchValue && (
            <button onClick={handleClear} className="clear">
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          <button className="search-btn">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </Row> */}
      <Row className="justify-content-center align-items-center">
        <Col xs="auto">
          <InputGroup
            className="rounded-pill bg-light border px-3"
            style={{ width: "360px", height: "42px" }}
          >
            <Form.Control
              type="text"
              placeholder="Rechercher un produit..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="border-0 bg-light rounded-pill"
              style={{ boxShadow: "none" }}
            />
            {!!searchValue && (
              <Button
                variant="link"
                size="sm"
                className="text-muted px-2"
                onClick={handleClear}
              >
                <FontAwesomeIcon icon={faCircleXmark} size="lg" />
              </Button>
            )}
            <Button variant="link" size="sm" className="text-muted px-2">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} className="order-md-1 order-2 mb-4">
          <div className="p-3 bg-light rounded">
            <h5>Catégories</h5>
            <ul className="list-unstyled">
              <li>Bien-être</li>
              <li>Gestion du temps</li>
              <li>Méditation</li>
              <li>Productivité</li>
            </ul>
          </div>
        </Col>
        <Col xs={12} md={8} className="order-md-1 order-2 mb-4">
          <div className="p-3 bg-light rounded">
            <Row xs={1} sm={2} md={2} lg={2}>
              {articles.map((article, index) => (
                <Col key={index}>
                  <ArticleCard {...article} />
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default ArticlesPage;
