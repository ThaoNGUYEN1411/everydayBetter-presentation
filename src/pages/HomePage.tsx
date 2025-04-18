import { FC } from "react";
import { Button, Card, CardGroup, Col, Row } from "react-bootstrap";
//import { useTranslation } from "react-i18next";

const HomePage: FC = () => {
  return (
    <div className="grid wide">
      <section className="banner">
        <Row>
          <Col md={4}>
            <div className="bloc1">
              <article className="text-banner">
                <h1 className="d-flex flex-column">
                  Everyday Better, l'appli qui booste vos habitudes.
                </h1>
                <p className="d-block w-lg-50 my-lg-5 w-sm-100">
                  Suivez vos progrès et devenez une meilleure version de
                  vous-même. Essayez-la gratuitement !
                </p>
                <div>
                  <Button variant="light" size="lg" className="px-5 bg-green">
                    Inscription
                  </Button>
                </div>
              </article>
            </div>
          </Col>{" "}
          <Col md={8}>
            <div className="bg-img">
              <img src="/bg.png" alt="" />
            </div>
          </Col>
        </Row>
      </section>

      <section className="feature-block" id="features">
        <div className="text-center">
          <h2 className="feature-title">Suivez tout ce que vous voulez</h2>
        </div>
        <div className="d-flex justify-content-center">
          <p className="w-75 feature-sub-title">
            Everyday better est totalement flexible. Vous pouvez suivre tout ce
            qui est important pour vous, et il est facile de le personnaliser en
            fonction de vos besoins.
          </p>
        </div>
        <Row>
          <Col className="d-flex justify-content-center text-center">
            <Card style={{ width: "23rem" }}>
              <Card.Img
                variant="top"
                src="/feature1.jpg"
                className="w-80 text-center"
              />
              <Card.Body>
                <Card.Title>Notifications de rappel</Card.Title>
                <Card.Text>
                  Des notifications rappellent aux utilisateurs d’accomplir
                  leurs activités régulières pour les aider à maintenir leurs
                  habitudes.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center text-center">
            <Card style={{ width: "23rem" }}>
              <Card.Img variant="top" src="/feature2.jpg" />
              <Card.Body>
                <Card.Title>Objectifs personnalisable</Card.Title>
                <Card.Text>
                  Les utilisateurs peuvent définir leurs propres activités et
                  suivre celles qui leur tiennent à cœur.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center text-center">
            <Card style={{ width: "23rem" }}>
              <Card.Img variant="top" src="/feature3.jpg" />
              <Card.Body>
                <Card.Title>Suivi des progrès</Card.Title>
                <Card.Text>
                  Un tableau de bord visuel permet aux utilisateurs de rester
                  motivés grâce à un retour clair sur leur progression.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default HomePage;
