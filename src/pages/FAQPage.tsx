import { Accordion, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const FAQPage = () => {
  const { t } = useTranslation();

  const faqList = t("faq.questions", { returnObjects: true }) as {
    question: string;
    answer: string;
  }[];

  return (
    <Container className="py-5 grid wide page">
      <h2 className="mb-4">{t("faq.title")}</h2>
      <Accordion>
        {faqList.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{item.question}</Accordion.Header>
            <Accordion.Body defaultChecked>{item.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default FAQPage;
