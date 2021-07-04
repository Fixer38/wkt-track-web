import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

const API_URL = "http://localhost:8080/api/user/"

const api = axios.create({
  withCredentials: true
})

// IF response status is 401 on an URL (possibly JWT token expired)
// Send a request to /refreshtoken
// If refreshtoken cookie is still valid, request will give back a new jwt token
// With new jwt token, send back the original request
// The refresh of the token will be done seamlessly for the end user
// @ts-ignore
/*api.interceptors.response.use(null, (error) => {
  // If the request hasn't been retried yet and status is 401
  if(
      error.config &&
      error.response?.status === 401 &&
      !error.config.__isRetry
  )
  {
    return new Promise((resolve, reject) => {
      // Send request to /refreshtoken url
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
    // send request to /refreshtoken
    api.post(API_URL + 'refreshtoken', {
      headers: {
        withCredentials: true
      }
    })
        .then((res: AxiosResponse) => {
          console.log(res.data);
          // Set new jwt_token gained via the refresh token²
          localStorage.setItem('jwt_token', res.data);
          // set the header with the new jwt token
          config.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('jwt_token') }
          // send back the original request
          axios.request(config)
              .then((result: AxiosResponse) => {
                return resolve(result);
              })
              .catch((err: any) => {
                console.log(err);
                return reject(err);
              });
        })

        // In case there is an error and there might be no refresh token cookie
        // Which gives back a 400 status due to dotnet BadRequest directive in the refreshToken endpoint if there is no
        // cookie set
        // Need to remove the expired jwt_token aswell
        // Need to redirect the user to login page (to be done)
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
};*/

export default api;