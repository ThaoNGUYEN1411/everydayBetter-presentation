import { createStore } from "easy-peasy";
import { userModel, UserModel } from "./user.model";
import { referentialDataModel, ReferentialDataModel } from "./referentialData";

export interface AppStoreModel {
  user: UserModel;
  referentialData: ReferentialDataModel;
}

export const appStoreModel: AppStoreModel = {
  user: userModel,
  referentialData: referentialDataModel,
};

export const store = createStore<AppStoreModel>(appStoreModel);
