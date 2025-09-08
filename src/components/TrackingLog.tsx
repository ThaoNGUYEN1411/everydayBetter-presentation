import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { FC, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  DropdownButton,
  Row,
  Table,
} from "react-bootstrap";
import { AppStoreModel } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import DetailActivity from "./DetailActivity";
import { t } from "i18next";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const faCheckIcon: IconProp = faCheck;
const faXmarkIcon: IconProp = faXmark;
const faBanIcon: IconProp = faBan;

//1. display the current week in the table header
//startDate: the date we base our week on start this date
const getWeekDates = (startDate: Date): Date[] => {
  const monday = new Date(startDate); //startDate can today
  const day = monday.getDay(); // Sunday - Saturday : 0 - 6
  const daysFromTodayToMonday = day === 0 ? -6 : 1 - day;
  monday.setDate(startDate.getDate() + daysFromTodayToMonday);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};
//change format date
const formatDate = (date: string | Date) => {
  return moment(new Date(date)).format("YYYY-MM-DD");
};

const TrackingLog: FC = () => {
  const { activityTrackingLogList, activityList } = useStoreState(
    (state: AppStoreModel) => {
      return state.activity;
    }
  );
  const {
    createTrackingLog,
    getAllActivityTrackingLog,
    updateTrackingLog,
    deleteTrackingLog,
  } = useStoreActions((actions: Actions<AppStoreModel>) => actions.activity);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>(getWeekDates(new Date()));
  const [isSaveTrackingSuccess, setIsSaveTrackingSuccess] = useState(false);
  const [activityDetailId, setActivityDetailId] = useState<string | null>(null);

  useEffect(() => {
    const dates = getWeekDates(startDate);
    setWeekDates(dates);
    const startStr = formatDate(dates[0]);
    const endStr = formatDate(dates[6]);

    getAllActivityTrackingLog({
      startDate: startStr,
      endDate: endStr,
    });
  }, [
    startDate,
    getAllActivityTrackingLog,
    isSaveTrackingSuccess,
    activityList,
  ]);

  const handleWeekChange = (direction: "prev" | "next") => {
    const newStart = new Date(startDate);
    newStart.setDate(startDate.getDate() + (direction === "next" ? 7 : -7));
    setStartDate(newStart);
  };

  const toggle = async (
    activityId: string,
    dateStr: string,
    done: boolean | null
  ) => {
    setIsSaveTrackingSuccess(false);
    try {
      await createTrackingLog({
        activityId: activityId.toString(),
        trackedDate: formatDate(dateStr),
        done,
      });
      setIsSaveTrackingSuccess(true);
    } catch {
      console.error("Error create tracking log ");
    }
  };

  const update = async (
    activityId: string,
    dateStr: string,
    done: boolean | null
  ) => {
    setIsSaveTrackingSuccess(false);
    try {
      await updateTrackingLog({
        activityId: activityId.toString(),
        trackedDate: formatDate(dateStr),
        done,
      });
      setIsSaveTrackingSuccess(true);
    } catch {
      console.error("Error update tracking log");
    }
  };

  const deleteLog = async (id: any) => {
    setIsSaveTrackingSuccess(false);
    try {
      await deleteTrackingLog(id);
      setIsSaveTrackingSuccess(true);
    } catch {
      console.error("Error delete tracking log");
    }
  };
  return (
    <Row className="shadow-lg border-0">
      <Col md={8} className="p-2">
        <div className="container mt-4">
          <div className="d-flex justify-content-between mt-5 mb-2">
            <button onClick={() => handleWeekChange("prev")}>⬅️</button>
            <h3 className="mb-3">
              <span> {t("activity.tracking_log.week_of")} </span>
              {weekDates[0].toLocaleDateString("fr-FR")}
              <span> {t("activity.tracking_log.to")} </span>
              {weekDates[6].toLocaleDateString("fr-FR")}
            </h3>
            <button onClick={() => handleWeekChange("next")}>➡️</button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t("menu.activities")}</th>
                {weekDates.map((date, i) => (
                  <th key={i}>
                    {date.toLocaleDateString("fr-FR", {
                      weekday: "short",
                      day: "numeric",
                    })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activityTrackingLogList.map((trackingAct: any) => (
                <tr key={trackingAct.activityId}>
                  <td
                    onClick={() => setActivityDetailId(trackingAct.activityId)}
                  >
                    <span>
                      {trackingAct.positive ? (
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
                    {trackingAct.activityName}
                  </td>
                  {weekDates.map((date, i) => {
                    const formatted = formatDate(date);
                    const log = trackingAct?.listTrackingLog?.find(
                      (item: any) => item.date === formatted
                    );
                    const doneValue = log?.done ?? null;
                    const today = new Date();
                    const futureDateDisabled = date.getTime() > today.getTime();
                    return (
                      <td key={i} className="track-btn">
                        <ButtonGroup size="lg">
                          <DropdownButton
                            vertical={true}
                            as={ButtonGroup}
                            disabled={futureDateDisabled}
                            title={
                              doneValue === true ? (
                                <FontAwesomeIcon
                                  icon={faCheckIcon}
                                  size="lg"
                                  className={
                                    trackingAct.positive
                                      ? "text-success"
                                      : "text-danger"
                                  }
                                />
                              ) : doneValue === false ? (
                                <FontAwesomeIcon
                                  icon={faXmarkIcon}
                                  size="lg"
                                  className={
                                    trackingAct.positive
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                />
                              ) : (
                                " "
                              )
                            }
                            variant="white"
                            className={
                              doneValue !== null ? "no-caret ps-2" : "ps-2"
                            }
                            size="lg"
                            id="bg-nested-dropdown"
                          >
                            <Dropdown.Item
                              eventKey="1"
                              className="p-0 m-0 d-inline"
                            >
                              <Button
                                value="true"
                                onClick={() => {
                                  if (doneValue !== null) {
                                    deleteLog(log?.id);
                                  }
                                }}
                                variant="white"
                              >
                                <FontAwesomeIcon
                                  icon={faBanIcon}
                                  size="sm"
                                  className="text-black"
                                />
                              </Button>
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="2"
                              className="p-0 m-0 d-inline"
                            >
                              <Button
                                value="true"
                                onClick={() => {
                                  if (doneValue === false) {
                                    update(
                                      trackingAct.activityId,
                                      formatted,
                                      true
                                    );
                                  } else if (doneValue === null) {
                                    toggle(
                                      trackingAct.activityId,
                                      formatted,
                                      true
                                    );
                                  }
                                }}
                                variant="white"
                              >
                                <FontAwesomeIcon
                                  icon={faCheckIcon}
                                  size="lg"
                                  // className="text-success"
                                  className={
                                    trackingAct.positive
                                      ? "text-success"
                                      : "text-danger"
                                  }
                                />
                              </Button>
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="3"
                              className="p-0 d-inline"
                            >
                              <Button
                                value="false"
                                onClick={() => {
                                  if (doneValue === true) {
                                    update(
                                      trackingAct.activityId,
                                      formatted,
                                      false
                                    );
                                  } else if (doneValue === null) {
                                    toggle(
                                      trackingAct.activityId,
                                      formatted,
                                      false
                                    );
                                  }
                                }}
                                className="me-1"
                                variant="white"
                              >
                                <FontAwesomeIcon
                                  icon={faXmarkIcon}
                                  size="lg"
                                  // className="text-danger"
                                  className={
                                    trackingAct.positive
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                />
                              </Button>
                            </Dropdown.Item>
                          </DropdownButton>
                        </ButtonGroup>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
      <Col md={4} className="xs-display-none">
        {activityDetailId && <DetailActivity id={activityDetailId} />}
      </Col>
    </Row>
  );
};
export default TrackingLog;
