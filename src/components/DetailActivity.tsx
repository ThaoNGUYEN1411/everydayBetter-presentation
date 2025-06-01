import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { FC, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AppStoreModel } from "../store";
import { faHandPointRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  id?: string;
}

const DetailActivity: FC<Props> = ({ id }) => {
  const currentActivityDetail = useStoreState(
    (state: any) => state.activity.currentActivityDetail
  );

  const { deleteActivity, removeActivityFromList, getCurrentActivityDetail } =
    useStoreActions((state: Actions<AppStoreModel>) => state.activity);

  const setIsModalOpen = useStoreActions(
    (action: Actions<AppStoreModel>) => action.ui.setIsModalOpen
  );
  const setModeModal = useStoreActions(
    (action: Actions<AppStoreModel>) => action.ui.setModeModal
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (id) {
      getCurrentActivityDetail(id);
    }
  }, [id]);

  const updateActivity = () => {
    setModeModal("update");
    setIsModalOpen(true);
  };

  const callDeleteActivity = async (id: any) => {
    try {
      await deleteActivity(id);
      // removeActivityFromList(id);
    } catch (error) {
      console.log("error delete activity");
    }
  };

  return (
    <Card className="p-4 card-detail mb-5">
      <Card.Body>
        <Card.Title className="display-6 fw-light mb-4">
          Détail de l'activité
        </Card.Title>

        {currentActivityDetail && (
          <div>
            <h2 className="mb-2">
              <FontAwesomeIcon icon={faStar} color="green" className="me-2" />
              {currentActivityDetail?.name}
            </h2>
            <Card.Text>
              <div className="mb-3">
                <FontAwesomeIcon
                  icon={faHandPointRight}
                  color="green"
                  className="me-2"
                />
                <strong>Description: </strong>
                {currentActivityDetail?.description}
              </div>
            </Card.Text>
            <div className="mb-2">
              <strong>Positive: </strong>
              {currentActivityDetail?.positive === true ? "true" : "false"}
            </div>
            <div className="mb-2">
              <strong>Category: </strong>
              {currentActivityDetail?.category.name}
            </div>
          </div>
        )}
        {!confirmDelete && (
          <div>
            <Card.Link href="#">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="px-5"
                onClick={() => setConfirmDelete(true)}
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
        )}
      </Card.Body>
      {confirmDelete && (
        <>
          <p className="text-danger mt-3">
            Voulez-vous vraiment supprimer l'activité{" "}
            <strong>{currentActivityDetail.name}</strong> et tous ses suivis ?
          </p>
          <Row>
            <Col>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="px-5"
                onClick={() => {
                  callDeleteActivity(id);
                }}
              >
                oui
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="px-5"
                onClick={() => setConfirmDelete(false)}
              >
                Non
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};
export default DetailActivity;
