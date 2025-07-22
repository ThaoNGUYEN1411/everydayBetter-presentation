import { FC } from "react";
import { Card } from "react-bootstrap";

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ArticleCard: FC<ArticleCardProps> = ({
  title,
  description,
  imageUrl,
  link,
}) => {
  return (
    <Card>
      <Card.Img variant="top" src={imageUrl} alt={title} />
      <Card.Body>
        <Card.Title className="fs-5">{title}</Card.Title>
        <Card.Text className="text-muted small">{description}</Card.Text>
        <a href={link} className="text-success fw-bold small">
          ... LIRE LA SUITE
        </a>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
