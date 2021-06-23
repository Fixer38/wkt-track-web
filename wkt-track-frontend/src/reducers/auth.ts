import {PayloadAction} from "@reduxjs/toolkit";
import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS} from "../actions/types";

const jwt = localStorage.getItem("jwt_token");

interface IIntialState {
  isLoggedIn: Boolean,
  jwt: String | null
}

const initialState: IIntialState = jwt
  ? { isLoggedIn: true, jwt: jwt }
  : { isLoggedIn: false, jwt: null };

export default function (state: IIntialState = initialState, action: PayloadAction<string>) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        jwt: payload
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        jwt: null
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        jwt: null
      };
    default:
      return state;
  }
}