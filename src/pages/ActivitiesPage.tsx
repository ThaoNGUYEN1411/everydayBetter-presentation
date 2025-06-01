import { FC, useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DetailActivity from "../components/DetailActivity";
import CreateActivityModal from "../components/CreateActivityModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
// import CalendarTable from "../components/ActivityCalender";
import { action, Actions, useStoreActions, useStoreState } from "easy-peasy";
import { AppStoreModel } from "../store";
import TrackingRecord from "../components/TrackingLog";

const ActivitiesPage: FC = () => {
  const { t } = useTranslation();
  // const [activityId, setActivityId] = useState<string | null>(null);
  // const [show, setShow] = useState(false);
  const isModalOpen = useStoreState((state: any) => {
    return state.ui.isModalOpen;
  });
  const setIsModalOpen = useStoreActions(
    (action: Actions<AppStoreModel>) => action.ui.setIsModalOpen
  );
  const setModeModal = useStoreActions(
    (action: Actions<AppStoreModel>) => action.ui.setModeModal
  );
  const { activityList } = useStoreState((state: any) => {
    // typeof state;
    return state.activity;
  });
  const { getAllActivityList, setCurrentActivityDetail } = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.activity
  );
  const handleClose = () => setIsModalOpen(false);

  const openModalForCreateNewActivity = () => {
    setModeModal("create");
    setCurrentActivityDetail(null);
    setIsModalOpen(true);
  };
  // const isUpdate = false;
  // Load Data on Component Mount
  useEffect(() => {
    getAllActivityList();
  }, [activityList.length]);

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
            onClick={openModalForCreateNewActivity}
          >
            {t("activity.btn-add")}
          </Button>
        </div>
        <CreateActivityModal
          show={isModalOpen}
          handleClose={handleClose}
          refreshActivities={() => getAllActivityList()}
          // mode={mode}
        />
      </div>
      <Row className="wh-80">
        {/* <Col md={8} className="bg-light mt-4">
          <Row>
            <Col xs={4} className="mt-5">
              <Table className="list-activities" striped hover>
                <thead className="text-center"></thead>
                <tbody>
                  {activityList.map((activity: any) => {
                    return (
                      <tr key={activity.id}>
                        <td
                          className="border border-gray-300 px-4 py-2 activity-line"
                          key={activity.id}
                        >
                          <div
                            key={activity.id}
                            onClick={() =>
                              setActivityId(activity.id.toString())
                            }
                            className="w-10"
                          >
                            <span className="me-3 small" key={activity.id}>
                              {activity.positive ? (
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  key={activity.id}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faXmark}
                                  key={activity.id}
                                />
                              )}
                            </span>
                            {activity.name}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
        
          </Row>
        </Col> */}
        {/* <Col md={4} className="xs-display-none">
          {activityId && <DetailActivity id={activityId} />}
        </Col> */}
        <TrackingRecord />
      </Row>
    </div>
  );
};

export default ActivitiesPage;

//toto check category
