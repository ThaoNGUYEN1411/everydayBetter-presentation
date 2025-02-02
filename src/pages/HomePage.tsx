import { FC } from "react";
import { Button, Col, Row } from "react-bootstrap";
//import { useTranslation } from "react-i18next";

const HomePage: FC = () => {
  return (
    <div className="grid wide">
      {/* <section className="bg-banner position-relative">
        <article className="w-50 d-flex flex-column ms-5 ps-lg-5 text-banner">
          <h1 className="d-flex flex-column">
            <span>Changing habits is hard work.</span>
            <span>Having the right tool is half the battle !</span>
          </h1>
          <p className="d-block w-lg-50 my-lg-5 w-sm-100">
            <span>
              The Way of Life app is that tool - a beautiful, intuitive habit
              tracker that motivates you to build a better, stronger and
              healthier you! Try the app for free!
            </span>
          </p>
          <div>
            <Button>Inscription</Button>
          </div>
        </article>
      </section> */}
      <section className="banner">
        <Row>
          <Col md={4}>
            <div className="bloc1">
              <article className="text-banner">
                <h1 className="d-flex flex-column">
                  Everryday Better, l'appli qui booste vos habitudes.
                </h1>
                <p className="d-block w-lg-50 my-lg-5 w-sm-100">
                  Suivez vos progrès et devenez une meilleure version de
                  vous-même. Essayez-la gratuitement !
                </p>
                <div>
                  <Button
                    variant="light"
                    size="lg"
                    className="px-5 bg-logo-color"
                  >
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
      {/* fonction */}
      <section className="my-5">
        <Row>
          <div className="text-center">
            <h2>Track anything you want</h2>
            <p className="w-75">
              Strides is totally flexible. With four unique tracker types, you
              can track anything that matters to you, and it’s easy to customize
              to fit your needs.
            </p>
          </div>
          <Col>
            <article>
              <img className="img-func" src="/func-1.png" alt="" />
              <h3>HABIT</h3>
              <p>
                Good or Bad Habits. Swipe to Log Yes/No. Flexible Reminders.
              </p>
            </article>
          </Col>
          <Col>
            <article>
              <img className="img-func" src="/func-2.png" alt="" />
              <h3>AVERAGE</h3>
              <p>
                By Any Time Period. Or Rolling Average. Current or Overall.{" "}
              </p>
            </article>
          </Col>
          <Col>
            <article>
              <img className="img-func" src="/func-3.png" alt="" />
              <h3>TARGET</h3>
              <p>Goal Value by Date. Enter Any Number. Helpful Pace Line. </p>
            </article>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default HomePage;
