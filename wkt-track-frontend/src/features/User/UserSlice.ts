import {createSlice} from "@reduxjs/toolkit";

interface RootState {
  user: UserInterface
}

interface UserInterface {
  username: String,
  email: String,
  isFetching: boolean,
  isError: boolean,
  isSuccess: boolean,
  errorMessage: String
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    jwt: '',
    isFetching: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
  },
  reducers: {

  },
  extraReducers: {

  },
})

export const userSelector = (state: RootState) => state.user;