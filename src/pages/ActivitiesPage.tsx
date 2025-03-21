import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DetailActivity from "../components/DetailActivity";
import { getToken } from "../utils/Token";
import CreateActivityModal from "../components/CreateActivityModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import CalendarTable from "../components/ActivityCalender";

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
    <div className="grid wide page">
      <div className="d-flex justify-content-between w-100">
        <h1 className="mt-5 mb-3">{t("activity.list.title")}</h1>
        <div>
          <Button
            variant="primary"
            type="submit"
            size="lg"
            className="px-4 mt-5 btn-add me-4"
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
        <Col md={8} className="bg-light mt-4">
          <Row>
            <Col xs={4} className="mt-5">
              {/* change here */}
              <Table className="list-activities" striped hover>
                <thead className="text-center">
                  <h3 className="mb-3">Activités</h3>
                </thead>
                <tbody>
                  {activitiesList.map((activity) => {
                    return (
                      <div>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2 activity-line">
                            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                            <div
                              key={activity.id}
                              onClick={() =>
                                setActivityId(activity.id.toString())
                              }
                              className="w-10"
                            >
                              <span className="me-3 small">
                                {activity.positive ? (
                                  <FontAwesomeIcon icon={faCheck} />
                                ) : (
                                  <FontAwesomeIcon icon={faXmark} />
                                )}
                              </span>
                              {activity.name}
                            </div>
                          </td>
                        </tr>
                      </div>
                    );
                  })}
                </tbody>
              </Table>
              {/* end change here */}
            </Col>
            {activitiesList?.length > 0 && (
              <Col xs={8}>
                <CalendarTable lineNumber={activitiesList?.length.toString()} />
              </Col>
            )}
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
