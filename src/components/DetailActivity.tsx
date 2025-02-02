import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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

      setActivity(response.data);
    };

    id && getActivityById(id);
  }, [id]);

  return (
    <div className="mx-3 my-3">
      <div className="d-flex justify-content-between">
        <h2>Détail de l'activité</h2>
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
      </div>
      <p>{id}</p>
      <p>{activity?.name}</p>
      <p>{activity?.description}</p>
      <p>{activity?.categoriesId}</p>
      <div className="text-center">
        <Button variant="primary" type="submit" size="lg" className="px-5 mt-5">
          Modifier
        </Button>
      </div>
    </div>
  );
};
export default DetailActivity;
