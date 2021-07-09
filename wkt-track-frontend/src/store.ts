import { userSlice } from "./features/User/UserSlice";
import {configureStore} from "@reduxjs/toolkit";

const saveToLocalStorage = (state: any) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  }
  catch (e) {
    console.error(e);
  }
}

const loadFromStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  }
  catch (e) {
    console.error(e);
    return undefined;
  }
}

export default configureStore({
  reducer: {
    user: userSlice.reducer,
  }
})