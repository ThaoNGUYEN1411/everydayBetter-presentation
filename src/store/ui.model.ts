import { action, Action } from "easy-peasy";

export interface UIModel {
  isModalOpen: boolean;
  setIsModalOpen: Action<UIModel, boolean>;
  modeModal: string;
  setModeModal: Action<UIModel, string>;
}

export const uiModel: UIModel = {
  isModalOpen: false,
  setIsModalOpen: action((state, payload) => {
    state.isModalOpen = payload;
  }),
  modeModal: "",
  setModeModal: action((state, payload) => {
    state.modeModal = payload;
  }),
};
