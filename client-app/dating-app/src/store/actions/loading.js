import { START_LOADING, FINISH_LOADING } from "../actions/actionTypes.js";

export const Finish_Loading = () => {
  return {
    type: FINISH_LOADING,
  };
};

export const Start_Loading = (bool) => {
  return {
    type: START_LOADING,
  };
};
