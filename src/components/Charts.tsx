import { PieChart } from "@mui/x-charts";
import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { FC, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AppStoreModel } from "../store";

const Charts: FC = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const progressAnalytics = useStoreState(
    (state: any) => state.activity.progressAnalytics
  );
  const { setProgressAnalytics, getActivitiesProgressAnalytics } =
    useStoreActions((state: Actions<AppStoreModel>) => state.activity);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(startDate, endDate);
    getActivitiesProgressAnalytics({ startDate, endDate });
  };

  // useEffect(() => {
  //   getActivitiesProgressAnalytics({ startDate: null, endDate: null });
  // }, []);

  return (
    <div className="my-5 pt-5">
      <Form onSubmit={handleSubmit}>
        <h2 className="text-center py-4">{t("charts.title")}</h2>
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
            <Button type="submit">{t("charts.form.button")}</Button>
          </Col>
        </Row>
      </Form>
      {progressAnalytics && (
        <Row className="mt-5 mb-5">
          {progressAnalytics?.map((progressAnalytic: any) => {
            const { activityId, activityName, progress } = progressAnalytic;
            const { done, missed, untracked } = progress;

            const pieData = [
              { id: 0, value: done, label: "Done" },
              { id: 1, value: missed, label: "Missed" },
              { id: 2, value: untracked, label: "Untracked" },
            ];
            return (
              <Col sm={6} key={activityId}>
                <PieChart
                  // colors={["green", "red", "orange"]}
                  series={[
                    {
                      data: pieData,
                    },
                  ]}
                  width={200}
                  height={200}
                  key={activityId}
                />
                <div className="text-center" key={activityId}>
                  <p key={activityId}>{activityName}</p>
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
