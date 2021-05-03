import { START_LOADING, FINISH_LOADING } from "../actions/actionTypes.js";

const initialState = {
  active_loading: 0,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING: {
      state.active_loading++;
      return state;
    }

    case FINISH_LOADING: {
      state.active_loading--;
      return state;
    }

    default:
      return state;
  }
};

export default LoadingReducer;
