import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";
import TrackingLog from "../components/TrackingLog";

export class CreateActivity {
  categoryId: number | null;
  name: string | null;
  description: string | null;
  positive: boolean | null;
  constructor() {
    this.categoryId = null;
    this.name = null;
    this.description = null;
    this.positive = null;
  }
}

export interface ActivityDto {
  id: number;
  name: string;
  positive: boolean;
}

export interface CurrentActivityDetail {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
}

// export interface updateActivity {
//   id: string;
//   activity: CreateActivity;
// }

export interface TrackActivityData {
  activityId: string;
  trackedDate: string;
  done: boolean | null;
}
export interface TrackingLog {
  id: string;
  date: string;
  done: boolean;
}

export interface ActivityTrackingLog {
  activityId: string;
  activityName: string;
  listTrackingLog: TrackingLog[];
}
//définit le type du modèle (les données + les actions).
export interface ActivityModel {
  create: Thunk<ActivityModel, CreateActivity>;
  activityList: ActivityDto[];
  activityTrackingLogList: ActivityTrackingLog[];
  setActivityList: Action<ActivityModel, ActivityDto[]>;
  setActivityTrackingLogList: Action<ActivityModel, ActivityTrackingLog[]>;
  getAllActivityList: Thunk<ActivityModel>;
  deleteActivity: Thunk<ActivityModel, string>;
  removeActivityFromList: Action<ActivityModel, string>;
  currentActivityDetail: CurrentActivityDetail | null;
  setCurrentActivityDetail: Action<ActivityModel, CurrentActivityDetail | null>;
  getCurrentActivityDetail: Thunk<ActivityModel, string>;
  // updateActivity: Thunk<ActivityModel, updateActivity>;
  createTrackingLog: Thunk<ActivityModel, TrackActivityData, any, any>;
  getAllActivityTrackingLog: Thunk<
    ActivityModel,
    { startDate: string; endDate: string }
  >;
  updateTrackingLog: Thunk<ActivityModel, TrackActivityData, any, any>;
  deleteTrackingLog: Thunk<ActivityModel, { id: string }, any>;
  // handleShow: Action<ActivityModel, { show: boolean }>;
}

//contient l'état initial et l’action (permet de modifier le state.)
export const activityModel: ActivityModel = {
  create: thunk(async (_, createActivityForm) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/activities",
        createActivityForm, // Pas besoin de JSON.stringify, axios le fait tout seul
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // important pour envoyer le cookie JWT
        }
      );
    } catch (error) {
      console.error("Erreur lors de la création d'activité :", error);
    }
  }),
  activityList: [],
  activityTrackingLogList: [],
  setActivityList: action((state, activityList) => {
    state.activityList = activityList;
  }),
  setActivityTrackingLogList: action((state, activityTrackingLogList) => {
    state.activityTrackingLogList = activityTrackingLogList;
  }),
  getAllActivityList: thunk(async (actions, _payload) => {
    try {
      const response = await axios.get("http://localhost:8080/activities", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, //add the cookies if server send Set-Cookie
      });
      actions.setActivityList(response.data);
    } catch (error) {
      console.log("error get activityList");
    }
  }),
  deleteActivity: thunk(async (actions, id, { injections }) => {
    const { httpService } = injections;
    console.log(id);

    const response = await httpService.delete(`/activities/${id}`, {
      withCredentials: true,
    });
    actions.setCurrentActivityDetail(null);
  }),
  removeActivityFromList: action((state, id) => {
    state.activityList = state.activityList.filter(
      (activity) => activity.id !== Number(id)
    );
  }),
  setCurrentActivityDetail: action((state, currentActivityModel) => {
    state.currentActivityDetail = currentActivityModel;
  }),
  getCurrentActivityDetail: thunk(async (actions, id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/activities/${id}`,
        {
          withCredentials: true, //add the cookies if server send Set-Cookie
        }
      );
      actions.setCurrentActivityDetail(response.data);
    } catch (error) {
      console.log("error get activityList");
    }
  }),
  currentActivityDetail: null,
  // updateActivity: thunk(async (action, payload, { injections }) => {
  //   const { httpService } = injections;
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8080/activities/${payload.id}`,
  //       payload.activity,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //   } catch (error) {
  //     console.log("update activity");
  //   }
  // }),
  createTrackingLog: thunk(
    async (action, payload, { getState, injections }) => {
      const { httpService } = injections;

      const response: any = await httpService.post(`/tracking-logs/`, payload, {
        withCredentials: true,
      });

      //   const { activityId, trackedDate, done } = response;

      //   const currentList = getState().activityTrackingLogList;

      //   const updatedList = currentList.map((item) => {
      //     if (item.activityId === activityId) {
      //       const updatedLogs = item.listTrackingLog.map((log) => {
      //         if (log.date === trackedDate) {
      //           return {
      //             ...log,
      //             done: done,
      //           };
      //         }
      //         return log;
      //       });

      //       return {
      //         ...item,
      //         listTrackingLog: updatedLogs,
      //       };
      //     }
      //     return item;
      //   });

      //   action.setActivityTrackingLogList(updatedList);
    }
  ),
  getAllActivityTrackingLog: thunk(
    async (action, { startDate, endDate }, { injections }) => {
      const { httpService } = injections;
      try {
        const response: any = await httpService.get(
          `/tracking-logs/?start-date=${startDate}&end-date=${endDate}`,
          { withCredentials: true }
        );
        action.setActivityTrackingLogList(response);
      } catch (error) {
        console.error("Erreur lors de saveTrackingRecord :", error);
      }
    }
  ),
  updateTrackingLog: thunk(async (_action, payload, { injections }) => {
    const { httpService } = injections;
    const response: any = await httpService.patch(
      `/tracking-logs/update`,
      payload,
      {
        withCredentials: true,
      }
    );
  }),
  deleteTrackingLog: thunk(async (_action, id, { injections }) => {
    const { httpService } = injections;
    const response: any = await httpService.delete(`/tracking-logs/?id=${id}`, {
      withCredentials: true,
    });
  }),
};
