import { userSlice } from "./features/User/UserSlice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user']
};

const reducers = combineReducers({
  user: userSlice.reducer
});

const pReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  reducer: pReducer
})