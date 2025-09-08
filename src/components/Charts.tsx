import { PieChart } from "@mui/x-charts";
import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { FC, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AppStoreModel } from "../store";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Charts: FC = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const faCheckIcon: IconProp = faCheck;
  const faXmarkIcon: IconProp = faXmark;

  const progressAnalytics = useStoreState(
    (state: any) => state.activity.progressAnalytics
  );
  const { getActivitiesProgressAnalytics } = useStoreActions(
    (state: Actions<AppStoreModel>) => state.activity
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(startDate, endDate);
    getActivitiesProgressAnalytics({ startDate, endDate });
  };

  return (
    <div className="my-5 pt-5">
      <Form onSubmit={handleSubmit}>
        <div className="text-center py-4 mb-5">
          <h2>{t("charts.title")}</h2>
          <h3>{t("charts.sub_title")}</h3>
        </div>

        <Row>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label htmlFor="startDate">
                {t("charts.form.start_date")}
              </Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="lg"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label htmlFor="endDate">
                {t("charts.form.end_date")}
              </Form.Label>
              <Form.Control
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                size="lg"
              />
            </Form.Group>
          </Col>
          <Col className="text-center">
            <Button type="submit" className="btn-add" size="lg">
              {t("charts.form.button")}
            </Button>
          </Col>
          <p className="small text-end">{t("charts.text")}</p>
        </Row>
      </Form>
      {progressAnalytics && (
        <Row className="mt-5 mb-5 pb-5">
          {progressAnalytics?.map((progressAnalytic: any) => {
            const { activityId, activityName, positive, progress } =
              progressAnalytic;
            const { done, missed, untracked } = progress;
            const pieData = [
              { id: 0, value: done, label: "Done" },
              { id: 1, value: missed, label: "Missed" },
              { id: 2, value: untracked, label: "Untracked" },
            ];
            return (
              <Col sm={6} key={activityId}>
                <PieChart
                  colors={
                    positive
                      ? ["#2DA673", "#f25555ff", "#f1df56ff"]
                      : ["#f25555ff", "#2DA673", "#f1df56ff"]
                  }
                  series={[
                    {
                      data: pieData,
                    },
                  ]}
                  width={200}
                  height={200}
                  key={activityId}
                  className="mb-2"
                />
                <div className="text-center mb-5 pe-5 me-5" key={activityId}>
                  <p key={activityId}>
                    <span>
                      {positive ? (
                        <FontAwesomeIcon
                          icon={faCheckIcon}
                          size="sm"
                          className="text-success"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faXmarkIcon}
                          size="sm"
                          className="text-danger"
                        />
                      )}{" "}
                    </span>
                    {activityName}
                  </p>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default Charts;
