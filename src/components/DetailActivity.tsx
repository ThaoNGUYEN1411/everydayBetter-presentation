import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { FC, useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { AppStoreModel } from "../store";
import {
  faHandPointRight,
  faStar,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";

interface Props {
  id?: string;
}

const faStarIcon: IconProp = faStar;
const faHandPointRightIcon: IconProp = faHandPointRight;
const faTrashIcon: IconProp = faTrash;
const faPenIcon: IconProp = faPen;

const DetailActivity: FC<Props> = ({ id }) => {
  const { t } = useTranslation();

  const currentActivityDetail = useStoreState(
    (state: any) => state.activity.currentActivityDetail
  );

  const { deleteActivity, getCurrentActivityDetail } = useStoreActions(
    (state: Actions<AppStoreModel>) => state.activity
  );

  const setIsModalOpen = useStoreActions(
    (action: Actions<AppStoreModel>) => action.ui.setIsModalOpen
  );
  const setModeModal = useStoreActions(
    (action: Actions<AppStoreModel>) => action.ui.setModeModal
  );

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (id) getCurrentActivityDetail(id);
  }, [id]);

  const updateActivity = () => {
    setModeModal("update");
    setIsModalOpen(true);
  };

  const callDeleteActivity = async (id: any) => {
    try {
      await deleteActivity(id);
      window.location.reload();
    } catch {
      console.log("error delete activity");
    }
  };

  return (
    <Card className="p-4 mb-5 mt-5 position-relative">
      {/* Icones en haut à droite */}
      <div className="position-absolute top-0 end-0 m-3 d-flex gap-2 mt-4 me-4">
        <FontAwesomeIcon
          icon={faPenIcon}
          size="lg"
          color="blue"
          className="cursor-pointer me-4"
          onClick={updateActivity}
        />
        <FontAwesomeIcon
          icon={faTrashIcon}
          size="lg"
          color="red"
          className="cursor-pointer"
          onClick={() => setConfirmDelete(true)}
        />
      </div>

      <Card.Body>
        <Card.Title className="display-6 fw-light mb-4">
          {t("activity.detail.title")}
        </Card.Title>

        {currentActivityDetail && (
          <div>
            <h2 className="mb-2">
              <FontAwesomeIcon
                icon={faStarIcon}
                color="green"
                className="me-2"
              />
              {currentActivityDetail?.name}
            </h2>
            <div className="mb-3">
              <Card.Text>
                <FontAwesomeIcon
                  icon={faHandPointRightIcon}
                  color="green"
                  className="me-2"
                />
                <strong>{t("activity.detail.description")}:</strong>{" "}
                {currentActivityDetail?.description}
              </Card.Text>
            </div>

            <div className="mb-2">
              <strong>{t("activity.detail.positive")}:</strong>{" "}
              {currentActivityDetail?.positive ? (
                <span> {t("activity.detail.yes")}</span>
              ) : (
                <span> {t("activity.detail.no")}</span>
              )}
            </div>
            <div className="mb-2">
              <strong>{t("activity.detail.category")}:</strong>{" "}
              {currentActivityDetail?.category.name}
            </div>
          </div>
        )}

        {confirmDelete && (
          <>
            <p className="text-danger mt-3">
              {t("activity.detail.confirmDelete", {
                name: currentActivityDetail?.name,
              })}
            </p>
            <Row>
              <Col>
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="px-5 btn-add bg-danger"
                  onClick={() => {
                    callDeleteActivity(id);
                  }}
                >
                  {t("activity.detail.yes")}
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="px-5 btn-add"
                  onClick={() => setConfirmDelete(false)}
                >
                  {t("activity.detail.no")}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default DetailActivity;
