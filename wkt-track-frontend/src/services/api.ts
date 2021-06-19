import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

const API_URL = "http://localhost:2000/user/"

const api = axios.create({
  withCredentials: true
})

// @ts-ignore
api.interceptors.response.use(null, (error) => {
  if(
      error.config &&
      error.response?.status === 401 &&
      !error.config.__isRetry
  )
  {
    return new Promise((resolve, reject) => {
      refreshToken(axios, error.config)
          .then((result: any) => {
            resolve(result)
          })
          .catch((err: any) => {
            reject(err);
          });
    });
  }
  return Promise.reject(error);
});

const refreshToken = (axios: AxiosInstance, config: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    api.post(API_URL + 'refreshtoken', {
      headers: {
        withCredentials: true
      }
    })
        .then((res: AxiosResponse) => {
          console.log(res.data);
          localStorage.setItem('jwt_token', res.data);
          config.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }
          axios.request(config)
              .then((result: AxiosResponse) => {
                return resolve(result);
              })
              .catch((err: any) => {
                console.log(err);
                return reject(err);
              });
        })
        .catch((err: AxiosError) => {
          console.log(err);
          console.log(err.response?.status);
          if(err.response?.status === 400)
          {
            localStorage.removeItem('jwt_token');
            // NEED REDIRECT HERE
          }
        });
  });
};

export default api;