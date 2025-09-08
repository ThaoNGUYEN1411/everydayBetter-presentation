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
      <div className="d-flex justify-content-center align-items-center height-article">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4 grid wide page">
      <Row className="mx-sm-2">
        <h1 className="text-center">{selectedArticle.title}</h1>
        <h4 className="text-muted">{selectedArticle.subTitle}</h4>
        <p className="text-secondary">
          {new Date(selectedArticle.publishedDate).toLocaleDateString()} |{" "}
          {selectedArticle.authorName} | {selectedArticle.categoryName}
        </p>
        <p>{selectedArticle.introduction}</p>
        <Row>
          <Col xs={8} className="mx-auto mt-4">
            <img
              src={`${import.meta.env.VITE_API_URL}/articles-images/${selectedArticle.image}`}
              alt={selectedArticle.title}
              className="img-fluid mb-4 rounded w-80"
            />
          </Col>
        </Row>

        <div className="mt-4 white-space">{selectedArticle.content}</div>
      </Row>
    </Container>
  );
}
