import * as actionTypes from "./actionTypes";
import AccountService from "../../services/AccountService";
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
  localStorage.removeItem(localStorageConst.AUTH_TOKEN);
  //localStorage.removeItem("expirationDate");
  localStorage.removeItem(localStorageConst.AUTH_USERNAME);
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
      AccountService.login(authData)
        .then((response) => {
          // const expirationDate = new Date(
          //   new Date().getTime() + response.data.expiresIn * 1000
          // );
          localStorage.setItem(
            localStorageConst.AUTH_TOKEN,
            response.data.token
          );
          //localStorage.setItem("expirationDate", expirationDate.toDateString());
          localStorage.setItem(
            localStorageConst.AUTH_USERNAME,
            response.data.userName
          );
          dispatch(authSuccess(response.data.token, response.data.userName));
          //dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch((e) => {
          dispatch(authFail(e.response.data.error));
        });
    } else {
      AccountService.register(authData)
        .then((response) => {
          console.log(response);
          // const expirationDate = new Date(
          //   new Date().getTime() + response.data.expiresIn * 1000
          // );
          localStorage.setItem(
            localStorageConst.AUTH_TOKEN,
            response.data.token
          );
          //localStorage.setItem("expirationDate", expirationDate.toDateString());
          localStorage.setItem(
            localStorageConst.AUTH_USERNAME,
            response.data.userName
          );
          dispatch(authSuccess(response.data.token, response.data.userName));
          //dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch((e) => {
          dispatch(authFail(e.response.data.error));
        });
    }
    // axios
    //   .post(url, authData)
    //   .then((response) => {
    //     const expirationDate = new Date(
    //       new Date().getTime() + response.data.expiresIn * 1000
    //     );
    //     localStorage.setItem("token", response.data.idToken);
    //     localStorage.setItem("expirationDate", expirationDate.toDateString());
    //     localStorage.setItem("userId", response.data.userId);
    //     dispatch(authSuccess(response.data.idToken, response.data.localId));
    //     dispatch(checkAuthTimeout(response.data.expiresIn));
    //   })
    //   .catch((e) => {
    //     dispatch(authFail(e.response.data.error));
    //   });
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
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
