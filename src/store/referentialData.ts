import axios from "axios";
import { Action, action, Thunk, thunk } from "easy-peasy";

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
        const response = await axios.get("http://localhost:8080/categories", {
          withCredentials: true,
        });
        console.log(response.data);

        actions.setCategoryList(response.data);
      } catch {
        console.log("error get category");
      }
    }
  }),
};
