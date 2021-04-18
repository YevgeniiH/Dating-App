import axios from "axios";

export default function JwtInterceptor(store) {
  // Add a response interceptor
  axios.interceptors.request.use(function (config) {
    const token = store.getState().auth.token;
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
}
