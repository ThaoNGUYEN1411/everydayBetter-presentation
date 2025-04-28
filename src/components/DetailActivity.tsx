import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { FC, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { AppStoreModel } from "../store";
import { faHandPointRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  id?: string;
  show: boolean;
  // isUpdate: boolean;
}
const DetailActivity: FC<Props> = ({ id, show }) => {
  const currentActivityDetail = useStoreState(
    (state: any) => state.activity.currentActivityDetail
  );
  const { deleteActivity, removeActivityFromList, getCurrentActivityDetail } =
    useStoreActions((state: Actions<AppStoreModel>) => state.activity);

  useEffect(() => {
    const getActivityById = async (id: string) => {
      getCurrentActivityDetail(id);
    };
    console.log(currentActivityDetail);

    id && getActivityById(id);
  }, [id]);

  const updateActivity = () => {
    show = true;
    console.log(id);
  };
  return (
    <div className="card-detail px-5">
      <Card className="p-4">
        <Card.Body>
          <Card.Title className="display-6 weight-300">
            Détail de l'activité
          </Card.Title>
          {currentActivityDetail && (
            <div>
              <h2 className="mb-2">
                <FontAwesomeIcon icon={faStar} color="green" className="me-2" />
                {currentActivityDetail?.name}
              </h2>
              <Card.Text>
                <p>
                  <FontAwesomeIcon
                    icon={faHandPointRight}
                    color="green"
                    className="me-2"
                  />
                  {currentActivityDetail?.description}
                </p>
              </Card.Text>
              <p>
                <span>Positive: </span>
                {currentActivityDetail?.positive === true ? "true" : "false"}
              </p>
              <p>
                <span>Category: </span>
                {currentActivityDetail?.category.name}
              </p>
            </div>
          )}
          <div>
            <Card.Link href="#">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="px-5"
                onClick={() => {
                  id && deleteActivity(id) && removeActivityFromList(id);
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
                onClick={() => updateActivity()}
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
