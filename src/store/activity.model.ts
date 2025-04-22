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

export interface ActivityInfo {
  id: number;
  createActivity: CreateActivity;
}

//définit le type du modèle (les données + les actions).
export interface ActivityModel {
  activityInfo: ActivityInfo | null;
  initialActivityInfo: ActivityInfo | null;
  createActivityFormDraft: CreateActivity;

  setActivityInfo: Action<ActivityModel, ActivityInfo | null>;
  setCreateActivityFormDraft: Action<ActivityModel, CreateActivity>;
  create: Thunk<ActivityModel, CreateActivity>;
}

//contient l'état initial et l’action (permet de modifier le state.)
export const activityModel: ActivityModel = {
  activityInfo: null,
  initialActivityInfo: null,
  createActivityFormDraft: new CreateActivity(),

  setActivityInfo: action((state, activityInfo) => {
    state.activityInfo = activityInfo;
  }),

  setCreateActivityFormDraft: action((state, createActivityFormDraft) => {
    state.createActivityFormDraft = createActivityFormDraft;
  }),

  create: thunk(async (_, createActivityForm) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/activities/",
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
};
