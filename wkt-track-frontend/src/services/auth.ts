import {AxiosResponse} from 'axios';
import axios from './api';

const API_URL = "http://localhost:2000/user/";

const register = (username: String, email: String, password: String) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password
  });
}

const login = (username: String, password: String) => {
  return axios.post(API_URL + "login", {
    username,
    password
  })
      .then((response: AxiosResponse) => {
        if(response.data) {
          localStorage.setItem("jwt_token", response.data);
        }
        return response.data;
      })
      .catch((err: AxiosResponse) => {
        console.log(err);
        return false
      })
}

const logout = () => {
  localStorage.removeItem("jwt_token");
}

export default {
  register,
  login,
  logout
};