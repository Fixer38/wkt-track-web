import { userSlice } from "./features/User/UserSlice";
import {configureStore} from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
  }
})