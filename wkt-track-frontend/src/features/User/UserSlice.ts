import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../services/api';
import {AxiosError} from "axios";

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
  errorMessage: string
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

interface LoginUserReturn {
  data: string,
  email: string,
}

interface ILoginUser {
  email: String,
  password: String,
}

export const signupUser = createAsyncThunk<
    signupUserReturn,
    ISignupUser,
    {
      rejectValue: string
    }
    >(
    'user/signupUser',
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
          return thunkApi.rejectWithValue(data);
        }
      }
      catch (err) {
        console.log("API error: ", err);
        let error: AxiosError<string> = err;
        if(!error.response) {
          throw err
        }
        console.log(error.response.data);
        return thunkApi.rejectWithValue(error.response.data);
      }
    }
)

export const loginUser = createAsyncThunk<
    LoginUserReturn,
    ILoginUser,
    {
      rejectValue: string
    }
    >(
        'user/loginUser',
    async (form_data, thunkApi) => {
          const { email, password } = form_data;
          try {
            const response = await axios.post(
                API_URL + "login", {
                  "Email": email,
                  "Password": password,
                }
            )
            let data = await response.data;
            console.log(data)
            if(response.status === 200)
            {
              localStorage.setItem("jwt_token", data);
              return { ...data, email: email}
            }
          }
          catch (err) {
            console.log("API error: ", err);
            let error: AxiosError<string> = err;
            if(!error.response) {
              throw err
            }
            console.log(error.response.data);
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
    // Signup fulfilled
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.username = payload.username;
    });
    // signup pending
    builder.addCase(signupUser.pending, (state) => {
      state.isFetching = true;
    });
    // signup failed
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isFetching = false;
      if(action.payload) {
        state.errorMessage = action.payload;
      }
      else {
        state.errorMessage = action.error.message!;
      }
    });
    // LOGIN
    // login fulfilled
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
    });
    // login pending
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    });
    // login failed
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isError = true;
      state.isFetching = false;
      state.isSuccess = false;
      if(action.payload) {
        state.errorMessage = action.payload;
      }
      else {
        state.errorMessage = action.error.message!;
      }
    });
  },
})

export const userSelector = (state: RootState) => state.user;

export const { clearState } = userSlice.actions;