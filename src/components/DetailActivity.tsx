import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { getToken } from "../utils/Token";

interface DetailActivityModel {
  id: number;
  name: string;
  description: string;
  categoriesId: string;
}

const DetailActivity: FC<{ id?: string }> = ({ id }) => {
  const [activity, setActivity] = useState<DetailActivityModel>();
  const deleteOneActivity = async (id: string) => {
    const token = getToken();
    console.log("token here", { token });

    const response = await axios.delete(
      `http://localhost:8080/activities/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("delete one activity");
  };
  useEffect(() => {
    const getActivityById = async (id: string) => {
      const token = getToken();

      const response = await axios.get(
        `http://localhost:8080/activities/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      setActivity(response.data);
    };

    id && getActivityById(id);
  }, [id]);

  return (
    <div className="card-detail px-5">
      <Card className="p-4">
        <Card.Body>
          <Card.Title className="display-6 weight-300">
            Détail de l'activité
          </Card.Title>

          <h2 className="mb-2">{activity?.name}</h2>
          <Card.Text>{activity?.description}</Card.Text>
          <p>{activity?.categoriesId}</p>

          <div>
            <Card.Link href="#">
              {" "}
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="px-5"
                onClick={() => {
                  id && deleteOneActivity(id);
                }}
              >
                Delete
              </Button>
            </Card.Link>
            <Card.Link href="#">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="px-5"
              >
                Modifier
              </Button>
            </Card.Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default DetailActivity;
