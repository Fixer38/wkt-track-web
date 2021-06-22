import AuthService from "../services/auth";
import {AppDispatch} from "../store";
import {REGISTER_SUCCESS, SET_MESSAGE} from "./types";
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
      }
  )
}