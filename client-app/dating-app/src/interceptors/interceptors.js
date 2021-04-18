import JwtInterceptor from "./JwtInterceptor";

export default function setupInterceptors(store) {
  JwtInterceptor(store);
}
