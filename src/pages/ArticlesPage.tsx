import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, ListGroup } from "react-bootstrap";
import ArticleCard from "../components/ArticleCard";
import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { AppStoreModel } from "../store";
import { Link } from "react-router-dom";

export default function ArticlesPage() {
  const articleList = useStoreState((state: AppStoreModel) => {
    // typeof state;
    return state.article.articleList;
  });
  const getArticleList = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.article.getArticleList
  );
  const categoryList = useStoreState(
    (state: AppStoreModel) => state.referentialData.categoryList
  );
  const getAllCategoryList = useStoreActions(
    (actions: Actions<AppStoreModel>) =>
      actions.referentialData.getAllCategoryList
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    getArticleList(null);
    getAllCategoryList();
  }, []);

  const fetchArticles = async (categoryId: number | null) => {
    setLoading(true);
    await getArticleList(categoryId);
    setLoading(false);
  };

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    fetchArticles(categoryId);
  };

  return (
    <Container fluid className="pt-4 page grid wide page">
      <div>
        <h1>Conseils</h1>
        <p></p>
      </div>
      <Row className="pt-5">
        <Col md={3}>
          <h5>Catégories</h5>
          <ListGroup>
            <ListGroup.Item
              action
              active={selectedCategoryId === null}
              onClick={() => handleCategoryClick(null)}
            >
              All
            </ListGroup.Item>
            {categoryList?.map((cat: any) => (
              <ListGroup.Item
                key={cat.id}
                action
                active={selectedCategoryId === cat.id}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={9}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center height-article">
              <Spinner animation="border" />
            </div>
          ) : (
            <Row>
              {articleList.map((article, index) => (
                <Col md={6} lg={4} key={index} className="mb-4 pe-4 pb-4">
                  <Link
                    to={`/advices/${article.id}`}
                    className="text-decoration-none"
                  >
                    <ArticleCard {...article} />
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}
