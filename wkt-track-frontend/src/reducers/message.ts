import {CLEAR_MESSAGE, SET_MESSAGE} from "../actions/types";
import {PayloadAction} from "@reduxjs/toolkit";

const initialState = {}

export default function (state = initialState, action: PayloadAction<string>) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}