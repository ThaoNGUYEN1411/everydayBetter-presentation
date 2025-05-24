import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";

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

export interface updateActivity {
  id: string;
  activity: CreateActivity;
}
export interface TrackActivityData {
  activityId: string;
  trackedDate: string;
  done: boolean | null;
}

//définit le type du modèle (les données + les actions).
export interface ActivityModel {
  create: Thunk<ActivityModel, CreateActivity>;
  activityList: ActivityDto[];
  setActivityList: Action<ActivityModel, ActivityDto[]>;
  getAllActivityList: Thunk<ActivityModel>;
  deleteActivity: Thunk<ActivityModel, string>;
  removeActivityFromList: Action<ActivityModel, string>;
  currentActivityDetail: CurrentActivityDetail | null;
  setCurrentActivityDetail: Action<ActivityModel, CurrentActivityDetail | null>;
  getCurrentActivityDetail: Thunk<ActivityModel, string>;
  updateActivity: Thunk<ActivityModel, updateActivity>;
  saveTrackingRecord: Thunk<ActivityModel | TrackActivityData>;
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
      console.log("Activité créée avec succès :", response.data); // facultatif
    } catch (error) {
      console.error("Erreur lors de la création d'activité :", error);
    }
  }),
  activityList: [],
  setActivityList: action((state, activityList) => {
    state.activityList = activityList;
  }),
  getAllActivityList: thunk(async (actions, _payload) => {
    try {
      const response = await axios.get("http://localhost:8080/activities", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, //add the cookies if server send Set-Cookie
      });
      console.log(response.data);
      actions.setActivityList(response.data);
    } catch (error) {
      console.log("error get activityList");
    }
  }),
  deleteActivity: thunk(async (actions, id) => {
    console.log("test", id);
    const response = await axios.delete(
      `http://localhost:8080/activities/${id}`,
      { withCredentials: true }
    );
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
      console.log(response.data);
      actions.setCurrentActivityDetail(response.data);
    } catch (error) {
      console.log("error get activityList");
    }
  }),
  currentActivityDetail: null,
  updateActivity: thunk(async (action, payload) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/activities/${payload.id}`,
        payload.activity, // Pas besoin de JSON.stringify, axios le fait tout seul
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // important pour envoyer le cookie JWT
        }
      );
    } catch (error) {
      console.log("update activity");
    }
  }),
  saveTrackingRecord: thunk(async (action, payload, { injections }) => {
    const { httpService } = injections;
    const response: any = await httpService.post(
      `/tracking-record/create`,
      payload,
      { withCredentials: true }
    );
  }),
};
