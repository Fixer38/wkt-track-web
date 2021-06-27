import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../services/api';

const API_URL = "http://localhost:2000/user"

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

interface signupUserReturn {
  data: String,
  username: String,
  email: String
}

interface ISignupUser {
  username: String,
  email: String,
  password: String,
}

interface signupUserError {
  errorMessage: String
}

export const signupUser = createAsyncThunk<
    signupUserReturn,
    ISignupUser,
    {
      extra: {
        jwt: string
      }
      rejectedValue: signupUserError
    }
    >(
    'users/signupUser',
    async (form_data: ISignupUser, thunkApi) => {
      const { username, email, password } = form_data
      try {
        const response = await axios.post(
            API_URL + "register", {
              username,
              email,
              password,
            }
        )
        let data = await response.data;
        console.log(data);

        if(response.status === 200) {
          localStorage.setItem('jwt_token', data);
          return { ...data, username: username, email: email } as signupUserReturn;
        }
        else {
          return thunkApi.rejectWithValue(data as signupUserError);
        }
      }
      catch (e) {
        console.log("API error: ", e.response.data);
        return thunkApi.rejectWithValue(e.response.data);
      }
    }
)

export const userSelector = (state: RootState) => state.user;