import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { FC, useEffect, useState } from "react";
import { Button, ButtonGroup, DropdownButton, Table } from "react-bootstrap";
import { AppStoreModel } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import moment from "moment";
import { TrackActivityData } from "../store/activity.model";

// export interface TrackActivityData {
//   activityId: string;
//   trackedDate: string;
//   done: boolean | null;
// }

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

const TrackingRecord: FC = () => {
  const { trackingActivityByDay } = useStoreState((state: AppStoreModel) => {
    return state.activity;
  });
  const { saveTrackingRecord, getTrackingActivityByDay } = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.activity
  );

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>(getWeekDates(new Date()));
  const [isSaveTrackingSuccess, setIsSaveTrackingSuccess] = useState(false);

  useEffect(() => {
    const dates = getWeekDates(startDate);
    setWeekDates(dates);
    const startStr = formatDate(dates[0]);
    const endStr = formatDate(dates[6]);

    getTrackingActivityByDay({
      startDate: startStr,
      endDate: endStr,
    });
  }, [startDate, getTrackingActivityByDay, isSaveTrackingSuccess]);

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
      await saveTrackingRecord({
        activityId: activityId.toString(),
        trackedDate: formatDate(dateStr),
        done,
      });
      setIsSaveTrackingSuccess(true);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement : ", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mt-5 mb-2">
        <button onClick={() => handleWeekChange("prev")}>⬅️</button>
        <h3 className="mb-3">
          Semaine du {weekDates[0].toLocaleDateString("fr-FR")}
          <span> au </span>
          {weekDates[6].toLocaleDateString("fr-FR")}
        </h3>
        <button onClick={() => handleWeekChange("next")}>➡️</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Activités</th>
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
          {trackingActivityByDay.map((trackingAct: any) => (
            <tr key={trackingAct.activityId}>
              <td>{trackingAct.activityName}</td>
              {weekDates.map((date, i) => {
                const formatted = formatDate(date);
                const doneValue =
                  trackingAct?.trackingByDay?.[formatted] ?? null;
                return (
                  <td key={i} className="track-btn">
                    <ButtonGroup size="lg">
                      <DropdownButton
                        as={ButtonGroup}
                        title={
                          doneValue === true ? (
                            <FontAwesomeIcon
                              icon={faCheck}
                              size="lg"
                              className="text-success"
                            />
                          ) : doneValue === false ? (
                            <FontAwesomeIcon
                              icon={faXmark}
                              size="lg"
                              className="text-danger"
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
                      >
                        <Button
                          value="true"
                          onClick={() =>
                            toggle(trackingAct.activityId, formatted, null)
                          }
                          className="mx-2"
                          variant="white"
                        >
                          <FontAwesomeIcon
                            icon={faBan}
                            size="lg"
                            className="text-black"
                          />
                        </Button>
                        <Button
                          value="true"
                          onClick={() =>
                            toggle(trackingAct.activityId, formatted, true)
                          }
                          className="me-1"
                          variant="white"
                        >
                          <FontAwesomeIcon
                            icon={faCheck}
                            size="lg"
                            className="text-success"
                          />
                        </Button>
                        <Button
                          value="false"
                          onClick={() =>
                            toggle(trackingAct.activityId, formatted, false)
                          }
                          className="me-1"
                          variant="white"
                        >
                          <FontAwesomeIcon
                            icon={faXmark}
                            size="lg"
                            className="text-danger"
                          />
                        </Button>
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
  );
};
export default TrackingRecord;
