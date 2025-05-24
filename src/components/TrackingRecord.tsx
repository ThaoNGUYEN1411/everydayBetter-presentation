import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { FC, useEffect, useState } from "react";
import { Button, ButtonGroup, DropdownButton, Table } from "react-bootstrap";
import { AppStoreModel } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { format, parse } from "date-fns";

//3. display the current week in the table header
const getWeekDates = (startDate: Date): Date[] => {
  const dates: Date[] = [];
  for (let i = 1; i < 8; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    dates.push(d);
  }
  return dates;
};
const formattedDate = (value: string) => {
  return format(new Date(value), "yyyy-MM-dd");
};
// type TrackActivityData = {
//   activityId: string;
//   trackedDate: string;
//   done: boolean | null;
// };

const TrackingRecord: FC = () => {
  const { activityList, TrackActivityData } = useStoreState((state: any) => {
    // typeof state;
    return state.activity;
  });
  const { getAllActivityList, saveTrackingRecord } = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.activity
  );
  //todo: start monday
  const [startDate, setStartDate] = useState<Date>(() => {
    const d = new Date();
    const day = d.getDay();
    d.setDate(d.getDate() - day); // Commencer au dimanche
    return d;
  });
  const [trackActivityData, setTrackActivityData] = useState<
    typeof TrackActivityData
  >(() => {
    const initialData = {
      activityId: "",
      trackedDate: "",
      done: null,
    };
    return initialData;
  });
  const weekDates = getWeekDates(startDate);
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
    setTrackActivityData((prev: typeof TrackActivityData) => ({
      ...prev,
      activityId: activityId.toString(),
      trackedDate: formattedDate(dateStr),
      done: done,
    }));
    // console.log(data);
    try {
      await saveTrackingRecord(trackActivityData);
      console.log("save track ok");
    } catch (error) {
      console.log("error track:>> ", error);
    }
  };
  console.log(trackActivityData);

  useEffect(() => {
    getAllActivityList();
  }, []);
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mt-5 mb-2">
        <button onClick={() => handleWeekChange("prev")}>⬅️</button>
        <h3 className="mb-3">
          Semaine du {weekDates[0].toLocaleDateString("fr-FR")} au
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
          {activityList.map((activity: any) => (
            <tr key={activity.id}>
              <td>{activity.name}</td>
              {weekDates.map((date, i) => {
                const dateStr = date.toDateString();
                // const checked = data[activity]?.[dateStr] ?? false;
                return (
                  <td
                    key={i}
                    className="track-btn"
                    // onClick={() => toggle(activity, dateStr)}
                  >
                    {/* {checked ? "✔" : "✘"} */}
                    <ButtonGroup size="lg">
                      <DropdownButton
                        as={ButtonGroup}
                        title=" "
                        //   title={<FontAwesomeIcon icon={faChevronDown} />}
                        // id="bg-nested-dropdown"
                        variant="info"
                        className="btn-group"
                      >
                        <Button
                          value="true"
                          onClick={() => toggle(activity.id, dateStr, null)}
                          className="mx-2"
                        >
                          <FontAwesomeIcon icon={faBan} />
                        </Button>
                        <Button
                          value="true"
                          onClick={() => toggle(activity.id, dateStr, true)}
                          className="me-2"
                        >
                          ✔
                        </Button>
                        <Button
                          value="false"
                          onClick={() => toggle(activity.id, dateStr, true)}
                          className="me-2"
                        >
                          ✘
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
