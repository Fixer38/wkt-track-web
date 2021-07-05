import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../services/api';
import {AxiosError} from "axios";

// TODO: Add logout action
// TODO: Add logout component

const API_URL = "http://localhost:8080/api/user/"

// Wrapper Interface containing the UserInterface used by the slice for the initialState types
interface RootState {
  user: UserInterface
}

// Interface for initialState types of the slice
interface UserInterface {
  username: String,
  email: String,
  isLoggedIn: boolean,
  isFetching: boolean,
  isError: boolean,
  isSuccess: boolean,
  errorMessage: string
}

// Interface used by the register thunk on successful returns
interface signupUserReturn {
  data: string,
  username: string,
  email: string
}

// Interface used by the register thunk for the form data passed to the thunk
interface ISignupUser {
  username: String,
  email: String,
  password: String,
}

// Interface used by the login thunk on successful returns
interface LoginUserReturn {
  data: string,
  email: string,
}

// Interface used by the login thunk for the form data passed to the thunk
interface ILoginUser {
  email: String,
  password: String,
}

// Successful Returns: data, username, email
// Takes for form data: username, email, password
// Failed Returns: string containing the API error -> Most likely username already taken
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
        // POST request to /api/user/register
        // Returns User successfully created on success
        // Returns "Username 'username' already taken" on failure
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
        // Might not need that code still have to make sure of it as if there is a bad request, it goes to the catch code
        else {
          return thunkApi.rejectWithValue(data);
        }
      }
      catch (err) {
        console.log("API error: ", err);
        let error: AxiosError<string> = err;
        // In case the error returned by the API request isn't an HTTP response
        if(!error.response) {
          throw err
        }
        console.log(error.response.data);
        return thunkApi.rejectWithValue(error.response.data);
      }
    }
)

// Successful Returns: data, email
// Takes for form data: email, password
// Failed Returns: string containing the API error -> Password or email is incorrect
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
            // POST request to /api/user/login
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
    isLoggedIn: false,
    isFetching: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
  } as UserInterface,
  reducers: {
    // Clear the state
    // Usually used after successful signup or login
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
      state.isLoggedIn = true;
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

// Export the userSelector with the according type
// RootState wraps the initial state of the user slice in its .user property
export const userSelector = (state: RootState) => state.user;

export const { clearState } = userSlice.actions;