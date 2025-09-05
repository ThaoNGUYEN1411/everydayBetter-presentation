import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useStoreActions, useStoreState } from "easy-peasy";
import { AppStoreModel } from "../store";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();

  const selectedArticle = useStoreState(
    (state: AppStoreModel) => state.article.selectedArticle
  );
  const getArticleById = useStoreActions(
    (actions: any) => actions.article.getArticleById
  );

  useEffect(() => {
    if (id) getArticleById(Number(id));
  }, [id]);

  if (!selectedArticle) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <h1>{selectedArticle.title}</h1>
          <h4 className="text-muted">{selectedArticle.subTitle}</h4>
          <p className="text-secondary">
            {new Date(selectedArticle.publishedDate).toLocaleDateString()} |{" "}
            {selectedArticle.authorName} | {selectedArticle.categoryName}
          </p>
          <img
            src={`${import.meta.env.VITE_API_URL}/images/${selectedArticle.image}`}
            alt={selectedArticle.title}
            className="img-fluid mb-4 rounded"
          />
          <p className="lead">{selectedArticle.introduction}</p>
          <div style={{ whiteSpace: "pre-line" }} className="mt-4">
            {selectedArticle.content}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
