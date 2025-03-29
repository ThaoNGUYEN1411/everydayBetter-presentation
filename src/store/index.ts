import { createStore } from "easy-peasy";
import { todoModel, TodoModel } from "./todos.model";
import { userModel, UserModel } from "./user.model";

export interface AppStoreModel {
  todos: TodoModel;
  user: UserModel;
}

export const appStoreModel: AppStoreModel = {
  todos: todoModel,
  user: userModel
}

export const store = createStore<AppStoreModel>(appStoreModel);