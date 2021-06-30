import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../services/api';
import {sign} from "crypto";
import {AxiosError} from "axios";
import thunk from "redux-thunk";

const API_URL = "http://localhost:8080/api/user/"

interface RootState {
  user: UserInterface
}

interface UserInterface {
  username: String,
  email: String,
  isFetching: boolean,
  isError: boolean,
  isSuccess: boolean,
  errorMessage: string | undefined
}

interface signupUserReturn {
  data: string,
  username: string,
  email: string
}

interface ISignupUser {
  username: String,
  email: String,
  password: String,
}

interface signupUserError {
  errorMessage: string
}

export const signupUser = createAsyncThunk<
    signupUserReturn,
    ISignupUser,
    {
      extra: {
        jwt: string
      }
      rejectValue: signupUserError
    }
    >(
    'users/signupUser',
    async (form_data, thunkApi) => {
      const { username, email, password } = form_data
      try {
        const response = await axios.post(
            API_URL + "register", {
              "Username": username,
              "Email": email,
              "Password": password,
            }
        )
        let data = await response.data;
        console.log(data);
        if(response.status === 200)
        {
          return { ...data, username: username, email: email };
        }
        else {
          return thunkApi.rejectWithValue(data as signupUserError);
        }
      }
      catch (err) {
        console.log("API error: ", err);
        let error: AxiosError<signupUserError> = err;
        if(!error.response) {
          throw err
        }
        return thunkApi.rejectWithValue(error.response.data);
      }
    }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    isFetching: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
  } as UserInterface,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.username = payload.username;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isFetching = false;
      if(action.payload) {
        state.errorMessage = action.payload.errorMessage;
      }
      else {
        state.errorMessage = action.error.message;
      }
    })
  },
})

export const userSelector = (state: RootState) => state.user;

export const { clearState } = userSlice.actions;