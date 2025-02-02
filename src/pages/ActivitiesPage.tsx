import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DetailActivity from "../components/DetailActivity";
import { getToken } from "../utils/Token";
import CreateActivityModal from "../components/CreateActivityModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export interface ActivityModel {
  id: number;
  name: string;
  positive: boolean;
}
export interface ActivityModel {
  name: string;
  description: string;
  positive: boolean;
  categoryIds: [1, 2];
}

export interface CategoryModel {
  id: number;
  name: string;
}

const ActivitiesPage: FC = () => {
  const { t } = useTranslation();

  const [activitiesList, setActivitiesList] = useState<ActivityModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [activityId, setActivityId] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch Activities
  const fetchActivities = async () => {
    try {
      const token = getToken();
      const response = await axios.get<ActivityModel[]>(
        "http://localhost:8080/activities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setActivitiesList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching activities", error);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const token = getToken();
      const response = await axios.get<CategoryModel[]>(
        "http://localhost:8080/categories/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching activities", error);
    }
  };

  // Load Data on Component Mount
  useEffect(() => {
    fetchActivities();
    fetchCategories();
  }, []);

  return (
    <div className="grid wide">
      <div className="d-flex justify-content-between w-75">
        <h1 className="mt-5 mb-3">{t("activity.list.title")}</h1>
        <div>
          <Button
            variant="primary"
            type="submit"
            size="lg"
            className="px-5 mt-5"
            onClick={handleShow}
          >
            {t("activity.btn-add")}
          </Button>
        </div>
        <CreateActivityModal
          show={show}
          handleClose={handleClose}
          categories={categories}
          refreshActivities={fetchActivities}
        />
      </div>
      <Row className="wh-80">
        <Col md={8} className="">
          <Row>
            <Col xs={4} className="">
              <ul>
                {activitiesList.map((activity) => {
                  return (
                    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                    <li
                      key={activity.id}
                      onClick={() => setActivityId(activity.id.toString())}
                      className="list-group-item"
                    >
                      <span className="me-3">
                        {activity.positive ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faXmark} />
                        )}
                      </span>
                      {activity.name}
                    </li>
                  );
                })}
              </ul>
            </Col>
            <Col xs={8} className="bg-light">
              {t("activity.list.title_follow")}
            </Col>
          </Row>
        </Col>
        <Col md={4} className="xs-display-none">
          {activityId && <DetailActivity id={activityId} />}
        </Col>
      </Row>
    </div>
  );
};

export default ActivitiesPage;

//toto check category
