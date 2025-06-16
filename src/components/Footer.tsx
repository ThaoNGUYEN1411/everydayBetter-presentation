import { Col, Container, Row } from "react-bootstrap";
//to do: add content necessary
const Footer = () => {
  return (
    <footer className="d-block mt-5 pt-4">
      <Container>
        <Row>
          <Col>
            <img
              src="/logo4-removebg.png"
              alt="Everyday Better"
              className="logo"
            />
          </Col>
          <Col>Qui sommes nous?</Col>
          <Col>
            <h3>Social</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </Col>
          <Col>Contact</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
