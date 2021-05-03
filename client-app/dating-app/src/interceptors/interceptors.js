import LoadingInterceptor from "./LoadingInterceptor";
import JwtInterceptor from "./JwtInterceptor";

export default function setupInterceptors(store) {
  JwtInterceptor(store);
  LoadingInterceptor(store);
}
