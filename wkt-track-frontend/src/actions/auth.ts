import AuthService from "../services/auth";
import {AppDispatch} from "../store";
import {REGISTER_FAIL, REGISTER_SUCCESS, SET_MESSAGE} from "./types";
import {AxiosError, AxiosResponse} from "axios";

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