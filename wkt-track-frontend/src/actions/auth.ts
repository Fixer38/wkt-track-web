import AuthService from "../services/auth";
import {AppDispatch} from "../store";
import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, SET_MESSAGE} from "./types";
import {AxiosResponse} from "axios";

export const register = (username: String, email: String, password: String) => (dispatch: AppDispatch) => {
  return AuthService.register(username, email, password).then(
      (response: AxiosResponse) => {
        dispatch({
          type: REGISTER_SUCCESS
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.data
        });

        return Promise.resolve();
      },
      (error) => {
        const message = (error.response.data)

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
  )
}

export const login = (username: String, password: String) => (dispatch: AppDispatch) => {
  return AuthService.login(username, password).then(
      (jwt_token) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { jwt: jwt_token },
        });

        return Promise.resolve();
      },
      (error) => {
        const message = (error.response.data)
        dispatch({
          type: LOGIN_FAIL
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message
        });

        return Promise.reject();
      }
  )
}

export const logout = () => (dispatch: AppDispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
}