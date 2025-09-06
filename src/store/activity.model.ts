import { action, Action, thunk, Thunk } from "easy-peasy";
import TrackingLog from "../components/TrackingLog";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
export interface CreateActivity {
  categoryId: number;
  name: string;
  description: string | null;
  positive: boolean;
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
  positive: boolean;
  categoryId: number;
  categoryName: string;
}

export interface updateActivityData {
  id: string;
  activity: CreateActivity;
}

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
  positive: Boolean;
  listTrackingLog: TrackingLog[];
}
export interface ProgressAnalytics {
  activityId: string;
  activityName: string;
  positive: true;
  progress: Progress;
}

export interface Progress {
  done: number;
  missed: number;
  untracked: number;
}

//define le type du model (data+ action)
export interface ActivityModel {
  activityList: ActivityDto[];
  activityTrackingLogList: ActivityTrackingLog[];
  currentActivityDetail: CurrentActivityDetail | null;
  progressAnalytics: ProgressAnalytics[] | null;

  setActivityList: Action<ActivityModel, ActivityDto[]>;
  setActivityTrackingLogList: Action<ActivityModel, ActivityTrackingLog[]>;
  removeActivityFromList: Action<ActivityModel, string>;
  setCurrentActivityDetail: Action<ActivityModel, CurrentActivityDetail | null>;
  setProgressAnalytics: Action<ActivityModel, ProgressAnalytics[] | null>;

  create: Thunk<ActivityModel, CreateActivity>;
  getAllActivityList: Thunk<ActivityModel>;
  deleteActivity: Thunk<ActivityModel, string>;
  getCurrentActivityDetail: Thunk<ActivityModel, string>;
  updateActivity: Thunk<ActivityModel, updateActivityData, any>;
  createTrackingLog: Thunk<ActivityModel, TrackActivityData, any, any>;
  getAllActivityTrackingLog: Thunk<
    ActivityModel,
    { startDate: string; endDate: string }
  >;
  updateTrackingLog: Thunk<ActivityModel, TrackActivityData, any, any>;
  deleteTrackingLog: Thunk<ActivityModel, { id: string }, any>;

  getActivitiesProgressAnalytics: Thunk<
    ActivityModel,
    { startDate: string; endDate: string }
  >;
}

//state initial et l’action
export const activityModel: ActivityModel = {
  activityList: [],
  activityTrackingLogList: [],
  currentActivityDetail: null,
  progressAnalytics: null,

  setActivityList: action((state, activityList) => {
    state.activityList = activityList;
  }),
  setActivityTrackingLogList: action((state, activityTrackingLogList) => {
    state.activityTrackingLogList = activityTrackingLogList;
  }),
  removeActivityFromList: action((state, id) => {
    state.activityList = state.activityList.filter(
      (activity) => activity.id !== Number(id)
    );
  }),
  setCurrentActivityDetail: action((state, currentActivityModel) => {
    state.currentActivityDetail = currentActivityModel;
  }),
  setProgressAnalytics: action((state, progressAnalytics) => {
    state.progressAnalytics = progressAnalytics;
  }),

  create: thunk(async (_, createActivity, { injections }) => {
    const { httpService } = injections;
    try {
      await httpService.post("/activities", createActivity, {
        withCredentials: true, // send cookie JWT
      });
      return "success";
    } catch (error: any) {
      const errorData = error.response;
      if (errorData.status === 400) {
        if (
          errorData.data.errors?.some(
            (err: any) => err.code == "ActivityCreateUnique"
          )
        ) {
          return "ActivityCreateUnique";
        }
      } else {
        return "server_error";
      }
    }
  }),
  getAllActivityList: thunk(async (actions, _payload) => {
    try {
      const response = await axios.get(`${VITE_API_URL}/activities`, {
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
    await httpService.delete(`/activities/${id}`, {
      withCredentials: true,
    });
    actions.setCurrentActivityDetail(null);
  }),

  getCurrentActivityDetail: thunk(async (actions, id) => {
    try {
      const response = await axios.get(`${VITE_API_URL}/activities/${id}`, {
        withCredentials: true, //add the cookies if server send Set-Cookie
      });
      actions.setCurrentActivityDetail(response.data);
    } catch {
      console.log("error get activityList");
    }
  }),
  updateActivity: thunk(async (_action, payload, { injections }) => {
    const { httpService } = injections;
    try {
      await httpService.put(`/activities/${payload.id}`, payload.activity, {
        withCredentials: true,
      });
      return "success";
    } catch (error: any) {
      const errorData = error.response;
      if (errorData.status === 400) {
        if (
          errorData.data.errors?.some(
            (err: any) => err.code == "ActivityUpdateUnique"
          )
        ) {
          return "ActivityUpdateUnique";
        }
      } else {
        return "serveur_error";
      }
    }
  }),
  createTrackingLog: thunk(async (_action, payload, { injections }) => {
    const { httpService } = injections;
    console.log(payload);

    await httpService.post(`/tracking-logs/`, payload, {
      withCredentials: true,
    });
  }),

  getAllActivityTrackingLog: thunk(
    async (action, { startDate, endDate }, { injections }) => {
      const { httpService } = injections;
      try {
        const response: any = await httpService.get(
          `/tracking-logs/?start-date=${startDate}&end-date=${endDate}`,
          { withCredentials: true }
        );
        action.setActivityTrackingLogList(response);
      } catch {
        console.error("Error saveTrackingRecord");
      }
    }
  ),
  updateTrackingLog: thunk(async (_action, payload, { injections }) => {
    const { httpService } = injections;
    await httpService.patch(`/tracking-logs/update`, payload, {
      withCredentials: true,
    });
  }),
  deleteTrackingLog: thunk(async (_action, id, { injections }) => {
    const { httpService } = injections;
    try {
      await httpService.delete(`/tracking-logs/?id=${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log("error delete tracking log");
    }
  }),

  getActivitiesProgressAnalytics: thunk(
    async (action, { startDate, endDate }, { injections }) => {
      const { httpService } = injections;
      try {
        const response: any = await httpService.get(
          `/tracking-logs/progress-summary?start-date=${startDate}&end-date=${endDate}`,
          { withCredentials: true }
        );
        action.setProgressAnalytics(response);
      } catch {
        console.log("Error get progress analytics");
      }
    }
  ),
};
