import axios from "axios";
import * as actionTypes from "./actionTypes";

export const startLoadingMembers = () => {
  return {
    type: actionTypes.LOAD_MEMBERS_START,
  };
};

export const finishLoadingMembers = (members) => {
  return {
    type: actionTypes.LOAD_MEMBERS_SUCCESS,
    members: members,
  };
};

export const errorLoadingMembers = (error) => {
  return {
    type: actionTypes.LOAD_MEMBERS_FAIL,
    error: error,
  };
};

export const loadMembers = () => {
  return (dispatch) => {
    dispatch(startLoadingMembers());
    axios
      .get("/users")
      .then((r) => {
        if (r.data) dispatch(finishLoadingMembers(r.data));
      })
      .catch((e) => {
        dispatch(errorLoadingMembers(e.response.data));
      });
  };
};
