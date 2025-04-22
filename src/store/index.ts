import { createStore } from "easy-peasy";
import { userModel, UserModel } from "./user.model";
import { referentialDataModel, ReferentialDataModel } from "./referentialData";
import { activityModel, ActivityModel } from "./activity.model";

// définit la structure globale du store
export interface AppStoreModel {
  user: UserModel;
  referentialData: ReferentialDataModel;
  activity: ActivityModel;
}

// associe chaque store avec son modèle
export const appStoreModel: AppStoreModel = {
  user: userModel,
  referentialData: referentialDataModel,
  activity: activityModel,
};

//crée le store global qu'on utilisera dans toute l’application.
export const store = createStore<AppStoreModel>(appStoreModel);
