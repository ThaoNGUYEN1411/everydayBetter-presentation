import { FC, useEffect } from "react";
import { Button, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CreateActivityModal from "../components/CreateActivityModal";
import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { AppStoreModel } from "../store";
import TrackingLog from "../components/TrackingLog";
import Charts from "../components/Charts";

const ActivitiesPage: FC = () => {
  const { t } = useTranslation();
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
  useEffect(() => {
    getAllActivityList();
  }, [activityList?.length]);

  return (
    <div className="grid wide page height-page">
      <div className="d-flex justify-content-between w-100 height-page">
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
        />
      </div>
      <Row className="wh-80">
        <TrackingLog />
      </Row>
      <Charts />
    </div>
  );
};

export default ActivitiesPage;
