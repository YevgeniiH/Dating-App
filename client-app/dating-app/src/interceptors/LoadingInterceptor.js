import axios from "axios";
import { Start_Loading, Finish_Loading } from "../store/actions";

export default function LoadingInterceptor(store) {
  axios.interceptors.request.use(
    function (config) {
      store.dispatch(Start_Loading());
      return config;
    },
    function (error) {
      store.dispatch(Finish_Loading());
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      store.dispatch(Finish_Loading());
      return response;
    },
    function (error) {
      store.dispatch(Finish_Loading());
      return Promise.reject(error);
    }
  );
}
