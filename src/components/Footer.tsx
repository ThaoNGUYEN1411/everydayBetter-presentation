import { Col, Row } from "react-bootstrap";
//to do: add content necessary
const Footer = () => {
  return (
    <footer className="d-block my-5">
      <Row>
        <Col>Logo</Col>
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
    </footer>
  );
};

export default Footer;
