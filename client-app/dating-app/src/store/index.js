import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./reducers/auth";
import LoadingReducer from "./reducers/loading";
import MembersReducer from "./reducers/members";

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const rootReducer = combineReducers({
  auth: AuthReducer,
  loading: LoadingReducer,
  members: MembersReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
