import BusyInterceptor from "./BusyInterceptor";
import JwtInterceptor from "./JwtInterceptor";

export default function setupInterceptors(store) {
  JwtInterceptor(store);
  BusyInterceptor(store);
}
