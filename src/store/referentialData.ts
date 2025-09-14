import axios from "axios";
import { Action, action, Thunk, thunk } from "easy-peasy";

const VITE_API_URL = import.meta.env.VITE_API_URL;
//referential data to stoke data general in db, a dto no need to represent exact data in table just stock les info the front need
export interface CategoryDto {
  id: number;
  name: string;
}

export interface ReferentialDataModel {
  categoryList: CategoryDto[];
  setCategoryList: Action<ReferentialDataModel, CategoryDto[]>;
  getAllCategoryList: Thunk<ReferentialDataModel>;
}

export const referentialDataModel: ReferentialDataModel = {
  categoryList: [],
  setCategoryList: action((state, categoryList) => {
    state.categoryList = categoryList;
  }),
  getAllCategoryList: thunk(async (actions, _payload, { getState }) => {
    if (getState().categoryList.length === 0) {
      try {
        const response = await axios.get(`${VITE_API_URL}/categories`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, //add token
        });

        actions.setCategoryList(response.data);
      } catch {
        console.log("error get category");
      }
    }
  }),
};
