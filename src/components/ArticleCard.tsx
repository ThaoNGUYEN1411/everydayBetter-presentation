import { Card } from "react-bootstrap";
const VITE_API_URL = import.meta.env.VITE_API_URL;

type ArticleProps = {
  title: string;
  subTitle: string;
  introduction: string;
  thumbnailImage: string;
  publishedDate: string;
  authorName: string;
  categoryName: string;
};

const ArticleCard = ({
  title,
  subTitle,
  introduction,
  thumbnailImage,
  publishedDate,
  authorName,
  categoryName,
}: ArticleProps) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={`${VITE_API_URL}/articles-images/${thumbnailImage}`}
        // src={thumbnailImage}
        alt={title}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          {categoryName}
        </Card.Subtitle>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>{subTitle}</strong>
          <br />
          {introduction}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          {authorName} – {new Date(publishedDate).toLocaleDateString()}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default ArticleCard;
