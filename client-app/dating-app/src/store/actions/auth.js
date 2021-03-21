import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as localStorageConst from "../localStorageConst";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem(localStorageConst.USER_DATA);
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      UserName: email,
      Password: password,
      returnSecureToken: true,
    };

    if (!isSignUp) {
      axios
        .post("/account/login", authData)
        .then((response) => {
          const data = response.data;
          if (data) {
            localStorage.setItem(
              localStorageConst.USER_DATA,
              JSON.stringify(data)
            );
            dispatch(authSuccess(data.token, data.userName));
          }
        })
        .catch((e) => {
          dispatch(authFail(e.response.data.error));
        });
    } else {
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem(localStorageConst.USER_DATA));
    if (!user) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(user.token, user.userName));
    }
  };
};
