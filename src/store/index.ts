import { createStore } from "easy-peasy";
import { userModel, UserModel } from "./user.model";
import { referentialDataModel, ReferentialDataModel } from "./referentialData";
import { activityModel, ActivityModel } from "./activity.model";
import { HttpService } from "../services/http/http.service";
import { UIModel, uiModel } from "./ui.model";
import { ArticleModel, articleModel } from "./article.model";

// définit la structure globale du store
export interface AppStoreModel {
  user: UserModel;
  referentialData: ReferentialDataModel;
  activity: ActivityModel;
  ui: UIModel;
  article: ArticleModel;
}

// associe chaque store avec son modèle
export const appStoreModel: AppStoreModel = {
  user: userModel,
  referentialData: referentialDataModel,
  activity: activityModel,
  ui: uiModel,
  article: articleModel,
};
const httpService = new HttpService();

//crée le store global qu'on utilisera dans toute l’application.
export const store = createStore<AppStoreModel>(appStoreModel, {
  injections: {
    httpService,
  },
});

export default store;
